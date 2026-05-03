import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, User, Bookmark, Bell, TrendingUp } from 'lucide-react'

const features = [
  { icon: User, title: 'Build Your Profile', desc: 'Create a comprehensive professional profile with skills, experience, education, and portfolio links.' },
  { icon: '📄', title: 'Upload Resume', desc: 'Upload your resume to make it discoverable by employers and Firstdot recruiters directly.' },
  { icon: '🔍', title: 'Search Jobs', desc: 'Browse 124+ active openings with powerful filters for role, location, experience, and work mode.' },
  { icon: Bookmark, title: 'Save Jobs', desc: 'Save interesting roles to your watchlist and apply when you\'re ready.' },
  { icon: TrendingUp, title: 'Track Applications', desc: 'See exactly where each application stands — applied, screened, shortlisted, interview, or offer.' },
  { icon: Bell, title: 'Get Alerts', desc: 'Receive notifications when your application status changes or new matching jobs are posted.' },
]

const stages = ['Profile Created', 'Resume Uploaded', 'Applied to Jobs', 'Screened', 'Shortlisted', 'Interview', 'Selected 🎉']

export default function Candidates() {
  return (
    <div className="animate-fade-in">
      <section className="bg-brand-charcoal py-20">
        <div className="container-xl">
          <div className="max-w-2xl">
            <p className="text-green-400 text-sm font-semibold mb-3 uppercase tracking-widest">For Candidates</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Your next great job <span className="text-brand-orange">starts here.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Firstdot Works helps you discover the right opportunities, track your applications, and get hired faster with recruiter support.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/jobs" className="btn-primary btn-lg">Browse Jobs <ArrowRight size={18} /></Link>
              <Link to="/login" className="px-7 py-3.5 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
                Candidate Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface dark:bg-dark-bg">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="section-title">Everything you need to land your next role</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="card-hover">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-4">
                  {typeof f.icon === 'string'
                    ? <span className="text-xl">{f.icon}</span>
                    : <f.icon size={20} className="text-brand-orange" />
                  }
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
            <h2 className="section-title">Your application journey</h2>
            <p className="section-subtitle mx-auto text-center">Track every step from profile to placement</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {stages.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`px-4 py-2 rounded-full text-sm font-medium border ${i === stages.length - 1 ? 'bg-green-500 text-white border-green-500' : 'border-brand-cyan/40 text-brand-cyan bg-brand-cyan/8'}`}>
                  {s}
                </div>
                {i < stages.length - 1 && <ArrowRight size={14} className="text-gray-300" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-brand-charcoal text-center">
        <div className="container-xl">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to find your next role?</h2>
          <p className="text-gray-400 mb-7">Create your profile today and get discovered by top employers in Chennai.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/login" className="btn-primary btn-lg">Create Account <ArrowRight size={18} /></Link>
            <Link to="/jobs" className="px-7 py-3.5 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors">
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
