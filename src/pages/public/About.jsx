import { Link } from 'react-router-dom'
import { Target, Eye, Heart, MapPin, ArrowRight } from 'lucide-react'

const values = [
  { icon: '🎯', title: 'Precision Matching', desc: 'We believe every hire matters. We take time to understand both sides before making a match.' },
  { icon: '⚡', title: 'Startup Agility', desc: 'Fast-moving, data-informed decisions. We move at the speed of the companies we serve.' },
  { icon: '🤝', title: 'People First', desc: 'We treat candidates as people, not profiles. Employers as partners, not clients.' },
  { icon: '📊', title: 'Structured Process', desc: 'Our pipeline-driven approach reduces time-to-hire and improves offer acceptance rates.' },
]

const reasons = [
  'Domain expertise in IT, retail, fintech, design, and operations hiring',
  'Chennai-local knowledge — understanding of regional talent dynamics',
  'Structured pipeline from sourcing to placement in <21 days',
  'Direct access to 2,450+ pre-screened candidate profiles',
  'Dedicated recruiter assigned per mandate',
  'Transparent reporting at every stage',
]

export default function About() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-brand-charcoal py-20">
        <div className="container-xl">
          <div className="max-w-2xl">
            <p className="text-brand-cyan text-sm font-semibold mb-3 uppercase tracking-widest">About Us</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              We're building Chennai's most reliable recruitment platform.
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Firstdot Works started with a simple belief: recruitment should be faster, more transparent, and more human.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section bg-surface dark:bg-dark-bg">
        <div className="container-xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title mb-5">Who We Are</h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                Firstdot Works is a Chennai-based HR and recruitment startup founded to simplify the hiring experience for both employers and job seekers. We combine structured recruitment processes with a human-centric approach.
              </p>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                We work across verticals — IT, fintech, retail, design, and operations — and serve companies ranging from early-stage startups to established enterprises in Tamil Nadu.
              </p>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Our model is simple: maintain a quality-first talent database, assign dedicated recruiters per mandate, and drive every search to successful placement.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Founded', value: '2024', color: 'text-brand-cyan' },
                { label: 'Placements', value: '145+', color: 'text-brand-orange' },
                { label: 'Active Clients', value: '38', color: 'text-brand-cyan' },
                { label: 'Avg. Time to Hire', value: '18 days', color: 'text-brand-orange' },
              ].map((s, i) => (
                <div key={i} className="card text-center">
                  <div className={`text-3xl font-bold mb-1 ${s.color}`}>{s.value}</div>
                  <div className="text-sm text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section-sm bg-white dark:bg-dark-surface">
        <div className="container-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-brand-cyan/8 border border-brand-cyan/20 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Target size={22} className="text-brand-cyan" />
                <h3 className="text-xl font-bold text-brand-charcoal dark:text-white">Our Mission</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                To make quality hiring accessible and efficient for businesses of all sizes in India, starting with Chennai — by building the most reliable recruitment platform for the region.
              </p>
            </div>
            <div className="rounded-2xl bg-brand-orange/8 border border-brand-orange/20 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye size={22} className="text-brand-orange" />
                <h3 className="text-xl font-bold text-brand-charcoal dark:text-white">Our Vision</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                A world where every company finds its ideal team and every professional finds work that fulfills them — powered by structured, transparent, and human-first hiring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-surface dark:bg-dark-bg">
        <div className="container-xl">
          <div className="text-center mb-10">
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div key={i} className="card text-center">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h4 className="font-semibold text-brand-charcoal dark:text-white mb-2">{v.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-sm bg-white dark:bg-dark-surface">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="section-title">Why Firstdot Works?</h2>
            </div>
            <div className="space-y-3">
              {reasons.map((r, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-surface-border dark:border-dark-border bg-white dark:bg-dark-card">
                  <div className="w-6 h-6 rounded-full bg-brand-cyan/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-cyan text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-charcoal text-center">
        <div className="container-xl">
          <div className="flex items-center justify-center gap-2 text-brand-cyan text-sm mb-3">
            <MapPin size={16} /> Chennai, Tamil Nadu
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Let's work together</h2>
          <p className="text-gray-400 mb-7">Whether you're hiring or looking for your next role, we're here to help.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="btn-primary btn-lg">Get in Touch <ArrowRight size={18} /></Link>
            <Link to="/jobs" className="px-7 py-3.5 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
