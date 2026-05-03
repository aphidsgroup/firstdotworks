import { useState } from 'react'
import { MapPin, Mail, Phone, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="animate-fade-in bg-surface dark:bg-dark-bg min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-charcoal py-24 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-hero-pattern pointer-events-none"></div>

        <div className="container-xl relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse-slow"></span>
              Establish Connection
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Get in touch with <br />our <span className="text-brand-orange">network</span>.
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-medium">
              Whether you're scaling a team or seeking your next node in the talent network, we're ready to deploy.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 relative z-20 -mt-10">
        <div className="container-xl">
          <div className="grid xl:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Contact Info (Left Sidebar) */}
            <div className="xl:col-span-2 space-y-6">
              
              <div className="card bg-white dark:bg-dark-surface p-8 border border-gray-100 dark:border-gray-800 hover:border-brand-cyan/30 transition-colors group">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-cyan/20 transition-colors">
                    <MapPin size={24} className="text-brand-cyan" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-bold text-brand-charcoal dark:text-white mb-2">Headquarters</h4>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                      Firstdot Works<br />
                      No. 12, 3rd Floor, Mount Road<br />
                      Nandanam, Chennai – 600035<br />
                      Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="card bg-white dark:bg-dark-surface p-8 border border-gray-100 dark:border-gray-800 hover:border-brand-orange/30 transition-colors group">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange/20 transition-colors">
                    <Mail size={24} className="text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-bold text-brand-charcoal dark:text-white mb-2">Email Channels</h4>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">hello@firstdotworks.com</p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">hr@firstdotworks.com</p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 xl:grid-cols-1">
                <div className="card bg-white dark:bg-dark-surface p-8 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors group">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                      <Phone size={24} className="text-gray-600 dark:text-gray-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-bold text-brand-charcoal dark:text-white mb-2">Voice</h4>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">+91 44 1234 5678</p>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">+91 98765 43210</p>
                    </div>
                  </div>
                </div>

                <div className="card bg-white dark:bg-dark-surface p-8 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition-colors group">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                      <Clock size={24} className="text-gray-600 dark:text-gray-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-display font-bold text-brand-charcoal dark:text-white mb-2">Operations</h4>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Mon – Fri: 9:00 AM – 6:00 PM</p>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sat: 10:00 AM – 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form (Right Panel) */}
            <div className="xl:col-span-3">
              <div className="card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-8 md:p-12 h-full">
                {sent ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-fade-in">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-brand-charcoal dark:text-white mb-4">Transmission Successful</h3>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
                      Your message has been routed to our team. We'll deploy a response within 24 hours.
                    </p>
                    <button onClick={() => setSent(false)} className="btn-outline">Initialize New Message</button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                        <MessageSquare size={24} className="text-gray-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-display font-bold text-brand-charcoal dark:text-white">Direct Message</h2>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Secure channel to our operations team.</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                          <input required type="text" placeholder="John Doe" className="w-full px-4 py-3.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-cyan/30 focus:border-brand-cyan outline-none transition-all text-sm" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                          <input required type="email" placeholder="john@company.com" className="w-full px-4 py-3.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-cyan/30 focus:border-brand-cyan outline-none transition-all text-sm" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Phone (Optional)</label>
                          <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-cyan/30 focus:border-brand-cyan outline-none transition-all text-sm" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Topic</label>
                          <select required className="w-full px-4 py-3.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-cyan/30 focus:border-brand-cyan outline-none transition-all text-sm appearance-none" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}>
                            <option value="" disabled>Select subject...</option>
                            <option>Employer / Hiring Enquiry</option>
                            <option>Job Seeker Support</option>
                            <option>Partnership</option>
                            <option>General Enquiry</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Message</label>
                        <textarea required rows={5} placeholder="How can we assist you today?" className="w-full px-4 py-3.5 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-cyan/30 focus:border-brand-cyan outline-none transition-all text-sm resize-none" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                      </div>
                      
                      <div className="pt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800/50">
                        <p className="text-xs text-gray-400 font-medium">By submitting, you agree to our terms.</p>
                        <button type="submit" className="btn-primary shadow-glow-cyan px-8 py-3.5 text-base">
                          <Send size={18} className="mr-2" /> Send Message
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
