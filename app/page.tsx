'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleCheckout() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Error: ' + (data.error || 'Unable to create checkout session'))
        setIsLoading(false)
      }
    } catch (err) {
      alert('Error creating checkout session')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/8 bg-slate-950/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center text-slate-950 font-black text-sm">
              AA
            </div>
            <div>
              <div className="font-black text-lg tracking-tight">Absolute Assistant</div>
              <div className="text-xs text-slate-400">Local AI Desktop RPA</div>
            </div>
          </div>
          <nav className="flex gap-6 text-sm">
            <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition">Pricing</a>
            <a href="#faq" className="text-slate-300 hover:text-white transition">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Chat Window Card */}
          <div className="rounded-3xl border border-white/8 bg-slate-900/70 backdrop-blur-sm shadow-2xl shadow-black/40 overflow-hidden">
            {/* Title Bar */}
            <div className="bg-slate-800/50 border-b border-white/8 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">Absolute Assistant — trev9</span>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  License: valid
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs bg-slate-700/50 text-slate-300 border border-white/8">
                  Auto-execute
                </span>
              </div>
            </div>

            {/* Chat Area */}
            <div className="p-4 space-y-4 min-h-[300px] bg-slate-950/30">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="bg-slate-800/50 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">
                    Hey Assistant, open Discord, Steam and my email, then summarize my inbox.
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="bg-slate-800/70 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm">
                    Done. I've opened your apps and drafted summaries for your last 5 emails.
                  </div>
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="border-t border-white/8 px-4 py-3 bg-slate-800/30">
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-xl bg-slate-700/50 px-4 py-2 text-sm text-slate-400">
                  Ask or command anything…
                </div>
                <span className="px-2 py-1 rounded text-xs bg-slate-700/50 text-slate-400 border border-white/8">
                  Win + Shift + A
                </span>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Absolute Assistant
              </h1>
              <p className="text-xl text-slate-300 mb-6">
                Your local AI that clicks, types and automates your desktop for you.
              </p>
            </div>

            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>Voice wake-word ("Hey Assistant") + dictation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>Gmail / email drafting automation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>Script-like workflows without coding</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>Runs locally, connects to AI in the cloud</span>
              </li>
            </ul>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-emerald-400 text-slate-950 font-bold hover:opacity-90 transition disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Get Absolute Assistant'}
              </button>
              <a
                href="#features"
                className="px-6 py-3 rounded-xl border border-white/8 bg-slate-800/50 text-white font-semibold hover:bg-slate-800/70 transition"
              >
                See how it works
              </a>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mt-32">
          <h2 className="text-3xl font-black mb-8">Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-6 backdrop-blur-sm">
              <h3 className="font-bold mb-2">Open & Control Apps</h3>
              <p className="text-sm text-slate-400">
                Discord, Steam, EA, Epic Games, Office, Notepad, Calculator, browsers, and more.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-6 backdrop-blur-sm">
              <h3 className="font-bold mb-2">Human-like Typing</h3>
              <p className="text-sm text-slate-400">
                Natural keystroke pacing and paste fallback for long text blocks.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-6 backdrop-blur-sm">
              <h3 className="font-bold mb-2">Web Automation</h3>
              <p className="text-sm text-slate-400">
                Navigate, log in, and fill forms; supports local indexing for fast search.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-6 backdrop-blur-sm">
              <h3 className="font-bold mb-2">Local-first</h3>
              <p className="text-sm text-slate-400">
                Your automations run on your machine. Use your own API keys, keep your data local.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-6 backdrop-blur-sm">
              <h3 className="font-bold mb-2">Voice Control</h3>
              <p className="text-sm text-slate-400">
                Wake word detection and voice commands for hands-free automation.
              </p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-slate-900/70 p-6 backdrop-blur-sm">
              <h3 className="font-bold mb-2">Fast Support</h3>
              <p className="text-sm text-slate-400">
                Email us any time: <a href="mailto:support@yourdomain.com" className="text-sky-400 hover:underline">support@yourdomain.com</a>
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="mt-32">
          <h2 className="text-3xl font-black mb-8">Pricing</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            <div className="rounded-3xl border border-white/8 bg-gradient-to-b from-slate-900/80 to-slate-900/50 p-8 backdrop-blur-sm">
              <div className="inline-block px-3 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-4">
                Most Popular
              </div>
              <div className="text-4xl font-black mb-4">
                $9<span className="text-lg font-semibold">/mo</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm text-slate-300">
                <li>• All features, unlimited flows</li>
                <li>• Local-first — keep your data on-device</li>
                <li>• Priority email support</li>
              </ul>
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-emerald-400 text-slate-950 font-bold hover:opacity-90 transition disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Get Absolute Assistant'}
              </button>
              <p className="text-xs text-slate-400 mt-3 text-center">7-day money-back guarantee</p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-slate-900/70 p-8 backdrop-blur-sm">
              <div className="inline-block px-3 py-1 rounded-full text-xs bg-slate-700/50 text-slate-300 border border-white/8 mb-4">
                Free Trial
              </div>
              <div className="text-4xl font-black mb-4">$0</div>
              <ul className="space-y-2 mb-6 text-sm text-slate-300">
                <li>• Try core features</li>
                <li>• No credit card required</li>
                <li>• One device</li>
              </ul>
              <a
                href="#features"
                className="block w-full text-center px-6 py-3 rounded-xl border border-white/8 bg-slate-800/50 text-white font-semibold hover:bg-slate-800/70 transition"
              >
                Learn more
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="mt-32 mb-16">
          <h2 className="text-3xl font-black mb-8">FAQ</h2>
          <div className="space-y-4 max-w-2xl">
            <details className="rounded-xl border border-white/8 bg-slate-900/70 p-4 backdrop-blur-sm">
              <summary className="font-semibold cursor-pointer">Does it work offline?</summary>
              <p className="mt-2 text-sm text-slate-400">
                Yes. Core automation runs locally. Some cloud connectors are optional.
              </p>
            </details>
            <details className="rounded-xl border border-white/8 bg-slate-900/70 p-4 backdrop-blur-sm">
              <summary className="font-semibold cursor-pointer">Can I turn off the mic?</summary>
              <p className="mt-2 text-sm text-slate-400">
                Yes. Voice wake-word and dictation can be disabled in settings. All features work without voice.
              </p>
            </details>
            <details className="rounded-xl border border-white/8 bg-slate-900/70 p-4 backdrop-blur-sm">
              <summary className="font-semibold cursor-pointer">Can I cancel anytime?</summary>
              <p className="mt-2 text-sm text-slate-400">
                Yes. Subscriptions are month-to-month; cancel from the email link or contact support.
              </p>
            </details>
            <details className="rounded-xl border border-white/8 bg-slate-900/70 p-4 backdrop-blur-sm">
              <summary className="font-semibold cursor-pointer">How is my license verified?</summary>
              <p className="mt-2 text-sm text-slate-400">
                At launch, the app validates your key via our secure API. Keys can be rotated anytime.
              </p>
            </details>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/8 bg-slate-950/50 backdrop-blur-sm py-8">
        <div className="mx-auto max-w-7xl px-6 flex justify-between items-center text-sm text-slate-400">
          <div>© {new Date().getFullYear()} Absolute Assistant</div>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

