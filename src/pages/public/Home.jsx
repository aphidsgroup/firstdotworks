import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, Users, Building2, TrendingUp, CheckCircle, Star } from 'lucide-react'

// Animated SVG node-dot constellation motif - Premium Version
function NodeMotif() {
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center pointer-events-none" aria-hidden>
      <svg className="w-full h-full max-w-[600px] text-brand-cyan opacity-80" viewBox="0 0 600 500" fill="none">
        {/* Glow Definitions */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Lines */}
        <g stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" className="animate-fade-in">
          <line x1="480" y1="80" x2="360" y2="150" />
          <line x1="360" y1="150" x2="420" y2="200" />
          <line x1="420" y1="200" x2="300" y2="260" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="300" y1="260" x2="200" y2="180" />
          <line x1="200" y1="180" x2="150" y2="300" strokeWidth="1.5" strokeOpacity="0.4" />
          <line x1="150" y1="300" x2="250" y2="370" />
          <line x1="250" y1="370" x2="380" y2="340" />
          <line x1="380" y1="340" x2="300" y2="260" />
          <line x1="300" y1="260" x2="480" y2="380" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="4 4" />
          <line x1="200" y1="180" x2="250" y2="80" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="4 4" />
        </g>

        {/* Nodes */}
        <g fill="currentColor">
          <circle cx="480" cy="80" r="4" className="animate-pulse-slow" filter="url(#glow)" />
          <circle cx="360" cy="150" r="2.5" fill="#F7941D" />
          <circle cx="420" cy="200" r="3.5" />
          
          {/* Main Hub Node */}
          <g transform="translate(300, 260)">
            <circle r="12" fill="#111827" stroke="currentColor" strokeWidth="2" className="dark:fill-white dark:stroke-brand-charcoal" />
            <circle r="4" fill="currentColor" className="animate-pulse-slow" filter="url(#glow)" />
          </g>

          <circle cx="200" cy="180" r="3" fill="#F7941D" />
          <circle cx="150" cy="300" r="5" className="animate-pulse-slow" filter="url(#glow)" />
          <circle cx="250" cy="370" r="2.5" fill="#F7941D" />
          <circle cx="380" cy="340" r="4.5" />
          <circle cx="480" cy="380" r="2" opacity="0.5" />
          <circle cx="250" cy="80" r="2" opacity="0.5" />
        </g>
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
      {/* HERO SECTION - Asymmetrical Split */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden bg-white dark:bg-dark-bg">
        <div className="absolute inset-0 bg-hero-pattern pointer-events-none" />
        
        <div className="container-xl relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography Lockup */}
            <div className="max-w-2xl animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-brand-charcoal dark:text-gray-200 text-xs font-bold uppercase tracking-wider mb-8">
                <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse-slow shadow-glow-cyan"></span>
                Next-Gen Recruitment
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-brand-charcoal dark:text-white leading-[1.1] mb-8">
                Connecting the{' '}
                <span className="text-gradient-cyan block mt-2">right talent</span>
                with opportunity.
              </h1>
              
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-xl font-medium">
                We are a Chennai-based tech-forward HR firm building the networks that power modern startups and enterprises.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/jobs" id="hero-explore-jobs" className="btn-primary btn-lg shadow-card-lg">
                  Explore Openings <ArrowRight size={18} className="ml-1" />
                </Link>
                <Link to="/employers" id="hero-hire-talent" className="btn-outline btn-lg">
                  Hire Top Talent
                </Link>
              </div>
            </div>

            {/* Right Column: Abstract Node Map */}
            <div className="hidden lg:flex items-center justify-center relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/5 to-transparent rounded-full blur-3xl"></div>
              <NodeMotif />
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP - Minimalist Command Center style */}
      <section className="bg-brand-charcoal dark:bg-[#0B0F19] py-16 border-y border-white/10 relative overflow-hidden">
        {/* Subtle decorative line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent"></div>
        
        <div className="container-xl relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/10">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center text-center px-4">
                <s.icon size={28} className={`${s.color} mb-4 opacity-80`} />
                <div className="text-4xl font-display font-bold text-white mb-2 tracking-tight">{s.value}</div>
                <div className="text-sm font-semibold uppercase tracking-widest text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW - Bento Grid Style */}
      <section className="py-24 bg-surface dark:bg-dark-surface">
        <div className="container-xl">
          <div className="max-w-3xl mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-cyan mb-3">Our Expertise</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-brand-charcoal dark:text-white leading-tight">
              Smarter hiring architecture for modern teams.
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="card group hover:bg-brand-charcoal hover:border-brand-charcoal dark:hover:bg-dark-bg transition-all duration-300">
                <div className="text-4xl mb-6 opacity-80 group-hover:opacity-100 transition-opacity">{s.icon}</div>
                <h4 className="text-xl font-display font-bold text-brand-charcoal dark:text-white mb-3 group-hover:text-white transition-colors">
                  {s.title}
                </h4>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMPLOYER / CANDIDATE SPLIT */}
      <section className="py-24 bg-white dark:bg-dark-bg">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Employers Card */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-10 md:p-14 group hover:border-brand-cyan/30 transition-colors duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Building2 size={120} className="text-brand-cyan" />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
                  <Building2 size={24} className="text-brand-cyan" />
                </div>
                <h3 className="text-3xl font-display font-bold text-brand-charcoal dark:text-white mb-4">For Employers</h3>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
                  Build your dream team faster. Access our curated talent pool and streamlined hiring pipeline.
                </p>
                <ul className="space-y-4 mb-10">
                  {['Post jobs & manage applicants', 'Search verified resumes', 'Dedicated recruitment success manager'].map(f => (
                    <li key={f} className="flex items-start gap-3 text-base text-gray-700 dark:text-gray-300 font-medium">
                      <CheckCircle size={20} className="text-brand-cyan flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/employers" className="btn-outline">Access Portal</Link>
              </div>
            </div>

            {/* Candidates Card */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-10 md:p-14 group hover:border-brand-orange/30 transition-colors duration-500">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users size={120} className="text-brand-orange" />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-dark-bg border border-gray-200 dark:border-gray-700 shadow-sm mb-8">
                  <Users size={24} className="text-brand-orange" />
                </div>
                <h3 className="text-3xl font-display font-bold text-brand-charcoal dark:text-white mb-4">For Candidates</h3>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
                  Your next career breakthrough awaits. Discover roles that match your ambition.
                </p>
                <ul className="space-y-4 mb-10">
                  {['One-click job applications', 'Track your application status', 'Personalized job recommendations'].map(f => (
                    <li key={f} className="flex items-start gap-3 text-base text-gray-700 dark:text-gray-300 font-medium">
                      <CheckCircle size={20} className="text-brand-orange flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/candidates" className="btn-primary bg-brand-orange hover:bg-brand-orange-dark shadow-none hover:shadow-card-md border-transparent hover:border-transparent text-white ring-brand-orange/40">Access Portal</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-brand-charcoal relative overflow-hidden">
        {/* Background Network */}
        <div className="absolute inset-0 opacity-[0.03]">
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.5" />
             <path d="M0,30 Q50,80 100,30" fill="none" stroke="white" strokeWidth="0.5" />
           </svg>
        </div>

        <div className="container-xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to initialize your next move?
          </h2>
          <p className="text-gray-400 mb-10 text-lg md:text-xl max-w-2xl mx-auto">
            Join the network of top-tier talent and forward-thinking companies building the future in Chennai.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="btn-primary btn-lg shadow-glow-cyan text-base">
              Create Free Account
            </Link>
            <Link to="/jobs" className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2 text-base">
              Browse Openings <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
