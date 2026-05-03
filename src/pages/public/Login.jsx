import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Shield, Building2, User, ArrowRight, CheckCircle } from 'lucide-react'

const loginCards = [
  {
    role: 'admin',
    title: 'Firstdot Admin',
    subtitle: 'Internal team access',
    description: 'Access the full recruitment operations dashboard — manage jobs, candidates, employers, applications, and analytics.',
    icon: Shield,
    color: 'cyan',
    features: ['Platform overview', 'Resume database', 'Employer management', 'Pipeline control'],
    demoUser: 'Priya Krishnan · Senior Recruiter',
  },
  {
    role: 'employer',
    title: 'Employer / Client',
    subtitle: 'Company hiring access',
    description: 'Post jobs, review applicants, search resumes, and manage your hiring pipeline with ease.',
    icon: Building2,
    color: 'orange',
    features: ['Post & manage jobs', 'Review applicants', 'Resume search', 'Hiring analytics'],
    demoUser: 'Ramesh Iyer · TechCorp Solutions',
  },
  {
    role: 'candidate',
    title: 'Candidate',
    subtitle: 'Job seeker access',
    description: 'Build your profile, discover jobs, apply, and track your application status in real time.',
    icon: User,
    color: 'green',
    features: ['Browse & apply to jobs', 'Track applications', 'Save jobs', 'Profile management'],
    demoUser: 'Arun Kumar · Software Engineer',
  },
]

const colorMap = {
  cyan: {
    bg: 'bg-brand-cyan/8 dark:bg-brand-cyan/10',
    border: 'border-brand-cyan/30',
    icon: 'bg-brand-cyan/15 text-brand-cyan',
    btn: 'btn-primary',
    badge: 'badge-cyan',
    check: 'text-brand-cyan',
  },
  orange: {
    bg: 'bg-brand-orange/8 dark:bg-brand-orange/10',
    border: 'border-brand-orange/30',
    icon: 'bg-brand-orange/15 text-brand-orange',
    btn: 'btn-orange',
    badge: 'badge-orange',
    check: 'text-brand-orange',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/10',
    border: 'border-green-200 dark:border-green-800',
    icon: 'bg-green-100 text-green-600',
    btn: 'bg-green-600 hover:bg-green-700 text-white inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all active:scale-95',
    badge: 'badge-green',
    check: 'text-green-500',
  },
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = (role) => {
    login(role)
    navigate(`/dashboard/${role}`)
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-bg flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-dark-card border-b border-surface-border dark:border-dark-border py-5">
        <div className="container-xl flex items-center justify-between">
          <Link to="/">
            <img src="/logo.png" alt="Firstdot Works" className="h-9 w-auto" />
          </Link>
          <Link to="/" className="text-sm text-gray-500 hover:text-brand-cyan transition-colors">
            ← Back to website
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-charcoal dark:text-white mb-3">
            Welcome to Firstdot Works
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Select your role to access your personalized dashboard. This is a demo prototype — no real credentials needed.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-brand-orange/10 text-brand-orange text-xs font-semibold rounded-full border border-brand-orange/20">
            🔒 Demo Mode — Click any login button to proceed
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {loginCards.map((card) => {
            const c = colorMap[card.color]
            return (
              <div
                key={card.role}
                className={`card border-2 ${c.border} ${c.bg} flex flex-col`}
                id={`login-card-${card.role}`}
              >
                <div className={`w-12 h-12 rounded-xl ${c.icon} flex items-center justify-center mb-4`}>
                  <card.icon size={24} />
                </div>
                <div className="mb-1">
                  <h2 className="text-xl font-bold text-brand-charcoal dark:text-white">{card.title}</h2>
                  <p className="text-xs text-gray-400 font-medium">{card.subtitle}</p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 mt-2">
                  {card.description}
                </p>
                <ul className="space-y-1.5 mb-6">
                  {card.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                      <CheckCircle size={13} className={c.check} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <div className="text-xs text-gray-400 mb-3 bg-white/60 dark:bg-white/5 rounded-lg px-3 py-2">
                    <span className="font-medium">Demo account:</span> {card.demoUser}
                  </div>
                  <button
                    onClick={() => handleLogin(card.role)}
                    id={`login-btn-${card.role}`}
                    className={`${c.btn} w-full justify-center`}
                  >
                    Login as {card.title} <ArrowRight size={16} />
                  </button>
                  {card.role !== 'admin' && (
                    <button className="w-full mt-2 text-xs text-gray-400 hover:text-gray-600 transition-colors py-1">
                      Register as {card.title} →
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-8 text-xs text-gray-400 text-center max-w-md">
          This is an MVP prototype for stakeholder review. Authentication, real data, and full backend integration coming in Phase 2.
        </p>
      </div>
    </div>
  )
}
