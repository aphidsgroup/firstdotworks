import { useState } from 'react'
import { MapPin, Mail, Phone, Clock, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="animate-fade-in">
      <section className="bg-brand-charcoal py-20">
        <div className="container-xl">
          <p className="text-brand-cyan text-sm font-semibold mb-3 uppercase tracking-widest">Contact Us</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in touch with our team</h1>
          <p className="text-gray-400 text-lg">We're here to help — whether you're hiring or looking for your next role.</p>
        </div>
      </section>

      <section className="section bg-surface dark:bg-dark-bg">
        <div className="container-xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact info */}
            <div className="space-y-5">
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-brand-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-charcoal dark:text-white mb-1">Office Address</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      Firstdot Works<br />
                      No. 12, 3rd Floor, Mount Road<br />
                      Nandanam, Chennai – 600035<br />
                      Tamil Nadu, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-brand-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-charcoal dark:text-white mb-1">Email</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">hello@firstdotworks.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">hr@firstdotworks.com</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-brand-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-charcoal dark:text-white mb-1">Phone</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">+91 44 1234 5678</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">+91 98765 43210</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-charcoal dark:text-white mb-1">Business Hours</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Monday – Friday: 9:00 AM – 6:00 PM</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Saturday: 10:00 AM – 2:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden border border-surface-border dark:border-dark-border h-40 bg-gray-100 dark:bg-dark-surface flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <MapPin size={24} className="mx-auto mb-2" />
                  <p className="text-xs">Chennai, Tamil Nadu</p>
                  <p className="text-xs text-gray-300">Map integration coming soon</p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="card">
                {sent ? (
                  <div className="text-center py-12">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-brand-charcoal dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSent(false)} className="btn-outline btn-sm">Send Another</button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-brand-charcoal dark:text-white mb-6">Send us a message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="label">Full Name *</label>
                          <input required type="text" placeholder="Your name" className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                        </div>
                        <div>
                          <label className="label">Email *</label>
                          <input required type="email" placeholder="your@email.com" className="input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                        </div>
                        <div>
                          <label className="label">Phone</label>
                          <input type="tel" placeholder="+91 XXXXX XXXXX" className="input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                        </div>
                        <div>
                          <label className="label">Subject *</label>
                          <select required className="select" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}>
                            <option value="">Select topic</option>
                            <option>Employer / Hiring Enquiry</option>
                            <option>Job Seeker Support</option>
                            <option>Partnership</option>
                            <option>General Enquiry</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="label">Message *</label>
                        <textarea required rows={5} placeholder="Tell us how we can help..." className="input resize-none" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                      </div>
                      <button type="submit" className="btn-primary">
                        <Send size={16} /> Send Message
                      </button>
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
