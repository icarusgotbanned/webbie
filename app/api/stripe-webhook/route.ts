import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
})

// Initialize Supabase client with service role key
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE
const supabaseUrl = process.env.SUPABASE_URL || ''

if (!supabaseUrl || !serviceRoleKey) {
  console.error('[webhook] Missing required environment variables:')
  console.error('  SUPABASE_URL:', supabaseUrl ? '✓' : '✗')
  console.error('  SUPABASE_SERVICE_ROLE_KEY:', serviceRoleKey ? '✓' : '✗')
}

const supabase = createClient(supabaseUrl, serviceRoleKey || '', {
  auth: { persistSession: false },
})

// Generate a raw license key (random UUID), then hash it
function generateLicenseKey(): { raw: string; hash: string } {
  const raw = crypto.randomUUID()
  const hash = crypto.createHash('sha256').update(raw).digest('hex')
  return { raw, hash }
}

// Email function (logs to console if email service not configured)
async function sendLicenseEmail(email: string, rawLicense: string): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'https://www.lancelot.world'
  const successUrl = `${appUrl}/success?email=${encodeURIComponent(email)}`

  const emailHtml = `
    <div style="font-family:system-ui,Segoe UI,Roboto,Arial;max-width:600px;margin:0 auto;padding:20px">
      <h2 style="color:#1f2937;margin-bottom:20px">Thanks for your purchase!</h2>
      <p style="color:#4b5563;line-height:1.6">Here is your Absolute Assistant license key:</p>
      <div style="font-family:ui-monospace,Consolas,Menlo,monospace;font-size:18px;background:#f3f4f6;padding:16px;border-radius:8px;text-align:center;margin:20px 0;border:2px solid #e5e7eb">
        <strong style="color:#059669">${rawLicense}</strong>
      </div>
      <p style="color:#4b5563;line-height:1.6">Enter this key in the Absolute Assistant app to activate your license.</p>
      <p style="color:#4b5563;line-height:1.6;margin-top:20px">
        You can also view it on your success page: 
        <a href="${successUrl}" style="color:#2563eb;text-decoration:underline">View License</a>
      </p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:30px 0" />
      <p style="color:#6b7280;font-size:12px">Keep this license key secure. Do not share it with others.</p>
    </div>
  `

  // Try to use existing email service if configured
  try {
    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.FROM_EMAIL

    if (resendApiKey && fromEmail) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: email,
          subject: 'Your Absolute Assistant License Key',
          html: emailHtml,
        }),
      })

      if (res.ok) {
        console.log('[webhook] License key email sent via Resend to:', email)
        return
      }
    }
  } catch (err) {
    console.error('[webhook] Email service error:', err)
  }

  // Fallback: log to console
  console.log('[webhook] EMAIL (not sent - service not configured):')
  console.log('  To:', email)
  console.log('  Subject: Your Absolute Assistant License Key')
  console.log('  Raw License Key:', rawLicense)
  console.log('  HTML Body:', emailHtml)
}

