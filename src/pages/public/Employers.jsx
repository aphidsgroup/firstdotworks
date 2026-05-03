import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Building2, BarChart2, Database, Users, Briefcase, MessageSquare } from 'lucide-react'

const features = [
  { icon: Briefcase, title: 'Post Jobs Instantly', desc: 'Create detailed job postings and go live in minutes. Reach thousands of pre-screened candidates.' },
  { icon: Users, title: 'Review Applicants', desc: 'All applications organized in one place. Filter, shortlist, and manage your hiring pipeline easily.' },
  { icon: Database, title: 'Search Resume Database', desc: 'Directly browse and filter our talent pool of 2,450+ candidates by skill, experience, and location.' },
  { icon: BarChart2, title: 'Hiring Analytics', desc: 'Track job performance, application velocity, and pipeline metrics with real-time dashboards.' },
  { icon: MessageSquare, title: 'Recruiter Support', desc: 'Every client gets a dedicated Firstdot recruiter to handle sourcing, screening, and coordination.' },
  { icon: Building2, title: 'Company Branding', desc: 'Showcase your employer brand with a complete company profile visible to all candidates.' },
]

const steps = [
  { step: '01', title: 'Register your company', desc: 'Create a company profile and get your employer access approved.' },
  { step: '02', title: 'Post your requirements', desc: 'Fill out the job form — title, skills, salary, work mode — and publish.' },
  { step: '03', title: 'Review applications', desc: 'Applicants arrive in your dashboard. Filter and shortlist with one click.' },
  { step: '04', title: 'Close the hire', desc: 'Schedule interviews, make offers, and track joining — all from your dashboard.' },
]

export default function Employers() {
  return (
    <div className="animate-fade-in">
      <section className="bg-brand-charcoal py-20">
        <div className="container-xl">
          <div className="max-w-2xl">
            <p className="text-brand-orange text-sm font-semibold mb-3 uppercase tracking-widest">For Employers</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Hire the right people. <span className="text-brand-cyan">Faster.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Firstdot Works gives your hiring team a structured, efficient platform to post jobs, search resumes, and manage your entire recruitment pipeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/login" className="btn-orange btn-lg">Access Employer Portal <ArrowRight size={18} /></Link>
              <Link to="/contact" className="px-7 py-3.5 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface dark:bg-dark-bg">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="section-title">Everything your hiring team needs</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="card-hover">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-brand-cyan" />
                </div>
                <h3 className="font-semibold text-brand-charcoal dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm bg-white dark:bg-dark-surface">
        <div className="container-xl">
          <div className="text-center mb-10">
            <h2 className="section-title">How it works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="card h-full">
                  <div className="text-3xl font-bold text-brand-cyan/30 mb-3">{s.step}</div>
                  <h4 className="font-semibold text-brand-charcoal dark:text-white mb-2">{s.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-brand-cyan/40 z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-brand-charcoal text-center">
        <div className="container-xl">
          <h2 className="text-3xl font-bold text-white mb-4">Start hiring today</h2>
          <p className="text-gray-400 mb-7">Join 38+ companies already using Firstdot Works to build their teams.</p>
          <Link to="/login" className="btn-orange btn-lg">Access Employer Portal <ArrowRight size={18} /></Link>
        </div>
      </section>
    </div>
  )
}
