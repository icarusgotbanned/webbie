'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      <header className="border-b border-white/5 bg-[#0d1117]/80 backdrop-blur-sm sticky top-0 z-50 mb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-[112px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Absolute Assistant" 
              className="w-7 h-7 rounded object-contain"
            />
            <div className="font-bold text-sm sm:text-base">Absolute Assistant</div>
          </Link>
          <nav className="hidden sm:flex gap-6 text-sm">
            <Link href="/" className="text-blue-400 hover:text-blue-300 transition">Home</Link>
            <Link href="/reputation" className="text-slate-400 hover:text-slate-300 transition">Reputation</Link>
            <Link href="/local-app" className="text-slate-400 hover:text-slate-300 transition">Why Local App</Link>
            <Link href="/download" className="text-slate-400 hover:text-slate-300 transition">Download</Link>
            <a href="mailto:absoluteassistant42@gmail.com" className="text-slate-400 hover:text-slate-300 transition">Contact</a>
          </nav>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-slate-300 transition ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-slate-300 transition ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-slate-300 transition ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
        {mobileMenuOpen && (
          <nav className="sm:hidden border-t border-white/5 px-4 py-4 space-y-3">
            <Link href="/" className="block text-blue-400 hover:text-blue-300 transition py-2">Home</Link>
            <Link href="/reputation" className="block text-slate-400 hover:text-slate-300 transition py-2">Reputation</Link>
            <Link href="/local-app" className="block text-slate-400 hover:text-slate-300 transition py-2">Why Local App</Link>
            <Link href="/download" className="block text-slate-400 hover:text-slate-300 transition py-2">Download</Link>
            <a href="mailto:absoluteassistant42@gmail.com" className="block text-slate-400 hover:text-slate-300 transition py-2">Contact</a>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-8 sm:pb-12 space-y-16 sm:space-y-24">
          
          {/* Hero Section */}
          <section className="text-center space-y-8">
            <div className="space-y-6">
              <div className="px-4 pb-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent leading-[1.15]">
                  Stop Clicking, Start Commanding
                </h1>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4 pt-2">
                Automate your daily routine with a local AI assistant. Open apps, draft emails, fill forms—all with simple voice commands or text.
              </p>
            </div>

            {/* Primary CTAs */}
            <div className="pt-4 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/download"
                  className="px-8 py-4 rounded-xl bg-[#161b22] border border-white/10 text-white font-bold text-lg hover:bg-[#1f2937] hover:border-blue-500/30 transition shadow-lg"
                >
                  Download Free
                </Link>
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold text-lg hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-blue-500/20"
                >
                  {isLoading ? 'Processing...' : 'Purchase License Key — $15/month'}
                </button>
              </div>
              <p className="text-xs text-slate-500">Download is free • License key required to activate • Windows only</p>
            </div>

            {/* Quick Links */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto px-4 pt-8">
              <Link href="/reputation" className="bg-[#161b22] border border-white/5 rounded-xl p-5 hover:border-blue-500/30 transition text-center">
                <div className="font-bold text-base mb-1 text-slate-200">Reputation</div>
                <div className="text-xs text-slate-400">Reviews & testimonials</div>
              </Link>
              <Link href="/local-app" className="bg-[#161b22] border border-white/5 rounded-xl p-5 hover:border-blue-500/30 transition text-center">
                <div className="font-bold text-base mb-1 text-slate-200">Why Local App</div>
                <div className="text-xs text-slate-400">Privacy & speed</div>
              </Link>
              <Link href="/trust" className="bg-[#161b22] border border-white/5 rounded-xl p-5 hover:border-blue-500/30 transition text-center">
                <div className="font-bold text-base mb-1 text-slate-200">Trust & Safety</div>
                <div className="text-xs text-slate-400">Secure installation</div>
              </Link>
              <Link href="/download" className="bg-[#161b22] border border-white/5 rounded-xl p-5 hover:border-blue-500/30 transition text-center">
                <div className="font-bold text-base mb-1 text-slate-200">Download</div>
                <div className="text-xs text-slate-400">After purchase</div>
              </Link>
            </div>
          </section>

          {/* Killer Use Case */}
          <section className="bg-[#161b22] border border-white/5 rounded-2xl p-6 sm:p-10 space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-100">Your Daily Routine, Automated</h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Instead of manually opening apps and clicking through menus, tell Absolute Assistant what you need. It handles the rest—instantly, reliably, locally.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-[#0a0e1a] rounded-xl p-6 border border-white/5">
                <h3 className="font-bold text-slate-200 mb-4">Example Workflow</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className="text-emerald-400 mt-0.5">→</span>
                    <span>"Open Discord, check Steam downloads, and summarize my unread emails"</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-400 text-xs pl-6">
                    <span>✓</span>
                    <span>Discord opened, Steam checked (3 downloads), Email summary created</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0e1a] rounded-xl p-6 border border-white/5">
                <h3 className="font-bold text-slate-200 mb-4">Perfect For</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>Opening morning apps in one command</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>Drafting emails without typing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>Filling repetitive forms automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>Voice-controlled desktop automation</span>
                  </li>
                </ul>
              </div>
            </div>
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

          {/* Quick Links to Key Pages */}
          <section className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-100">Learn More</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/reputation" className="bg-[#161b22] border border-white/5 rounded-xl p-6 hover:border-blue-500/30 transition">
                <div className="font-bold text-lg mb-2 text-slate-200">See Reviews</div>
                <div className="text-sm text-slate-400">Read testimonials and see screenshots from real users</div>
              </Link>
              <Link href="/local-app" className="bg-[#161b22] border border-white/5 rounded-xl p-6 hover:border-blue-500/30 transition">
                <div className="font-bold text-lg mb-2 text-slate-200">Why Local App?</div>
                <div className="text-sm text-slate-400">Privacy, speed, and system access advantages</div>
              </Link>
              <Link href="/trust" className="bg-[#161b22] border border-white/5 rounded-xl p-6 hover:border-blue-500/30 transition">
                <div className="font-bold text-lg mb-2 text-slate-200">Installation Safety</div>
                <div className="text-sm text-slate-400">Code signing and security information</div>
              </Link>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-center text-slate-100">Purchase a License Key</h2>
            <p className="text-lg text-slate-300 text-center max-w-2xl mx-auto">
              The app is free to download. Purchase a license key to activate and unlock all features.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="rounded-2xl border border-white/5 bg-[#161b22] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative">
                  <div className="text-5xl font-black mb-2 text-slate-100">
                    $15<span className="text-xl font-semibold text-slate-400">/month</span>
                  </div>
                  <p className="text-sm text-slate-400 mb-6">License key activates full access. No hidden fees.</p>
                  
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
                    {isLoading ? 'Processing...' : 'Purchase License Key'}
                  </button>
                  
                  <div className="mt-4 space-y-2 text-xs text-slate-400 text-center">
                    <p>Cancel anytime from your account or email</p>
                    <p className="text-slate-500">App download is always free</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-center text-slate-100 mb-10">Frequently Asked Questions</h2>
            
            <details className="rounded-xl border border-white/5 bg-[#161b22] p-5">
              <summary className="font-semibold cursor-pointer text-slate-200 text-lg">Is the download really free? Do I need to purchase anything?</summary>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Yes, the download is completely free for everyone. Anyone can download and install Absolute Assistant at no cost. However, to activate the app and use its features, you'll need to purchase a license key. The license key is $15/month and unlocks full functionality.
              </p>
            </details>
            
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
                We offer priority email support to all subscribers. Email us at <a href="mailto:absoluteassistant42@gmail.com" className="text-blue-400 hover:underline">absoluteassistant42@gmail.com</a> and we'll respond promptly. We're committed to helping you get the most out of Absolute Assistant.
              </p>
            </details>
          </section>
        </div>
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
              <Link href="/terms" className="hover:text-slate-300 transition">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-slate-300 transition">Privacy Policy</Link>
              <a href="mailto:absoluteassistant42@gmail.com" className="hover:text-slate-300 transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
