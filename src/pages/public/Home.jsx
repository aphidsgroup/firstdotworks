import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, Users, Building2, TrendingUp, CheckCircle, Star } from 'lucide-react'

// Animated SVG node-dot constellation motif
function NodeMotif() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg className="absolute right-0 top-0 w-[600px] h-[500px] opacity-10 dark:opacity-5" viewBox="0 0 600 500" fill="none">
        <circle cx="480" cy="80" r="8" fill="#29ABE2" className="animate-pulse-dot" />
        <circle cx="360" cy="150" r="6" fill="#F7941D" />
        <circle cx="420" cy="200" r="8" fill="#29ABE2" />
        <circle cx="300" cy="260" r="10" fill="#2C2C2C" stroke="#29ABE2" strokeWidth="2" />
        <circle cx="200" cy="180" r="6" fill="#F7941D" />
        <circle cx="150" cy="300" r="8" fill="#29ABE2" />
        <circle cx="250" cy="370" r="6" fill="#F7941D" />
        <circle cx="380" cy="340" r="8" fill="#29ABE2" />
        <line x1="480" y1="80" x2="360" y2="150" stroke="#2C2C2C" strokeWidth="2" strokeDasharray="6 4" />
        <line x1="360" y1="150" x2="420" y2="200" stroke="#2C2C2C" strokeWidth="2" strokeDasharray="6 4" />
        <line x1="420" y1="200" x2="300" y2="260" stroke="#2C2C2C" strokeWidth="2" />
        <line x1="300" y1="260" x2="200" y2="180" stroke="#2C2C2C" strokeWidth="2" />
        <line x1="200" y1="180" x2="150" y2="300" stroke="#2C2C2C" strokeWidth="2" />
        <line x1="150" y1="300" x2="250" y2="370" stroke="#2C2C2C" strokeWidth="2" strokeDasharray="6 4" />
        <line x1="250" y1="370" x2="380" y2="340" stroke="#2C2C2C" strokeWidth="2" strokeDasharray="6 4" />
        <line x1="380" y1="340" x2="300" y2="260" stroke="#2C2C2C" strokeWidth="2" />
      </svg>
    </div>
  )
}

const stats = [
  { icon: Briefcase, value: '124+', label: 'Active Jobs', color: 'text-brand-cyan' },
  { icon: Users, value: '2,450+', label: 'Candidates', color: 'text-brand-orange' },
  { icon: Building2, value: '38', label: 'Hiring Companies', color: 'text-brand-cyan' },
  { icon: TrendingUp, value: '89%', label: 'Placement Rate', color: 'text-brand-orange' },
]

const services = [
  { title: 'Talent Acquisition', desc: 'End-to-end recruitment support from sourcing to onboarding.', icon: '🎯' },
  { title: 'Resume Screening', desc: 'AI-assisted resume filtering and structured shortlisting.', icon: '📋' },
  { title: 'Employer Hiring Support', desc: 'Dedicated recruiter for client companies with active mandates.', icon: '🏢' },
  { title: 'Career Guidance', desc: 'Job readiness coaching and career path advisory for candidates.', icon: '🚀' },
  { title: 'HR Consulting', desc: 'Strategic HR advisory for startups and growing businesses.', icon: '💼' },
  { title: 'Placement Coordination', desc: 'Interview scheduling, offer management, and joining support.', icon: '🤝' },
]

const testimonials = [
  { name: 'Ramesh Iyer', role: 'HR Manager, TechCorp Solutions', text: 'Firstdot Works helped us hire 12 engineers in under 6 weeks. The quality of candidates was outstanding.' },
  { name: 'Preethi Rajan', role: 'Candidate — placed at Nexus Retail', text: 'From application to offer in 18 days. The team was supportive throughout the entire process.' },
]

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="relative bg-hero-pattern py-20 md:py-32 overflow-hidden">
        <NodeMotif />
        <div className="container-xl relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 text-brand-cyan text-sm font-semibold mb-6 border border-brand-cyan/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse-dot"></span>
              Chennai's Recruitment Partner
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-charcoal dark:text-white leading-tight mb-6">
              Connecting the{' '}
              <span className="text-gradient-cyan">right talent</span>
              {' '}with the right opportunity.
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-2xl">
              Firstdot Works is a Chennai-based HR and recruitment startup helping employers hire faster
              and candidates discover better career opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/jobs" id="hero-explore-jobs" className="btn-primary btn-lg">
                Explore Jobs <ArrowRight size={18} />
              </Link>
              <Link to="/employers" id="hero-hire-talent" className="btn-outline btn-lg">
                Hire Talent
              </Link>
              <Link to="/login" id="hero-login" className="btn-ghost btn-lg border border-surface-border dark:border-dark-border">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-brand-charcoal py-12">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <s.icon size={24} className={s.color} />
                <div className="text-3xl font-bold text-white">{s.value}</div>
                <div className="text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section bg-surface dark:bg-dark-bg">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="section-title">How We Help</h2>
            <p className="section-subtitle mx-auto text-center">
              From sourcing to screening, Firstdot Works supports faster and smarter hiring.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={i} className="card-hover group">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="text-base font-semibold text-brand-charcoal dark:text-white mb-1.5 group-hover:text-brand-cyan transition-colors">{s.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="btn-outline">View All Services <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* EMPLOYER / CANDIDATE SPLIT */}
      <section className="section-sm bg-white dark:bg-dark-surface">
        <div className="container-xl">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Employers */}
            <div className="rounded-2xl border border-brand-cyan/30 bg-brand-cyan/5 p-8">
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/15 flex items-center justify-center mb-4">
                <Building2 size={24} className="text-brand-cyan" />
              </div>
              <h3 className="text-2xl font-bold text-brand-charcoal dark:text-white mb-3">For Employers</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                Post jobs, search our talent database, and manage your entire hiring pipeline in one place.
              </p>
              <ul className="space-y-2 mb-6">
                {['Post jobs in minutes', 'Access 2,450+ candidate profiles', 'Track applicant pipeline', 'Dedicated recruiter support'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle size={15} className="text-brand-cyan flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/employers" className="btn-primary btn-sm">Explore Employer Portal <ArrowRight size={15} /></Link>
            </div>

            {/* Candidates */}
            <div className="rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-8">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/15 flex items-center justify-center mb-4">
                <Users size={24} className="text-brand-orange" />
              </div>
              <h3 className="text-2xl font-bold text-brand-charcoal dark:text-white mb-3">For Candidates</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                Discover opportunities, apply to top companies, and track your applications — all in one dashboard.
              </p>
              <ul className="space-y-2 mb-6">
                {['Browse 124+ active openings', 'Upload resume & create profile', 'Track application status', 'Get job match alerts'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <CheckCircle size={15} className="text-brand-orange flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/candidates" className="btn-orange btn-sm">Explore Candidate Portal <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-surface dark:bg-dark-bg">
        <div className="container-xl">
          <div className="text-center mb-10">
            <h2 className="section-title">What People Say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="card">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#F7941D" stroke="none" />)}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold text-brand-charcoal dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 bg-brand-charcoal">
        <div className="container-xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to make your next career move?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">Join thousands of professionals who found their next role through Firstdot Works.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/jobs" className="btn-primary btn-lg">Browse All Jobs</Link>
            <Link to="/login" className="px-7 py-3.5 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2">
              Create Account <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
