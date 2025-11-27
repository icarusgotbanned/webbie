import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

interface SuccessPageProps {
  searchParams: { email?: string; session_id?: string }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
})

// Initialize Supabase client (anonymously for read-only access)
// Note: In production, you may want to create a read-only API route instead
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// For server-side, we can use service role key
const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE || ''

// Use service role for server-side fetching
const supabase = createClient(
  supabaseUrl,
  serviceRoleKey || supabaseAnonKey || '',
  { auth: { persistSession: false } }
)

async function getCustomerEmailFromSession(sessionId: string): Promise<string | null> {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    console.log('[success] Checkout session status:', {
      id: session.id,
      paymentStatus: session.payment_status,
      status: session.status,
      customerEmail: session.customer_email,
      customer: session.customer,
    })
    
    // Try customer_email first
    if (session.customer_email) {
      return session.customer_email
    }

    // Otherwise fetch customer
    if (session.customer) {
      const customer = await stripe.customers.retrieve(
        typeof session.customer === 'string' ? session.customer : session.customer.id
      )
      // Check if customer is deleted before accessing email
      if (!customer.deleted && 'email' in customer) {
        return customer.email || null
      }
    }

    return null
  } catch (err) {
    console.error('[success] Failed to fetch session:', err)
    return null
  }
}

async function getLicense(email: string) {
  try {
    console.log('[success] Fetching license for email:', email)
    console.log('[success] Supabase URL:', supabaseUrl ? '✓' : '✗')
    console.log('[success] Service role key:', serviceRoleKey ? '✓' : '✗')

    const { data, error } = await supabase
      .from('licenses')
      .select('license_hash, expires_at, created_at')
      .eq('user_email', email)
      .order('created_at', { ascending: false })
      .limit(1)

    if (error) {
      console.error('[success] License fetch error:', error)
      console.error('[success] Error details:', JSON.stringify(error, null, 2))
      return null
    }

    // Handle no results - return null (not an error, just not created yet)
    if (!data || data.length === 0) {
      console.log('[success] No license found yet - webhook may not have processed')
      return null
    }

    const license = data[0]
    console.log('[success] License found:', {
      hashPrefix: license.license_hash?.substring(0, 16) + '...',
      expiresAt: license.expires_at,
    })

    return license
  } catch (err: any) {
    console.error('[success] Failed to fetch license:', err)
    console.error('[success] Error stack:', err?.stack)
    return null
  }
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return dateString
  }
}

