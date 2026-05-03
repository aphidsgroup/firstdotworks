import { Link } from 'react-router-dom'
import { ArrowRight, Target, Search, FileCheck, Building2, Briefcase, Database, Users, LineChart } from 'lucide-react'

const services = [
  { icon: <Target size={24} />, title: 'Talent Acquisition', desc: 'End-to-end recruitment support from sourcing to onboarding. We identify, screen, and present the best candidates for your open roles.', features: ['Role requirement analysis', 'Multi-channel sourcing', 'Initial screening & shortlisting', 'Interview coordination'], color: 'cyan' },
  { icon: <Search size={24} />, title: 'Candidate Sourcing', desc: 'Active and passive sourcing across job boards, LinkedIn, referral networks, and our proprietary talent database.', features: ['Boolean search strategies', 'Social recruiting', 'Campus & alumni networks', 'Niche community targeting'], color: 'orange' },
  { icon: <FileCheck size={24} />, title: 'Resume Screening', desc: 'Structured evaluation of resumes against job requirements with skill-matching and experience validation.', features: ['JD-based scoring', 'Skill gap analysis', 'ATS-compatible shortlists', 'Candidate ranking reports'], color: 'charcoal' },
  { icon: <Building2 size={24} />, title: 'Employer Support', desc: 'Dedicated recruiter assigned per mandate to support your hiring team through the full recruitment lifecycle.', features: ['Dedicated point of contact', 'Weekly progress reports', 'Interview panel coordination', 'Offer negotiation support'], color: 'cyan' },
  { icon: <Briefcase size={24} />, title: 'Job Posting Management', desc: 'Professional job description writing, multi-platform posting, and application tracking consolidation.', features: ['JD drafting & optimization', 'Multi-platform publishing', 'Application consolidation', 'Response analytics'], color: 'orange' },
  { icon: <Database size={24} />, title: 'Talent Database Access', desc: 'Employers get curated access to our pre-screened candidate pool searchable by skill, experience, and location.', features: ['Searchable resume bank', 'Skill & location filters', 'Experience-based ranking', 'Candidate profile previews'], color: 'cyan' },
  { icon: <Users size={24} />, title: 'Placement Coordination', desc: 'We manage the end-to-end joining process — offer letters, background checks, and onboarding handover.', features: ['Offer letter drafting', 'Reference checks', 'Joining date coordination', 'Onboarding handover'], color: 'charcoal' },
  { icon: <LineChart size={24} />, title: 'HR Consulting', desc: 'Strategic HR advisory for startups and scaling businesses covering org design, HR policies, and people strategy.', features: ['Org structure planning', 'HR policy design', 'Compensation benchmarking', 'People ops advisory'], color: 'orange' },
]

export default function Services() {
  return (
    <div className="animate-fade-in bg-surface dark:bg-dark-bg min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-charcoal py-24 relative overflow-hidden">
        {/* Subtle Network Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 L100,0 M0,80 L100,-20 M0,120 L100,20" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="absolute -left-[10%] top-[20%] w-[40%] h-[60%] rounded-full bg-brand-cyan/10 blur-[100px] pointer-events-none" />

        <div className="container-xl relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-cyan shadow-glow-cyan animate-pulse-slow"></span>
              Our Capabilities
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Architecture for <br />
              <span className="text-brand-cyan">smarter hiring</span>.
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-medium">
              From precision sourcing to strategic consulting — we offer a full suite of recruitment services designed to scale modern teams.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative z-20 -mt-10">
        <div className="container-xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <div key={i} className="card bg-white dark:bg-dark-surface p-8 md:p-10 border border-gray-100 dark:border-gray-800 hover:border-brand-cyan/30 transition-all duration-500 group hover:shadow-card-md relative overflow-hidden">
                {/* Glow effect on hover */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${s.color === 'cyan' ? 'from-brand-cyan/5' : s.color === 'orange' ? 'from-brand-orange/5' : 'from-gray-500/5'} to-transparent rounded-bl-full pointer-events-none transition-transform duration-700 group-hover:scale-125`} />
                
                <div className="relative z-10 flex flex-col md:flex-row gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    s.color === 'cyan' ? 'bg-brand-cyan/10 text-brand-cyan' : 
                    s.color === 'orange' ? 'bg-brand-orange/10 text-brand-orange' : 
                    'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                  }`}>
                    {s.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-display font-bold text-brand-charcoal dark:text-white mb-3 group-hover:text-brand-cyan transition-colors">{s.title}</h3>
                    <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{s.desc}</p>
                    
                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800/50">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {s.features.map(f => (
                          <li key={f} className="flex items-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                              s.color === 'cyan' ? 'bg-brand-cyan' : 
                              s.color === 'orange' ? 'bg-brand-orange' : 
                              'bg-gray-400'
                            }`}></span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white dark:bg-[#0B0F19] border-t border-gray-100 dark:border-gray-800">
        <div className="container-xl">
          <div className="max-w-4xl mx-auto text-center card bg-gray-50 dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-12 md:p-16 rounded-[2rem]">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-charcoal dark:text-white mb-4">
              Ready to deploy your next hiring initiative?
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Partner with Firstdot Works to streamline your talent acquisition and build high-performance teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary shadow-glow-cyan text-base px-8 py-3.5">
                Establish Contact <ArrowRight size={18} className="ml-1" />
              </Link>
              <Link to="/employers" className="btn-outline text-base px-8 py-3.5 bg-white dark:bg-dark-bg">
                Employer Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
