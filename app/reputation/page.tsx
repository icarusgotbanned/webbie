import Link from 'next/link'

export default function ReputationPage() {
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
            <Link href="/reputation" className="text-blue-400 hover:text-blue-300 transition">Reputation</Link>
            <Link href="/local-app" className="text-slate-400 hover:text-slate-300 transition">Why Local App</Link>
            <Link href="/download" className="text-slate-400 hover:text-slate-300 transition">Download</Link>
            <a href="mailto:support@yourdomain.com" className="text-slate-400 hover:text-slate-300 transition">Contact</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Trusted by Users
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
            See what real users are saying about Absolute Assistant
          </p>
        </section>

        {/* Testimonials */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-white/5 bg-[#161b22] p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <div className="font-semibold text-slate-200">John D.</div>
                <div className="text-xs text-slate-400">Software Developer</div>
              </div>
            </div>
            <div className="flex text-yellow-400 text-sm">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              "Saves me 30+ minutes every morning. Just say 'open my work apps' and everything launches instantly. Game changer."
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#161b22] p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                SM
              </div>
              <div>
                <div className="font-semibold text-slate-200">Sarah M.</div>
                <div className="text-xs text-slate-400">Marketing Manager</div>
              </div>
            </div>
            <div className="flex text-yellow-400 text-sm">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              "The privacy aspect sold me. Everything runs locally, and I control my own API keys. Plus, it actually works reliably."
            </p>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#161b22] p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                MK
              </div>
              <div>
                <div className="font-semibold text-slate-200">Mike K.</div>
                <div className="text-xs text-slate-400">Content Creator</div>
              </div>
            </div>
            <div className="flex text-yellow-400 text-sm">
              {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              "Voice commands work flawlessly. Being able to control my entire desktop setup with my voice is incredible."
            </p>
          </div>
        </section>

        {/* Screenshots Placeholder */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-100">Screenshots</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="aspect-video bg-[#161b22] border border-white/5 rounded-xl flex items-center justify-center">
              <p className="text-slate-400 text-sm">Screenshot coming soon</p>
            </div>
            <div className="aspect-video bg-[#161b22] border border-white/5 rounded-xl flex items-center justify-center">
              <p className="text-slate-400 text-sm">Screenshot coming soon</p>
            </div>
            <div className="aspect-video bg-[#161b22] border border-white/5 rounded-xl flex items-center justify-center">
              <p className="text-slate-400 text-sm">Screenshot coming soon</p>
            </div>
          </div>
        </section>

        {/* Demo Video Placeholder */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-100">Demo Video</h2>
          <div className="aspect-video bg-[#161b22] border border-white/5 rounded-xl flex items-center justify-center">
            <p className="text-slate-400">Demo video coming soon</p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-4 pt-8">
          <Link
            href="/download"
            className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-lg hover:opacity-90 transition shadow-lg shadow-blue-500/20"
          >
            Try Absolute Assistant
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
              <a href="mailto:support@yourdomain.com" className="hover:text-slate-300 transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