export async function POST(req: NextRequest) {
  try {
    // Verify webhook secret
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('[webhook] Missing STRIPE_WEBHOOK_SECRET')
      return NextResponse.json({ error: 'Webhook misconfigured' }, { status: 500 })
    }

    // Get raw body for signature verification
    const body = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err: any) {
      console.error('[webhook] Signature verification failed:', err.message)
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    console.log('[webhook] Event received:', event.type, 'livemode:', event.livemode)
    console.log('[webhook] Event ID:', event.id)

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        console.log('[webhook] Processing checkout.session.completed:', {
          sessionId: session.id,
          paymentStatus: session.payment_status,
          customer: session.customer,
          customerEmail: session.customer_email,
        })

        if (session.payment_status !== 'paid') {
          console.log('[webhook] Session not paid, skipping:', session.id)
          break
        }

        // Get customer email from Stripe
        let customerEmail: string | null = null

        if (session.customer) {
          try {
            const customer = await stripe.customers.retrieve(
              typeof session.customer === 'string' ? session.customer : session.customer.id
            )
            // Check if customer is deleted before accessing email
            if (!customer.deleted && 'email' in customer) {
              customerEmail = customer.email || null
            }
          } catch (err) {
            console.error('[webhook] Failed to retrieve customer:', err)
          }
        }

        // Fallback to customer_email if available
        if (!customerEmail && session.customer_email) {
          customerEmail = session.customer_email
        }

        if (!customerEmail) {
          console.error('[webhook] No customer email found for session:', session.id)
          console.error('[webhook] Session data:', JSON.stringify(session, null, 2))
          break
        }

        console.log('[webhook] Customer email found:', customerEmail)

        // Generate license key (raw + hash)
        const { raw, hash } = generateLicenseKey()
        console.log('[webhook] Generated license - hash:', hash.substring(0, 16) + '...')

        // Calculate expiry: 1 month from now
        const expiresAt = new Date()
        expiresAt.setMonth(expiresAt.getMonth() + 1)

        // Insert license into Supabase
        try {
          console.log('[webhook] Inserting license into Supabase...')
          console.log('[webhook] Supabase URL:', supabaseUrl ? '✓' : '✗')
          console.log('[webhook] Service role key:', serviceRoleKey ? '✓' : '✗')

          const { data, error } = await supabase
            .from('licenses')
            .insert({
              user_email: customerEmail,
              license_hash: hash,
              expires_at: expiresAt.toISOString(),
            })
            .select()
            .single()

          if (error) {
            console.error('[webhook] Supabase insert error:', error)
            console.error('[webhook] Error details:', JSON.stringify(error, null, 2))
            throw error
          }

          console.log('[webhook] License created successfully:', {
            id: data.id,
            email: customerEmail,
            expiresAt: expiresAt.toISOString(),
            hashPrefix: hash.substring(0, 16) + '...',
          })

          // Send email with raw license key
          console.log('[webhook] Sending license email...')
          await sendLicenseEmail(customerEmail, raw)
          console.log('[webhook] Email sent (or logged to console)')

          console.log('[webhook] checkout.session.completed processed successfully')
        } catch (err: any) {
          console.error('[webhook] Failed to create license:', err)
          console.error('[webhook] Error stack:', err?.stack)
          // Don't throw - we still want to return 200 to Stripe
        }

        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice

        // Only process subscription invoices
        if (!invoice.subscription || !invoice.customer) {
          console.log('[webhook] Invoice not for subscription, skipping')
          break
        }

        // Get customer email
        let customerEmail: string | null = null

        try {
          const customer = await stripe.customers.retrieve(
            typeof invoice.customer === 'string' ? invoice.customer : invoice.customer.id
          )
          // Check if customer is deleted before accessing email
          if (!customer.deleted && 'email' in customer) {
            customerEmail = customer.email || null
          }
        } catch (err) {
          console.error('[webhook] Failed to retrieve customer for invoice:', err)
        }

        if (!customerEmail) {
          console.error('[webhook] No customer email found for invoice:', invoice.id)
          break
        }

        // Find existing license by user email
        const { data: licenses, error: fetchError } = await supabase
          .from('licenses')
          .select('id, expires_at')
          .eq('user_email', customerEmail)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (fetchError || !licenses) {
          console.error('[webhook] License not found for email:', customerEmail, fetchError)
          break
        }

        // Extend expiry by 1 month
        const currentExpiry = new Date(licenses.expires_at)
        const newExpiry = new Date(currentExpiry)
        newExpiry.setMonth(newExpiry.getMonth() + 1)

        // Update license expiry
        const { error: updateError } = await supabase
          .from('licenses')
          .update({ expires_at: newExpiry.toISOString() })
          .eq('id', licenses.id)

        if (updateError) {
          console.error('[webhook] Failed to extend license:', updateError)
          throw updateError
        }

        console.log('[webhook] License extended:', {
          email: customerEmail,
          oldExpiry: currentExpiry.toISOString(),
          newExpiry: newExpiry.toISOString(),
        })

        break
      }

      default:
        console.log('[webhook] Unhandled event type:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('[webhook] Handler error:', err)
    // Return 200 to prevent Stripe retries while debugging
    return NextResponse.json({ received: true, error: err.message }, { status: 200 })
  }
}

// Allow GET requests for health checks
export async function GET() {
  return NextResponse.json({ ok: true, route: '/api/stripe-webhook' })
}

