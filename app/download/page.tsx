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
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-6 py-3 text-base font-bold text-white hover:opacity-90 transition shadow-lg shadow-blue-500/20 mb-4"
        >
          Download Absolute Assistant for Windows
        </a>
        <p className="mt-4 text-xs text-slate-400">
          Keep this installer and license key private. Your purchase allows personal use only.
        </p>
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
