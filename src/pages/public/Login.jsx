import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Shield, Building2, User, ArrowRight, CheckCircle, Fingerprint } from 'lucide-react'

const loginCards = [
  {
    role: 'admin',
    title: 'Firstdot Admin',
    subtitle: 'System Operations',
    description: 'Access the full recruitment operations dashboard — manage jobs, candidates, employers, applications, and analytics.',
    icon: Shield,
    color: 'cyan',
    features: ['Platform overview', 'Resume database', 'Employer management', 'Pipeline control'],
    demoUser: 'Priya Krishnan · Senior Recruiter',
  },
  {
    role: 'employer',
    title: 'Employer Portal',
    subtitle: 'Company Workspace',
    description: 'Post jobs, review applicants, search resumes, and manage your hiring pipeline with ease.',
    icon: Building2,
    color: 'orange',
    features: ['Post & manage jobs', 'Review applicants', 'Resume search', 'Hiring analytics'],
    demoUser: 'Ramesh Iyer · TechCorp Solutions',
  },
  {
    role: 'candidate',
    title: 'Candidate Portal',
    subtitle: 'Job Seeker Access',
    description: 'Build your profile, discover jobs, apply, and track your application status in real time.',
    icon: User,
    color: 'charcoal',
    features: ['Browse & apply to jobs', 'Track applications', 'Save jobs', 'Profile management'],
    demoUser: 'Arun Kumar · Software Engineer',
  },
]

const colorMap = {
  cyan: {
    bg: 'bg-white dark:bg-dark-surface',
    border: 'border-brand-cyan/20 hover:border-brand-cyan/50',
    iconBg: 'bg-brand-cyan/10',
    iconText: 'text-brand-cyan',
    btn: 'btn-primary shadow-glow-cyan',
    check: 'text-brand-cyan',
    glow: 'from-brand-cyan/10',
  },
  orange: {
    bg: 'bg-white dark:bg-dark-surface',
    border: 'border-brand-orange/20 hover:border-brand-orange/50',
    iconBg: 'bg-brand-orange/10',
    iconText: 'text-brand-orange',
    btn: 'bg-brand-orange hover:bg-brand-orange-dark text-white shadow-sm inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300',
    check: 'text-brand-orange',
    glow: 'from-brand-orange/10',
  },
  charcoal: {
    bg: 'bg-white dark:bg-dark-surface',
    border: 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600',
    iconBg: 'bg-gray-100 dark:bg-gray-800',
    iconText: 'text-gray-600 dark:text-gray-300',
    btn: 'bg-brand-charcoal dark:bg-gray-100 text-white dark:text-brand-charcoal hover:bg-gray-800 dark:hover:bg-white shadow-sm inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300',
    check: 'text-gray-500 dark:text-gray-400',
    glow: 'from-gray-500/5',
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
    <div className="min-h-screen bg-surface dark:bg-dark-bg flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-hero-pattern" />
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-brand-cyan/20 blur-[120px] pointer-events-none" />
      
      {/* Header */}
      <div className="relative z-10 py-6">
        <div className="container-xl flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 relative group">
            <div className="absolute -inset-2 bg-brand-cyan/0 group-hover:bg-brand-cyan/5 rounded-full blur-md transition-all duration-500"></div>
            <img src="/logo.png" alt="Firstdot Works" className="h-28 w-auto relative z-10 dark:invert dark:brightness-200 scale-125 object-contain" />
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-brand-cyan transition-colors px-4 py-2 rounded-lg hover:bg-brand-cyan/5">
            ← Back to network
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-dark-surface shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
            <Fingerprint size={24} className="text-brand-cyan" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-charcoal dark:text-white mb-4 tracking-tight">
            Select Your Portal
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-6">
            Initialize your session to access personalized tools and network insights.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 dark:bg-amber-500/5 text-amber-600 dark:text-amber-500 text-xs font-bold uppercase tracking-wider rounded-lg border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse-slow"></span>
            Demo Mode Active
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {loginCards.map((card) => {
            const c = colorMap[card.color]
            return (
              <div
                key={card.role}
                className={`card relative overflow-hidden flex flex-col border ${c.bg} ${c.border} transition-all duration-500 hover:-translate-y-2 hover:shadow-card-md group`}
                id={`login-card-${card.role}`}
              >
                {/* Card glow effect */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${c.glow} to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${c.iconBg} ${c.iconText} flex items-center justify-center mb-6`}>
                    <card.icon size={26} />
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">{card.subtitle}</p>
                    <h2 className="text-2xl font-display font-bold text-brand-charcoal dark:text-white">{card.title}</h2>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8 h-16">
                    {card.description}
                  </p>
                  
                  <ul className="space-y-3 mb-10">
                    {card.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
                        <CheckCircle size={16} className={`${c.check} flex-shrink-0`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto relative z-10 pt-6 border-t border-gray-100 dark:border-gray-800/50">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-gray-800/50 mb-6">
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-dark-surface flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700 flex-shrink-0">
                      <span className="text-xs font-bold text-gray-500">{card.demoUser.charAt(0)}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Demo Account</p>
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate">{card.demoUser}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleLogin(card.role)}
                    id={`login-btn-${card.role}`}
                    className={`${c.btn} w-full`}
                  >
                    Initialize Session <ArrowRight size={18} />
                  </button>
                  
                  {card.role !== 'admin' && (
                    <button className="w-full mt-3 text-xs font-semibold text-gray-400 hover:text-brand-cyan transition-colors py-1 uppercase tracking-wider">
                      Create New Account
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-16 text-xs text-gray-400 text-center max-w-md">
          Authentication module v0.1 • Backend integration pending Phase 2 deployment
        </p>
      </div>
    </div>
  )
}
