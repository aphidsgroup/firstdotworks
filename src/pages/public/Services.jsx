import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const services = [
  { icon: '🎯', title: 'Talent Acquisition', desc: 'End-to-end recruitment support from sourcing to onboarding. We identify, screen, and present the best candidates for your open roles.', features: ['Role requirement analysis', 'Multi-channel sourcing', 'Initial screening & shortlisting', 'Interview coordination'] },
  { icon: '🔍', title: 'Candidate Sourcing', desc: 'Active and passive sourcing across job boards, LinkedIn, referral networks, and our proprietary talent database.', features: ['Boolean search strategies', 'Social recruiting', 'Campus & alumni networks', 'Niche community targeting'] },
  { icon: '📋', title: 'Resume Screening', desc: 'Structured evaluation of resumes against job requirements with skill-matching and experience validation.', features: ['JD-based scoring', 'Skill gap analysis', 'ATS-compatible shortlists', 'Candidate ranking reports'] },
  { icon: '🏢', title: 'Employer Hiring Support', desc: 'Dedicated recruiter assigned per mandate to support your hiring team through the full cycle.', features: ['Dedicated point of contact', 'Weekly progress reports', 'Interview panel coordination', 'Offer negotiation support'] },
  { icon: '💼', title: 'Job Posting Management', desc: 'Professional job description writing, multi-platform posting, and application tracking.', features: ['JD drafting & optimization', 'Multi-platform publishing', 'Application consolidation', 'Response analytics'] },
  { icon: '🗄️', title: 'Talent Database Access', desc: 'Employers get curated access to our pre-screened candidate pool searchable by skill, experience, and location.', features: ['Searchable resume bank', 'Skill & location filters', 'Experience-based ranking', 'Candidate profile previews'] },
  { icon: '🤝', title: 'Placement Coordination', desc: 'We manage the end-to-end joining process — offer letters, background checks, and onboarding handover.', features: ['Offer letter drafting', 'Reference checks', 'Joining date coordination', 'Onboarding handover'] },
  { icon: '📊', title: 'HR Consulting', desc: 'Strategic HR advisory for startups and scaling businesses covering org design, HR policies, and people strategy.', features: ['Org structure planning', 'HR policy design', 'Compensation benchmarking', 'People ops advisory'] },
]

export default function Services() {
  return (
    <div className="animate-fade-in">
      <section className="bg-brand-charcoal py-20">
        <div className="container-xl">
          <p className="text-brand-cyan text-sm font-semibold mb-3 uppercase tracking-widest">Our Services</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Everything you need to hire smarter.</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            From sourcing to screening and placement to consulting — we offer a full suite of recruitment and HR services designed for modern businesses.
          </p>
        </div>
      </section>

      <section className="section bg-surface dark:bg-dark-bg">
        <div className="container-xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <div key={i} className="card-hover">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 mt-1">{s.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-brand-charcoal dark:text-white mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{s.desc}</p>
                    <ul className="grid grid-cols-2 gap-1.5">
                      {s.features.map(f => (
                        <li key={f} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan flex-shrink-0"></span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white dark:bg-dark-surface">
        <div className="container-xl text-center">
          <h2 className="text-2xl font-bold text-brand-charcoal dark:text-white mb-3">Ready to get started?</h2>
          <p className="text-gray-500 mb-7">Contact our team to discuss your recruitment or career requirements.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="btn-primary">Contact Us <ArrowRight size={16} /></Link>
            <Link to="/login" className="btn-outline">Access Portal</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
