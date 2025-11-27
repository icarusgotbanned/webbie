import Link from 'next/link'

export default function LocalAppPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100">
      {/* Header */}
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
            <Link href="/local-app" className="text-blue-400 hover:text-blue-300 transition">Why Local App</Link>
            <Link href="/download" className="text-slate-400 hover:text-slate-300 transition">Download</Link>
            <a href="mailto:absoluteassistant42@gmail.com" className="text-slate-400 hover:text-slate-300 transition">Contact</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12 space-y-12">
        {/* Hero */}
        <section className="text-center space-y-4 pt-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Why a Local App?
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Absolute Assistant runs on your machine, not in a browser. This provides capabilities that web-only tools cannot offer.
          </p>
        </section>

        {/* Key Benefits */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-slate-200">Privacy First</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your commands, data, and actions stay on your computer. No cloud logging, no external tracking. You control your own API keys.
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#161b22] p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-slate-200">Instant Speed</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              OS-level control means zero latency. Actions execute immediately, without network delays or browser limitations.
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#161b22] p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-slate-200">Full System Access</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Control native apps, access local files, run system commands, and automate anything on your PC—features only possible with a local installation.
            </p>
          </div>
        </section>

        {/* Detailed Explanation */}
        <section className="space-y-6 bg-[#161b22] border border-white/5 rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">What You Get With Local Execution</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg text-slate-200 mb-2">OS-Level Control</h3>
              <p className="text-slate-300 leading-relaxed">
                Absolute Assistant needs to launch and control native Windows applications, access system files, and execute commands instantly. Browsers run in a sandboxed environment and cannot provide this level of system integration.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-200 mb-2">Complete Data Privacy</h3>
              <p className="text-slate-300 leading-relaxed">
                When automation runs on your machine, your commands and actions never leave your computer. If you use AI features, you can provide your own API keys, ensuring direct communication between your machine and the AI provider—no intermediary services.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-200 mb-2">Performance Advantages</h3>
              <p className="text-slate-300 leading-relaxed">
                Local execution means actions happen immediately without network round-trips. OS-level input simulation provides instant response times that web-based tools cannot match due to browser security restrictions and network latency.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-200 mb-2">System-Wide Automation</h3>
              <p className="text-slate-300 leading-relaxed">
                Control any application on your PC, access files anywhere on your system, run system commands, and automate workflows that span multiple applications. These capabilities are fundamental to Absolute Assistant's value and are impossible to achieve through a browser.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-4 pt-8">
          <Link
            href="/download"
            className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-lg hover:opacity-90 transition shadow-lg shadow-blue-500/20"
          >
            Download Absolute Assistant
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0a0e1a] py-8 mt-16">
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

