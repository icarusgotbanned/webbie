'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [demoInput, setDemoInput] = useState('')
  const [demoResponse, setDemoResponse] = useState('')

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

  function handleDemoSubmit() {
    if (!demoInput.trim()) return
    setDemoResponse('Demo coming soon! In the full app, I would execute: "' + demoInput + '" - opening apps, typing, clicking, and automating your desktop tasks.')
    setDemoInput('')
  }

  function handleDemoKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleDemoSubmit()
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0d1117]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-black text-xs">
              AA
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base">Absolute Assistant</div>
            </div>
          </div>
          <nav className="hidden sm:flex gap-6 text-sm">
            <a href="#why-local" className="text-slate-400 hover:text-slate-300 transition">Why Local?</a>
            <a href="#features" className="text-blue-400 hover:text-blue-300 transition">Features</a>
            <a href="#testimonials" className="text-slate-400 hover:text-slate-300 transition">Reviews</a>
            <a href="#pricing" className="text-slate-400 hover:text-slate-300 transition">Pricing</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 bg-[#0a0e1a] overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16 sm:space-y-24">
            
            {/* Hero Section */}
            <section className="text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent leading-tight">
                Stop Clicking, Start Commanding
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Your local AI assistant that controls your desktop. Open apps, type, click, and automate tasks—all with natural voice commands or text.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Code Signed</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure Download</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Virus Scanned</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-lg hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-blue-500/20"
                >
                  {isLoading ? 'Loading...' : 'Download Absolute Assistant — $9/mo'}
                </button>
                <p className="text-xs text-slate-500 mt-3">Windows only • 7-day money-back guarantee</p>
              </div>
            </section>

            {/* Killer Use Case - Primary Focus */}
            <section className="bg-[#161b22] border border-white/5 rounded-2xl p-6 sm:p-10 space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-100">Your Daily Routine, Automated</h2>
                <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                  Instead of manually opening apps and clicking through menus, just tell Absolute Assistant what you need. It handles the rest—instantly, reliably, locally.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-[#0a0e1a] rounded-xl p-6 border border-white/5">
                  <div className="flex gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-[#161b22] border border-white/5 rounded-xl rounded-tl-sm px-4 py-3 text-sm text-slate-200">
                        "Open Discord, check Steam downloads, and draft a summary of my unread emails."
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-[#161b22] border border-white/5 rounded-xl rounded-tl-sm px-4 py-3 text-sm text-slate-200">
                        ✓ Discord opened<br/>
                        ✓ Steam checked (3 downloads complete)<br/>
                        ✓ Email summary: 12 unread, 3 urgent
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0e1a] rounded-xl p-6 border border-white/5">
                  <h3 className="font-bold text-slate-200 mb-3">Perfect for:</h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>Opening your morning apps in one command</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>Drafting and sending emails without typing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>Filling out repetitive forms automatically</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>Controlling your desktop with voice commands</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>Multi-app workflows without coding</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Why Local App Section */}
            <section id="why-local" className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-center text-slate-100">Why a Local App?</h2>
              <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto">
                Absolute Assistant runs on your machine, not in a browser. This gives you capabilities that web-only tools simply can't offer.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-10">
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
              </div>
            </section>

            {/* Demo Box */}
            <section className="bg-[#161b22] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100">Try It Now (Demo)</h2>
                <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">Limited Demo</span>
              </div>
              <p className="text-sm text-slate-400">
                See how Absolute Assistant responds to commands. The full app executes these actions on your desktop.
              </p>
              
              <div className="bg-[#0a0e1a] rounded-xl p-4 space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="bg-[#161b22] border border-white/5 rounded-xl rounded-tl-sm px-4 py-2.5 text-sm text-slate-200">
                      {demoInput || 'Type a command here...'}
                    </div>
                  </div>
                </div>
                {demoResponse && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-[#161b22] border border-white/5 rounded-xl rounded-tl-sm px-4 py-2.5 text-sm text-slate-200">
                        {demoResponse}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={demoInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDemoInput(e.target.value)}
                  onKeyDown={handleDemoKeyDown}
                  placeholder="e.g., Open Discord and check my Steam downloads"
                  className="flex-1 rounded-lg bg-[#0a0e1a] border border-white/5 px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
                />
                <button
                  onClick={handleDemoSubmit}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition"
                >
                  Send
                </button>
              </div>
              <p className="text-xs text-slate-500 text-center">
                This is a preview. Download the full app to execute commands on your desktop.
              </p>
            </section>

            {/* Features Section */}
            <section id="features" className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-center text-slate-100">Everything You Need</h2>
              <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto">
                Powerful automation features that work seamlessly with your existing apps and workflows.
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                  <h3 className="font-bold mb-2 text-slate-200">Native App Control</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Launch and interact with any Windows application: Discord, Steam, Office, browsers, games, and more. Full control at the OS level.
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                  <h3 className="font-bold mb-2 text-slate-200">Intelligent Typing</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Human-like keystroke patterns with smart paste fallback for longer content. Perfect for forms, emails, and text inputs.
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                  <h3 className="font-bold mb-2 text-slate-200">Web Automation</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Navigate websites, fill forms, log in, and search. Local indexing for faster, more reliable interactions.
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                  <h3 className="font-bold mb-2 text-slate-200">Voice Commands</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    "Hey Assistant" wake word and full voice dictation. Control your desktop hands-free for ultimate convenience.
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                  <h3 className="font-bold mb-2 text-slate-200">Workflow Automation</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Chain multiple actions into complex workflows. No coding required—just describe what you want done.
                  </p>
                </div>
                <div className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                  <h3 className="font-bold mb-2 text-slate-200">Local Data Privacy</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    All automation runs on your machine. Use your own AI API keys. No cloud storage, no external tracking.
                  </p>
                </div>
              </div>
            </section>

            {/* Testimonials/Reputation */}
            <section id="testimonials" className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-center text-slate-100">Trusted by Users</h2>
              <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto">
                See what people are saying about Absolute Assistant
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-10">
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
              </div>

              <div className="text-center pt-4">
                <p className="text-sm text-slate-400">
                  Demo video and screenshots coming soon. <Link href="#pricing" className="text-blue-400 hover:underline">Try it yourself</Link>
                </p>
              </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black text-center text-slate-100">Simple, Transparent Pricing</h2>
              <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto">
                One price. All features. Cancel anytime.
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="rounded-2xl border border-white/5 bg-[#161b22] p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <div className="text-5xl font-black mb-2 text-slate-100">
                      $9<span className="text-xl font-semibold text-slate-400">/month</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-6">All features included. No hidden fees.</p>
                    
                    <ul className="space-y-3 mb-8 text-sm text-slate-300">
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span>Unlimited automations and workflows</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span>Voice wake-word and dictation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span>Local-first privacy and security</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span>Priority email support</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-emerald-400 mt-0.5">✓</span>
                        <span>Regular updates and improvements</span>
                      </li>
                    </ul>
                    
                    <button
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-base hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-blue-500/20"
                    >
                      {isLoading ? 'Processing...' : 'Start Free Trial'}
                    </button>
                    
                    <div className="mt-4 space-y-2 text-xs text-slate-400 text-center">
                      <p>7-day money-back guarantee</p>
                      <p>Cancel anytime from your account or email</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Installation & Trust */}
            <section className="bg-[#161b22] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-100">Safe & Secure Installation</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-200">Code Signed</h3>
                  <p className="text-xs text-slate-400">Digitally signed executable for verified authenticity</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-200">Virus Scanned</h3>
                  <p className="text-xs text-slate-400">Scanned by multiple antivirus engines</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-200">Secure Download</h3>
                  <p className="text-xs text-slate-400">HTTPS encrypted download and verification</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-200">Trusted Brand</h3>
                  <p className="text-xs text-slate-400">Professional installer with clear branding</p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="space-y-4 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-center text-slate-100 mb-10">Frequently Asked Questions</h2>
              
              <details className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <summary className="font-semibold cursor-pointer text-slate-200 text-lg">Why should I download a local app instead of using a web version?</summary>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Local apps provide OS-level access that browsers cannot. Absolute Assistant needs to control native Windows applications, access system files, and execute commands instantly—all while keeping your data completely private on your machine. Web-based tools are limited by browser security restrictions and network latency.
                </p>
              </details>
              
              <details className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <summary className="font-semibold cursor-pointer text-slate-200 text-lg">Is the installer safe? How do I know it's legitimate?</summary>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Yes, absolutely. Our installer is code-signed with a valid certificate, which means Windows will verify its authenticity. The file is scanned by multiple antivirus engines and distributed over secure HTTPS. You'll see our verified publisher name during installation. If Windows shows a warning, click "More info" and then "Run anyway" to see our verified signature.
                </p>
              </details>

              <details className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <summary className="font-semibold cursor-pointer text-slate-200 text-lg">Does it work offline?</summary>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Core automation features run completely offline. The app executes commands locally on your machine. However, for AI-powered natural language understanding, you'll need an internet connection (using your own API keys if preferred). All automation actions happen locally regardless of connectivity.
                </p>
              </details>
              
              <details className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <summary className="font-semibold cursor-pointer text-slate-200 text-lg">Can I disable voice features if I don't want to use the microphone?</summary>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Absolutely. Voice wake-word and dictation can be completely disabled in settings. All automation features work perfectly through text commands. The microphone is optional and only active when you explicitly enable voice features.
                </p>
              </details>
              
              <details className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <summary className="font-semibold cursor-pointer text-slate-200 text-lg">What happens to my data? Is anything sent to external servers?</summary>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Your commands, actions, and personal data stay on your computer. If you use AI features, you can provide your own API keys, so all AI requests go directly from your machine to your chosen provider. We only verify your license key when the app launches—no usage data or command history is transmitted.
                </p>
              </details>

              <details className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <summary className="font-semibold cursor-pointer text-slate-200 text-lg">Can I cancel my subscription anytime?</summary>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  Yes. Subscriptions are month-to-month with no long-term commitments. Cancel anytime from the link in your subscription confirmation email, or contact our support team. Your access continues until the end of your current billing period.
                </p>
              </details>

              <details className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <summary className="font-semibold cursor-pointer text-slate-200 text-lg">How does license verification work?</summary>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  When you launch the app, it securely validates your license key with our server over HTTPS. The key is tied to your account, and you can rotate or regenerate it anytime from your account dashboard. License checks only verify validity—they don't transmit any usage information.
                </p>
              </details>

              <details className="rounded-xl border border-white/5 bg-[#161b22] p-5">
                <summary className="font-semibold cursor-pointer text-slate-200 text-lg">What if I need help or have questions?</summary>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  We offer priority email support to all subscribers. Email us at <a href="mailto:support@yourdomain.com" className="text-blue-400 hover:underline">support@yourdomain.com</a> and we'll respond promptly. We're committed to helping you get the most out of Absolute Assistant.
                </p>
              </details>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0a0e1a] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <div className="text-center sm:text-left">
              <div className="font-semibold text-slate-300 mb-1">© {new Date().getFullYear()} Absolute Assistant</div>
              <p className="text-xs">Local AI desktop automation for Windows</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/terms" className="hover:text-slate-300 transition">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
              <a href="mailto:support@yourdomain.com" className="hover:text-slate-300 transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
