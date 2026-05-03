import { Link } from 'react-router-dom'
import { ArrowRight, User, Bookmark, Bell, TrendingUp, Target, Shield, Compass, CheckCircle } from 'lucide-react'

const features = [
  { icon: User, title: 'Construct Profile', desc: 'Create a comprehensive digital identity. Highlight your stack, experience, and key projects.', color: 'orange' },
  { icon: Target, title: 'Precision Matching', desc: 'Upload your resume to our intelligence matrix. Get discovered by employers seeking your exact skill node.', color: 'cyan' },
  { icon: Compass, title: 'Network Navigation', desc: 'Query 124+ active mandates. Utilize advanced parameters for role, location, and operational mode.', color: 'charcoal' },
  { icon: Bookmark, title: 'Data Retention', desc: 'Cache interesting roles to your secure watchlist and initialize applications when conditions are optimal.', color: 'orange' },
  { icon: TrendingUp, title: 'Telemetry Tracking', desc: 'Monitor application status with high-fidelity tracking — from initial transmission to final selection.', color: 'cyan' },
  { icon: Bell, title: 'Real-time Alerts', desc: 'Receive immediate notifications when your application status shifts or new matching nodes are deployed.', color: 'charcoal' },
]

const stages = ['Profile Initialized', 'Data Uploaded', 'Transmission Sent', 'Screening', 'Shortlisted', 'Evaluation', 'Deployed 🎉']

export default function Candidates() {
  return (
    <div className="animate-fade-in bg-surface dark:bg-dark-bg min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-charcoal py-24 relative overflow-hidden">
        {/* Background Network Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-hero-pattern pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="container-xl relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-8">
              <Shield size={14} className="animate-pulse-slow" />
              Talent Portal
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Initialize your <br />
              <span className="text-brand-orange">next sequence.</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl font-medium">
              Firstdot Works integrates you into Chennai's premier talent network. Discover high-growth nodes, monitor your transmissions, and accelerate your trajectory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/jobs" className="btn-primary bg-brand-orange hover:bg-brand-orange-dark shadow-glow-orange border-transparent text-white btn-lg text-base">
                Query Network <ArrowRight size={18} className="ml-1" />
              </Link>
              <Link to="/login" className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center text-base">
                Authenticate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 relative z-20">
        <div className="container-xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-orange mb-3">System Utilities</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal dark:text-white">Equipped for rapid advancement</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="card bg-white dark:bg-dark-surface p-8 border border-gray-100 dark:border-gray-800 hover:-translate-y-1 hover:shadow-card-md transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                  f.color === 'cyan' ? 'bg-brand-cyan/10 text-brand-cyan group-hover:bg-brand-cyan group-hover:text-white' :
                  f.color === 'orange' ? 'bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white' :
                  'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 group-hover:bg-brand-charcoal dark:group-hover:bg-gray-100 group-hover:text-white dark:group-hover:text-brand-charcoal'
                }`}>
                  <f.icon size={24} />
                </div>
                <h3 className="text-xl font-display font-bold text-brand-charcoal dark:text-white mb-3">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trajectory Tracker UI */}
      <section className="py-24 bg-white dark:bg-[#0B0F19] border-y border-gray-100 dark:border-gray-800 relative overflow-hidden">
        <div className="container-xl relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-charcoal dark:text-gray-400 mb-3">Telemetry Sequence</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-brand-charcoal dark:text-white leading-tight">
              Monitor your trajectory from <br /><span className="text-brand-cyan">contact to deployment</span>.
            </h3>
          </div>
          
          <div className="card bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-8 md:p-12 overflow-x-auto">
            <div className="min-w-[800px] flex items-center justify-between relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0 rounded-full"></div>
              {/* Active Line */}
              <div className="absolute top-1/2 left-0 w-[85%] h-1 bg-gradient-to-r from-brand-cyan to-brand-orange -translate-y-1/2 z-0 rounded-full shadow-glow-cyan"></div>
              
              {stages.map((s, i) => {
                const isCompleted = i < stages.length - 1;
                const isCurrent = i === stages.length - 2;
                return (
                  <div key={i} className="relative z-10 flex flex-col items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-dark-surface transition-all duration-300 ${
                      isCompleted ? 'bg-brand-cyan text-white shadow-glow-cyan' : 
                      isCurrent ? 'bg-brand-orange text-white shadow-glow-orange scale-125' : 
                      'bg-gray-200 dark:bg-gray-700 text-transparent'
                    }`}>
                      {isCompleted ? <CheckCircle size={16} /> : <div className="w-3 h-3 rounded-full bg-white"></div>}
                    </div>
                    <div className={`text-xs font-bold uppercase tracking-wider text-center w-24 ${
                      isCompleted ? 'text-brand-charcoal dark:text-white' : 'text-gray-400'
                    }`}>
                      {s}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-brand-charcoal relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 L100,50 M50,0 L50,100" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="container-xl relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8">
            <User size={32} className="text-brand-orange" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Ready to initiate?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Construct your identity today and become discoverable to elite networks in Chennai.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="btn-primary bg-brand-orange hover:bg-brand-orange-dark shadow-glow-orange border-transparent text-white btn-lg px-10 text-base">
              Construct Profile
            </Link>
            <Link to="/jobs" className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center text-base">
              Browse Openings
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