function isExpired(expiresAt: string): boolean {
  return new Date(expiresAt) < new Date()
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  let email: string | undefined = searchParams.email

  // If no email but we have session_id, fetch email from Stripe
  if (!email && searchParams.session_id) {
    const fetchedEmail = await getCustomerEmailFromSession(searchParams.session_id)
    email = fetchedEmail || undefined
  }

  if (!email) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] text-slate-100">
        <header className="border-b border-white/5 bg-[#0d1117]/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-black text-xs">
                AA
              </div>
              <div className="font-bold text-sm sm:text-base">Absolute Assistant</div>
            </Link>
          </div>
        </header>
        <main className="flex items-center justify-center px-4 py-8 min-h-[calc(100vh-60px)]">
          <div className="rounded-3xl border border-white/5 bg-[#161b22] backdrop-blur-sm px-8 py-10 max-w-md text-center shadow-2xl shadow-black/40">
            <h1 className="mb-3 text-xl font-black">Email Required</h1>
            <p className="mb-6 text-sm text-slate-300">
              Please access this page from the link in your confirmation email.
            </p>
            <Link
              href="/"
              className="inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition"
            >
              Back to Homepage
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const license = await getLicense(email)

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100">
      <header className="border-b border-white/5 bg-[#0d1117]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-black text-xs">
              AA
            </div>
            <div className="font-bold text-sm sm:text-base">Absolute Assistant</div>
          </Link>
          <nav className="hidden sm:flex gap-6 text-sm">
            <Link href="/" className="text-slate-400 hover:text-slate-300 transition">Home</Link>
            <Link href="/download" className="text-slate-400 hover:text-slate-300 transition">Download</Link>
            <a href="mailto:support@yourdomain.com" className="text-slate-400 hover:text-slate-300 transition">Contact</a>
          </nav>
        </div>
      </header>

      <main className="flex items-center justify-center px-4 py-8 min-h-[calc(100vh-60px)]">
        <div className="rounded-3xl border border-white/5 bg-[#161b22] backdrop-blur-sm px-6 sm:px-8 py-8 sm:py-10 max-w-lg w-full text-center shadow-2xl shadow-black/40">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">
            AA
          </div>
          <h1 className="mb-3 text-2xl font-black">Purchase Successful!</h1>
          <p className="mb-6 text-sm text-slate-300">
            Your license key has been sent to <strong className="text-slate-200">{email}</strong>
          </p>

          {license ? (
            <>
              {/* License Hash Display */}
              <div className="mb-6 p-4 rounded-xl bg-[#0a0e1a] border border-white/10">
                <p className="text-xs text-slate-400 mb-2">License Hash (stored in database):</p>
                <div className="font-mono text-sm font-bold text-emerald-400 break-all select-all">
                  {license.license_hash}
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  <strong>Note:</strong> This is the SHA256 hash of your raw license key. The raw key (UUID format) was sent to your email and is what you enter in the app. The hash is stored for security—we never store the raw key in the database.
                </p>
              </div>

              {/* Expiry Information */}
              <div className="mb-6 p-4 rounded-xl bg-[#0a0e1a] border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-slate-400">Expires:</p>
                  <p
                    className={`text-xs font-semibold ${
                      isExpired(license.expires_at) ? 'text-red-400' : 'text-emerald-400'
                    }`}
                  >
                    {isExpired(license.expires_at) ? 'Expired' : 'Active'}
                  </p>
                </div>
                <p className="text-sm text-slate-300">{formatDate(license.expires_at)}</p>
                {!isExpired(license.expires_at) && (
                  <p className="text-xs text-slate-400 mt-2">
                    Your license will automatically extend on subscription renewal.
                  </p>
                )}
              </div>

              {/* Note about raw key */}
              <div className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs text-blue-300">
                  <strong>Note:</strong> The raw license key has been sent to your email. Use that
                  key to activate the app. This page shows the hash for verification purposes.
                </p>
              </div>
            </>
          ) : (
            <div className="mb-6 p-4 rounded-xl bg-[#0a0e1a] border border-yellow-500/20">
              <div className="flex items-start gap-3 mb-3">
                <svg className="w-5 h-5 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm text-slate-300 mb-2">
                    Your license key is being generated. This usually takes 10-30 seconds.
                  </p>
                  <p className="text-xs text-slate-400 mb-3">
                    The webhook is processing your payment. Please check your email inbox (and spam folder) or refresh this page in a moment.
                  </p>
                  <div className="space-y-2 text-xs text-slate-500">
                    <p>• Check your email: <strong className="text-slate-400">{email}</strong></p>
                    <p>• The raw license key will be sent via email</p>
                    <p>• Refresh this page in 30 seconds to see your license hash</p>
                    <p className="pt-2 border-t border-white/5">
                      <a 
                        href={`/api/debug-license?email=${encodeURIComponent(email)}`} 
                        target="_blank"
                        className="text-blue-400 hover:text-blue-300 transition underline"
                      >
                        Check license status →
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Download Link */}
          <div className="space-y-4">
            <Link
              href="/download"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-8 py-4 text-base sm:text-lg font-bold text-white hover:opacity-90 transition shadow-lg shadow-blue-500/20 w-full sm:w-auto"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Absolute Assistant
            </Link>

            <Link
              href="/"
              className="mt-6 inline-block text-sm text-slate-400 hover:text-white transition"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 bg-[#0a0e1a] py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <div className="text-center sm:text-left">
              <div className="font-semibold text-slate-300 mb-1">
                © {new Date().getFullYear()} Absolute Assistant
              </div>
              <p className="text-xs">Local AI desktop automation for Windows</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/terms" className="hover:text-slate-300 transition">Terms</Link>
              <Link href="/privacy" className="hover:text-slate-300 transition">Privacy</Link>
              <a href="mailto:support@yourdomain.com" className="hover:text-slate-300 transition">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

