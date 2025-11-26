import Stripe from 'stripe'
import Link from 'next/link'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

interface DownloadPageProps {
  searchParams: { session_id?: string }
}

async function getLicenseKey(sessionId: string): Promise<string | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'https://www.lancelot.world'
    const res = await fetch(`${baseUrl}/api/lookup-license?session_id=${encodeURIComponent(sessionId)}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.license_key || null
  } catch (e) {
    console.error('Error fetching license key:', e)
    return null
  }
}

export default async function DownloadPage({ searchParams }: DownloadPageProps) {
  const sessionId = searchParams.session_id

  if (!sessionId) {
    return (
      <main className="min-h-screen bg-[#0a0e1a] text-slate-50 flex items-center justify-center px-4">
        <div className="rounded-3xl border border-white/5 bg-[#161b22] backdrop-blur-sm px-8 py-10 max-w-md text-center shadow-2xl shadow-black/40">
          <h1 className="mb-3 text-xl font-black">No purchase found</h1>
          <p className="mb-6 text-sm text-slate-300">
            To download Absolute Assistant, please complete your purchase first.
          </p>
          <Link
            href="/"
            className="inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition"
          >
            Back to homepage
          </Link>
        </div>
      </main>
    )
  }

  let paid = false
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    paid = session.payment_status === 'paid'
  } catch (e) {
    console.error('Error verifying checkout session', e)
  }

  if (!paid) {
    return (
      <main className="min-h-screen bg-[#0a0e1a] text-slate-50 flex items-center justify-center px-4">
        <div className="rounded-3xl border border-white/5 bg-[#161b22] backdrop-blur-sm px-8 py-10 max-w-md text-center shadow-2xl shadow-black/40">
          <h1 className="mb-3 text-xl font-black">Payment not confirmed</h1>
          <p className="mb-6 text-sm text-slate-300">
            We could not verify your payment. If you were charged, please contact support with your receipt.
          </p>
          <Link
            href="/"
            className="inline-flex rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition"
          >
            Back to homepage
          </Link>
        </div>
      </main>
    )
  }

  // Fetch license key from Supabase
  const licenseKey = await getLicenseKey(sessionId)

  return (
    <main className="min-h-screen bg-[#0a0e1a] text-slate-50 flex items-center justify-center px-4 py-8">
      <div className="rounded-3xl border border-white/5 bg-[#161b22] backdrop-blur-sm px-8 py-10 max-w-lg w-full text-center shadow-2xl shadow-black/40">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">
          AA
        </div>
        <h1 className="mb-3 text-2xl font-black">Thank you for your purchase</h1>
        <p className="mb-6 text-sm text-slate-300">
          Your license is active. Your license key has been emailed to you and is shown below.
        </p>

        {/* License Key Display */}
        {licenseKey ? (
          <div className="mb-6 p-4 rounded-xl bg-[#0a0e1a] border border-white/10">
            <p className="text-xs text-slate-400 mb-2">Your License Key:</p>
            <div className="font-mono text-lg font-bold text-emerald-400 break-all select-all">
              {licenseKey}
            </div>
            <p className="text-xs text-slate-400 mt-3">
              Copy this key and enter it in the Absolute Assistant app to activate your license.
            </p>
          </div>
        ) : (
          <div className="mb-6 p-4 rounded-xl bg-[#0a0e1a] border border-white/10">
            <p className="text-sm text-slate-400">
              Your license key is being generated. Please check your email or refresh this page in a moment.
            </p>
          </div>
        )}

        <a
          href="https://www.lancelot.world/downloads/AbsoluteAssistantSetup.exe"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-6 py-3 text-base font-bold text-white hover:opacity-90 transition shadow-lg shadow-blue-500/20 mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Absolute Assistant for Windows
        </a>
        
        {/* Trust Indicators */}
        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Code Signed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Virus Scanned</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure Download</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center">
            If Windows shows a security warning, click "More info" to view our verified digital signature.
          </p>
          <p className="text-xs text-slate-400 text-center">
            Keep this installer and license key private. Your purchase allows personal use only.
          </p>
        </div>
        <Link
          href="/"
          className="mt-6 inline-block text-sm text-slate-400 hover:text-white transition"
        >
          ← Back to homepage
        </Link>
      </div>
    </main>
  )
}
