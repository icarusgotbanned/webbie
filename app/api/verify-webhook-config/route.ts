import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  
  return NextResponse.json({
    webhookSecret: {
      exists: !!webhookSecret,
      length: webhookSecret?.length || 0,
      prefix: webhookSecret ? webhookSecret.substring(0, 10) + '...' : 'NOT SET',
      expectedFormat: 'Should start with: whsec_',
    },
    stripeSecretKey: {
      exists: !!stripeSecretKey,
      prefix: stripeSecretKey ? stripeSecretKey.substring(0, 10) + '...' : 'NOT SET',
      isTestMode: stripeSecretKey?.startsWith('sk_test_') || false,
      isLiveMode: stripeSecretKey?.startsWith('sk_live_') || false,
    },
    instructions: {
      step1: 'Go to Stripe Dashboard → Developers → Webhooks → Your webhook',
      step2: 'Click "Reveal" on Signing secret',
      step3: 'Copy the secret (starts with whsec_)',
      step4: 'Set it in Vercel → Settings → Environment Variables → STRIPE_WEBHOOK_SECRET',
      step5: 'Redeploy your application',
    },
  })
}

