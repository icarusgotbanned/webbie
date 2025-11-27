import Link from 'next/link'

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0d1117]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Absolute Assistant" 
              className="w-7 h-7 rounded object-contain"
            />
            <div className="font-bold text-sm sm:text-base">Absolute Assistant</div>
          </Link>
          <nav className="hidden sm:flex gap-6 text-sm">
            <Link href="/" className="text-slate-400 hover:text-slate-300 transition">Home</Link>
            <Link href="/reputation" className="text-slate-400 hover:text-slate-300 transition">Reputation</Link>
            <Link href="/local-app" className="text-slate-400 hover:text-slate-300 transition">Why Local App</Link>
            <Link href="/download" className="text-slate-400 hover:text-slate-300 transition">Download</Link>
            <a href="mailto:absoluteassistant42@gmail.com" className="text-slate-400 hover:text-slate-300 transition">Contact</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-8 sm:pb-12 space-y-12">
        {/* Hero */}
        <section className="text-center space-y-4 pt-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Safe & Secure Installation
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            Your security and privacy are our top priorities. Learn how we ensure a trustworthy installation process.
          </p>
        </section>

        {/* Trust Indicators */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center space-y-2 bg-[#161b22] border border-white/5 rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-200">Code Signed</h3>
            <p className="text-xs text-slate-400">Digitally signed executable verified by Windows</p>
          </div>
          <div className="text-center space-y-2 bg-[#161b22] border border-white/5 rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-200">Virus Scanned</h3>
            <p className="text-xs text-slate-400">Scanned by multiple antivirus engines</p>
          </div>
          <div className="text-center space-y-2 bg-[#161b22] border border-white/5 rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-200">Secure Download</h3>
            <p className="text-xs text-slate-400">HTTPS encrypted download and verification</p>
          </div>
          <div className="text-center space-y-2 bg-[#161b22] border border-white/5 rounded-xl p-6">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-200">Trusted Brand</h3>
            <p className="text-xs text-slate-400">Professional installer with clear branding</p>
          </div>
        </section>

        {/* Installation Guide */}
        <section className="space-y-6 bg-[#161b22] border border-white/5 rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">What to Expect During Installation</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-slate-200 mb-2">Windows SmartScreen</h3>
              <p className="text-slate-300 leading-relaxed">
                When you first download Absolute Assistant, Windows may show a security warning. This is normal for new applications. Click "More info" and then "Run anyway" to see our verified digital signature. Our installer is code-signed with a valid certificate, which Windows will confirm.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-200 mb-2">Verification Steps</h3>
              <p className="text-slate-300 leading-relaxed mb-2">
                To verify the installer is legitimate:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm ml-4">
                <li>Check that the publisher name matches "Absolute Assistant" or your registered company name</li>
                <li>Verify the file size matches what's listed on the download page</li>
                <li>Ensure you downloaded from the official website (https://absoluteassistant.site)</li>
                <li>Right-click the installer and select "Properties" to view the digital signature</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg text-slate-200 mb-2">Antivirus Scanning</h3>
              <p className="text-slate-300 leading-relaxed">
                Our installer is scanned by multiple antivirus engines through VirusTotal before release. If your antivirus flags the file, it's likely a false positive common with automation tools. You can view our scan results and report false positives if needed.
              </p>
            </div>
          </div>
        </section>

        {/* Download CTA */}
        <section className="text-center space-y-4 pt-8">
          <Link
            href="/download"
            className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-lg hover:opacity-90 transition shadow-lg shadow-blue-500/20"
          >
            Download Absolute Assistant
          </Link>
          <p className="text-sm text-slate-400">If you have any concerns, contact us at <a href="mailto:absoluteassistant42@gmail.com" className="text-blue-400 hover:underline">absoluteassistant42@gmail.com</a></p>
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

