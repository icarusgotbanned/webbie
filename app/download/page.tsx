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
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'https://absoluteassistant.site'
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

  // Check if this is a post-purchase visit
  let paid = false
  let licenseKey: string | null = null

  if (sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      paid = session.payment_status === 'paid'
      
      if (paid) {
        licenseKey = await getLicenseKey(sessionId)
      }
    } catch (e) {
      console.error('Error verifying checkout session', e)
    }
  }


  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-50">
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
            <Link href="/reputation" className="text-slate-400 hover:text-slate-300 transition">Reputation</Link>
            <Link href="/local-app" className="text-slate-400 hover:text-slate-300 transition">Why Local App</Link>
            <Link href="/download" className="text-blue-400 hover:text-blue-300 transition">Download</Link>
            <a href="mailto:absoluteassistant42@gmail.com" className="text-slate-400 hover:text-slate-300 transition">Contact</a>
          </nav>
        </div>
      </header>

      <main className="flex items-center justify-center px-4 pt-16 sm:pt-20 pb-8 min-h-[calc(100vh-60px)]">
        <div className="rounded-3xl border border-white/5 bg-[#161b22] backdrop-blur-sm px-6 sm:px-8 py-8 sm:py-10 max-w-lg w-full text-center shadow-2xl shadow-black/40">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">
          AA
        </div>
        <h1 className="mb-3 text-2xl font-black">Download Absolute Assistant</h1>
        <p className="mb-6 text-sm text-slate-300">
          Download is completely free. A license key is required to activate the app after installation.
        </p>

        {/* License Key Display - Only show if purchased */}
        {paid && licenseKey ? (
          <div className="mb-6 p-4 rounded-xl bg-[#0a0e1a] border border-emerald-500/20">
            <p className="text-xs text-emerald-400 mb-2 font-semibold">✓ Your License Key (Active):</p>
            <div className="font-mono text-lg font-bold text-emerald-400 break-all select-all">
              {licenseKey}
            </div>
            <p className="text-xs text-slate-400 mt-3">
              Copy this key and enter it in the Absolute Assistant app to activate your license.
            </p>
          </div>
        ) : paid ? (
          <div className="mb-6 p-4 rounded-xl bg-[#0a0e1a] border border-white/10">
            <p className="text-sm text-slate-400">
              Your license key is being generated. Please check your email or refresh this page in a moment.
            </p>
          </div>
        ) : (
          <div className="mb-6 p-4 rounded-xl bg-[#0a0e1a] border border-blue-500/20">
            <p className="text-sm text-slate-300 mb-2">
              Need a license key to activate?
            </p>
            <Link
              href="/#pricing"
              className="text-sm text-blue-400 hover:text-blue-300 transition font-semibold"
            >
              Purchase a license key →
            </Link>
          </div>
        )}

        {/* Download Section */}
        <div className="space-y-4">
          <a
            href="https://absoluteassistant.site/downloads/AbsoluteAssistantSetup.exe"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 px-8 py-4 text-base sm:text-lg font-bold text-white hover:opacity-90 transition shadow-lg shadow-blue-500/20 w-full sm:w-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Absolute Assistant for Windows
          </a>
          
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-400 pt-2">
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
          <p className="text-xs text-slate-500 text-center px-4">
            If Windows shows a security warning, click "More info" to view our verified digital signature.
          </p>
          {paid && (
            <p className="text-xs text-slate-400 text-center">
              Keep your license key private. Your purchase allows personal use only.
            </p>
          )}
          <p className="text-xs text-slate-400 text-center">
            After installation, you'll need a license key to activate the app. Download is free for everyone.
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

      <footer className="border-t border-white/5 bg-[#0a0e1a] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <div className="text-center sm:text-left">
              <div className="font-semibold text-slate-300 mb-1">© {new Date().getFullYear()} Absolute Assistant</div>
              <p className="text-xs">Local AI desktop automation for Windows</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/terms" className="hover:text-slate-300 transition">Terms</Link>
              <Link href="/privacy" className="hover:text-slate-300 transition">Privacy</Link>
              <a href="mailto:absoluteassistant42@gmail.com" className="hover:text-slate-300 transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
