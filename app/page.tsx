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
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0d1117]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-black text-xs">
              AA
            </div>
            <div>
              <div className="font-bold text-base">Absolute Assistant — trev9</div>
            </div>
          </div>
          <nav className="flex gap-6 text-sm">
            <a href="#features" className="text-blue-400 hover:text-blue-300 transition">Chat</a>
            <a href="#pricing" className="text-slate-400 hover:text-slate-300 transition">Settings</a>
            <a href="#faq" className="text-slate-400 hover:text-slate-300 transition">Developer</a>
          </nav>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-60px)]">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-white/5 bg-[#0a0e1a] p-4">
          <button className="w-full mb-4 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition">
            + New Chat
          </button>
          <div className="space-y-1">
            <div className="px-3 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 cursor-pointer">
              <div className="text-sm font-medium text-slate-200">New chat</div>
              <div className="text-xs text-slate-400 mt-0.5">6:43 PM</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="border-b border-white/5 bg-[#0d1117]/50 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-slate-300">License: valid</span>
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
              <input type="checkbox" className="rounded" defaultChecked />
              <span>Auto-execute</span>
            </label>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-6 bg-[#0a0e1a] overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Hero Content */}
              <div className="grid lg:grid-cols-2 gap-8 items-center mt-8">
                <div>
                  <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Absolute Assistant
                  </h1>
                  <p className="text-xl text-slate-300 mb-6">
                    Your local AI that clicks, types and automates your desktop for you.
                  </p>
                  <ul className="space-y-3 text-slate-300 mb-8">
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
                  <button
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-base hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-blue-500/20"
                  >
                    {isLoading ? 'Loading...' : 'Get Absolute Assistant'}
                  </button>
                </div>

                {/* Example Chat Messages */}
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-700 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-[#161b22] border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-200">
                        Hey Assistant, open Discord, Steam and my email, then summarize my inbox.
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-[#161b22] border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-200">
                        Done. I've opened your apps and drafted summaries for your last 5 emails.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <section id="features" className="mt-24 pt-16">
                <h2 className="text-3xl font-black mb-8 text-slate-100">Features</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                    <h3 className="font-bold mb-2 text-slate-200">Open & Control Apps</h3>
                    <p className="text-sm text-slate-400">
                      Discord, Steam, EA, Epic Games, Office, Notepad, Calculator, browsers, and more.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                    <h3 className="font-bold mb-2 text-slate-200">Human-like Typing</h3>
                    <p className="text-sm text-slate-400">
                      Natural keystroke pacing and paste fallback for long text blocks.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                    <h3 className="font-bold mb-2 text-slate-200">Web Automation</h3>
                    <p className="text-sm text-slate-400">
                      Navigate, log in, and fill forms; supports local indexing for fast search.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                    <h3 className="font-bold mb-2 text-slate-200">Local-first</h3>
                    <p className="text-sm text-slate-400">
                      Your automations run on your machine. Use your own API keys, keep your data local.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                    <h3 className="font-bold mb-2 text-slate-200">Voice Control</h3>
                    <p className="text-sm text-slate-400">
                      Wake word detection and voice commands for hands-free automation.
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                    <h3 className="font-bold mb-2 text-slate-200">Fast Support</h3>
                    <p className="text-sm text-slate-400">
                      Email us any time: <a href="mailto:support@yourdomain.com" className="text-blue-400 hover:underline">support@yourdomain.com</a>
                    </p>
                  </div>
                </div>
              </section>

              {/* Pricing Section - Single Option */}
              <section id="pricing" className="mt-24 pt-16">
                <h2 className="text-3xl font-black mb-8 text-slate-100">Pricing</h2>
                <div className="max-w-md mx-auto">
                  <div className="rounded-2xl border border-white/5 bg-[#161b22] p-8">
                    <div className="text-4xl font-black mb-4 text-slate-100">
                      $9<span className="text-lg font-semibold text-slate-400">/mo</span>
                    </div>
                    <ul className="space-y-2 mb-6 text-sm text-slate-300">
                      <li>• All features, unlimited flows</li>
                      <li>• Local-first — keep your data on-device</li>
                      <li>• Priority email support</li>
                      <li>• Voice wake-word & dictation</li>
                      <li>• Auto-execute workflows</li>
                    </ul>
                    <button
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-blue-500/20"
                    >
                      {isLoading ? 'Loading...' : 'Get Absolute Assistant'}
                    </button>
                    <p className="text-xs text-slate-400 mt-4 text-center">7-day money-back guarantee</p>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="mt-24 pt-16 mb-16">
                <h2 className="text-3xl font-black mb-8 text-slate-100">FAQ</h2>
                <div className="space-y-3 max-w-2xl">
                  <details className="rounded-xl border border-white/5 bg-[#161b22] p-4">
                    <summary className="font-semibold cursor-pointer text-slate-200">Does it work offline?</summary>
                    <p className="mt-2 text-sm text-slate-400">
                      Yes. Core automation runs locally. Some cloud connectors are optional.
                    </p>
                  </details>
                  <details className="rounded-xl border border-white/5 bg-[#161b22] p-4">
                    <summary className="font-semibold cursor-pointer text-slate-200">Can I turn off the mic?</summary>
                    <p className="mt-2 text-sm text-slate-400">
                      Yes. Voice wake-word and dictation can be disabled in settings. All features work without voice.
                    </p>
                  </details>
                  <details className="rounded-xl border border-white/5 bg-[#161b22] p-4">
                    <summary className="font-semibold cursor-pointer text-slate-200">Can I cancel anytime?</summary>
                    <p className="mt-2 text-sm text-slate-400">
                      Yes. Subscriptions are month-to-month; cancel from the email link or contact support.
                    </p>
                  </details>
                  <details className="rounded-xl border border-white/5 bg-[#161b22] p-4">
                    <summary className="font-semibold cursor-pointer text-slate-200">How is my license verified?</summary>
                    <p className="mt-2 text-sm text-slate-400">
                      At launch, the app validates your key via our secure API. Keys can be rotated anytime.
                    </p>
                  </details>
                </div>
              </section>
            </div>
          </div>

          {/* Input Bar */}
          <div className="border-t border-white/5 bg-[#0d1117]/50 px-6 py-4">
            <div className="max-w-4xl mx-auto flex items-center gap-3">
              <button className="w-10 h-10 rounded-lg bg-[#161b22] border border-white/5 flex items-center justify-center text-slate-400 hover:text-slate-300 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              <div className="flex-1 rounded-xl bg-[#161b22] border border-white/5 px-4 py-2.5 text-sm text-slate-400">
                Ask or command anything…
              </div>
              <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition">
                Send
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0a0e1a] py-6">
        <div className="mx-auto max-w-7xl px-6 flex justify-between items-center text-sm text-slate-400">
          <div>© {new Date().getFullYear()} Absolute Assistant</div>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-slate-300 transition">Terms</Link>
            <Link href="/privacy" className="hover:text-slate-300 transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
