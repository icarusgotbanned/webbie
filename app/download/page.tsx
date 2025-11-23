import Stripe from 'stripe'
import Link from 'next/link'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

interface DownloadPageProps {
  searchParams: { session_id?: string }
}

export default async function DownloadPage({ searchParams }: DownloadPageProps) {
  const sessionId = searchParams.session_id

  if (!sessionId) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
        <div className="rounded-3xl border border-white/8 bg-slate-900/70 backdrop-blur-sm px-8 py-10 max-w-md text-center shadow-2xl shadow-black/40">
          <h1 className="mb-3 text-xl font-black">No purchase found</h1>
          <p className="mb-6 text-sm text-slate-300">
            To download Absolute Assistant, please complete your purchase first.
          </p>
          <Link
            href="/#pricing"
            className="inline-flex rounded-xl bg-gradient-to-r from-sky-400 to-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:opacity-90 transition"
          >
            Back to pricing
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
      <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
        <div className="rounded-3xl border border-white/8 bg-slate-900/70 backdrop-blur-sm px-8 py-10 max-w-md text-center shadow-2xl shadow-black/40">
          <h1 className="mb-3 text-xl font-black">Payment not confirmed</h1>
          <p className="mb-6 text-sm text-slate-300">
            We could not verify your payment. If you were charged, please contact support with your receipt.
          </p>
          <Link
            href="/#pricing"
            className="inline-flex rounded-xl bg-gradient-to-r from-sky-400 to-emerald-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:opacity-90 transition"
          >
            Back to pricing
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="rounded-3xl border border-white/8 bg-slate-900/70 backdrop-blur-sm px-8 py-10 max-w-md text-center shadow-2xl shadow-black/40">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center text-slate-950 font-black text-2xl mx-auto mb-4">
          AA
        </div>
        <h1 className="mb-3 text-2xl font-black">Thank you for your purchase</h1>
        <p className="mb-8 text-sm text-slate-300">
          Your license is active. Download the Absolute Assistant installer below.
        </p>
        <a
          href="https://www.lancelot.world/downloads/AbsoluteAssistantSetup.exe"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-400 to-emerald-400 px-6 py-3 text-base font-bold text-slate-950 hover:opacity-90 transition shadow-lg shadow-sky-500/20"
        >
          Download Absolute Assistant for Windows
        </a>
        <p className="mt-6 text-xs text-slate-400">
          Keep this installer private. Your purchase allows personal use only.
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

