import { Link } from 'react-router-dom'
import { Target, Eye, Heart, MapPin, ArrowRight, Activity, Zap, ShieldCheck } from 'lucide-react'

const values = [
  { icon: <Target size={24} />, title: 'Precision Matching', desc: 'We believe every hire matters. We analyze node-to-node fit before making a connection.' },
  { icon: <Zap size={24} />, title: 'Startup Agility', desc: 'Fast-moving, data-informed decisions. We move at the speed of the companies we serve.' },
  { icon: <Heart size={24} />, title: 'People First', desc: 'We treat candidates as people, not profiles. Employers as partners, not just clients.' },
  { icon: <Activity size={24} />, title: 'Structured Process', desc: 'Our pipeline-driven architecture reduces time-to-hire and improves acceptance rates.' },
]

const reasons = [
  'Domain expertise in IT, retail, fintech, design, and operations',
  'Chennai-local knowledge — understanding of regional talent dynamics',
  'Structured pipeline from sourcing to placement in <21 days',
  'Direct access to 2,450+ pre-screened candidate profiles',
  'Dedicated recruitment success manager assigned per mandate',
  'Real-time transparent reporting at every pipeline stage',
]

export default function About() {
  return (
    <div className="animate-fade-in bg-surface dark:bg-dark-bg min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-charcoal py-24 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-hero-pattern pointer-events-none"></div>

        <div className="container-xl relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-cyan shadow-glow-cyan animate-pulse-slow"></span>
              Our Architecture
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Building Chennai's most <span className="text-brand-cyan">reliable</span> talent network.
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-medium">
              Firstdot Works started with a simple hypothesis: recruitment infrastructure should be faster, transparent, and distinctly human.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Bento Grid */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Established', value: '2024', color: 'text-brand-charcoal dark:text-white', bg: 'bg-white dark:bg-dark-surface' },
              { label: 'Successful Matches', value: '145+', color: 'text-brand-cyan', bg: 'bg-white dark:bg-dark-surface' },
              { label: 'Partner Companies', value: '38', color: 'text-brand-charcoal dark:text-white', bg: 'bg-white dark:bg-dark-surface' },
              { label: 'Avg. Time to Hire', value: '18 Days', color: 'text-brand-orange', bg: 'bg-white dark:bg-dark-surface' },
            ].map((s, i) => (
              <div key={i} className={`card ${s.bg} border border-gray-100 dark:border-gray-800 p-6 text-center shadow-lg hover:-translate-y-1 transition-transform duration-300`}>
                <div className={`text-3xl md:text-4xl font-display font-bold mb-2 ${s.color}`}>{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container-xl">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-cyan mb-4 text-center">System Overview</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal dark:text-white mb-10 text-center leading-tight">
              We combine structured recruitment architecture with a human-centric approach.
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                We work across vital sectors — IT, fintech, retail, design, and operations — serving organizations ranging from high-growth early-stage startups to established enterprises across Tamil Nadu.
              </div>
              <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                Our protocol is simple: maintain a high-fidelity talent database, assign specialized recruiters per mandate, and drive every search sequence to successful deployment.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision Split */}
      <section className="py-16 bg-white dark:bg-[#0B0F19] border-y border-gray-100 dark:border-gray-800">
        <div className="container-xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card border-0 bg-transparent p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 flex items-center justify-center mb-8">
                  <Target size={32} className="text-brand-cyan" />
                </div>
                <h3 className="text-3xl font-display font-bold text-brand-charcoal dark:text-white mb-6">Our Mission</h3>
                <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  To make high-fidelity hiring accessible and efficient for businesses of all sizes in India, starting with Chennai — by building the most robust talent network in the region.
                </p>
              </div>
            </div>
            
            <div className="card border-0 bg-transparent p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-8">
                  <Eye size={32} className="text-brand-orange" />
                </div>
                <h3 className="text-3xl font-display font-bold text-brand-charcoal dark:text-white mb-6">Our Vision</h3>
                <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  A network where every company discovers its ideal nodes, and every professional connects to work that elevates them — powered by structured and transparent systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container-xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-orange mb-3">Core Principles</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal dark:text-white">Our Operating Values</h3>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="card bg-white dark:bg-dark-surface p-8 group hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-800">
                <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-400 group-hover:text-brand-cyan group-hover:border-brand-cyan/30 transition-colors mb-6">
                  {v.icon}
                </div>
                <h4 className="text-xl font-display font-bold text-brand-charcoal dark:text-white mb-3">{v.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-gray-800">
        <div className="container-xl">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-sm font-bold uppercase tracking-widest text-brand-cyan mb-3">The Advantage</h2>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal dark:text-white">Why Firstdot Works?</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {reasons.map((r, i) => (
                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg hover:border-brand-cyan/30 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-brand-cyan/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck size={16} className="text-brand-cyan" />
                  </div>
                  <p className="text-base font-medium text-gray-700 dark:text-gray-300 leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-brand-charcoal relative overflow-hidden">
        {/* Abstract connection lines */}
        <div className="absolute inset-0 opacity-[0.05]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="0.5" />
            <line x1="0" y1="0" x2="100" y2="100" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="container-xl text-center relative z-10">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-8">
            <MapPin size={14} /> Headquartered in Chennai
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to initialize a connection?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Whether you're scaling a team or seeking your next node in the network, we're ready to deploy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary btn-lg shadow-glow-cyan text-base">
              Establish Contact <ArrowRight size={18} className="ml-1" />
            </Link>
            <Link to="/jobs" className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center text-base">
              Browse the Network
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
