import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Building2, BarChart2, Database, Users, Briefcase, MessageSquare, Zap, Activity } from 'lucide-react'

const features = [
  { icon: Briefcase, title: 'Instant Deployment', desc: 'Initialize detailed job postings and go live in minutes. Broadcast to our curated talent network immediately.', color: 'cyan' },
  { icon: Users, title: 'Pipeline Control', desc: 'All incoming nodes organized in a centralized command center. Filter, route, and manage your pipeline flawlessly.', color: 'charcoal' },
  { icon: Database, title: 'Network Access', desc: 'Direct access to bypass standard queues. Search our active database of 2,450+ verified professionals.', color: 'orange' },
  { icon: BarChart2, title: 'Telemetry & Analytics', desc: 'Monitor job performance, applicant velocity, and conversion metrics through real-time dashboards.', color: 'cyan' },
  { icon: MessageSquare, title: 'Dedicated Operative', desc: 'Every partner receives a dedicated Firstdot recruiter to handle sourcing, screening, and operations.', color: 'charcoal' },
  { icon: Building2, title: 'Brand Architecture', desc: 'Project your employer identity with a high-fidelity company profile visible across the network.', color: 'orange' },
]

const steps = [
  { step: '01', title: 'Initialize Profile', desc: 'Create your company workspace and get your employer access authenticated.' },
  { step: '02', title: 'Deploy Mandate', desc: 'Input role parameters — title, tech stack, compensation — and broadcast to the network.' },
  { step: '03', title: 'Process Nodes', desc: 'Applicants arrive in your command center. Filter and route with a single click.' },
  { step: '04', title: 'Execute Hire', desc: 'Schedule interviews, transmit offers, and monitor onboarding — fully integrated.' },
]

export default function Employers() {
  return (
    <div className="animate-fade-in bg-surface dark:bg-dark-bg min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-charcoal py-24 relative overflow-hidden">
        {/* Background Network Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-hero-pattern pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="container-xl relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-8">
              <Zap size={14} className="animate-pulse-slow" />
              Employer Solutions
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Scale your team. <br />
              <span className="text-gradient-cyan">Intelligently.</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-10 max-w-2xl font-medium">
              Firstdot Works provides your operations team with a high-performance architecture to broadcast mandates, query talent databases, and control the entire recruitment pipeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/login" className="btn-primary btn-lg shadow-glow-cyan text-base">
                Initialize Workspace <ArrowRight size={18} className="ml-1" />
              </Link>
              <Link to="/contact" className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center text-base">
                Request Briefing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 relative z-20">
        <div className="container-xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-cyan mb-3">System Capabilities</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal dark:text-white">Built for high-velocity hiring</h3>
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

      {/* Workflow Steps */}
      <section className="py-24 bg-white dark:bg-[#0B0F19] border-y border-gray-100 dark:border-gray-800 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="container-xl relative z-10">
          <div className="max-w-3xl mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-brand-charcoal dark:text-gray-400 mb-3">Deployment Sequence</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold text-brand-charcoal dark:text-white leading-tight">
              From mandate to deployment in <span className="text-brand-cyan">four phases</span>.
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative group">
                <div className="card h-full bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-8 hover:border-brand-cyan/30 transition-colors z-10 relative">
                  <div className="text-4xl font-display font-bold text-gray-200 dark:text-gray-800 mb-6 group-hover:text-brand-cyan/20 transition-colors">{s.step}</div>
                  <h4 className="text-xl font-display font-bold text-brand-charcoal dark:text-white mb-3">{s.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
                {/* Connecting Line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-200 dark:bg-gray-800 z-0 group-hover:bg-brand-cyan/30 transition-colors"></div>
                )}
              </div>
            ))}
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
            <Activity size={32} className="text-brand-cyan" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Ready to scale your architecture?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Join the 38+ forward-thinking organizations already utilizing the Firstdot network.</p>
          <Link to="/login" className="btn-primary btn-lg shadow-glow-cyan px-10 text-base">
            Access Command Center
          </Link>
        </div>
      </section>
    </div>
  )
}
