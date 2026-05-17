import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, DEMO_CREDS_BY_ROLE } from '../../context/AuthContext'
import { Shield, Building2, User, ArrowRight, CheckCircle, Fingerprint, Eye, EyeOff, AlertCircle, ChevronDown } from 'lucide-react'

const portalCards = [
  {
    role: 'admin',
    title: 'Firstdot Admin',
    subtitle: 'System Operations',
    description: 'Access the full recruitment operations dashboard — manage jobs, candidates, employers, applications, and analytics.',
    icon: Shield,
    color: 'cyan',
    features: ['Platform overview', 'Resume database', 'Employer management', 'Pipeline control'],
  },
  {
    role: 'employer',
    title: 'Employer Portal',
    subtitle: 'Company Workspace',
    description: 'Post jobs, review applicants, search resumes, and manage your hiring pipeline with ease.',
    icon: Building2,
    color: 'orange',
    features: ['Post & manage jobs', 'Review applicants', 'Resume search', 'Hiring analytics'],
  },
  {
    role: 'candidate',
    title: 'Candidate Portal',
    subtitle: 'Job Seeker Access',
    description: 'Build your profile, discover jobs, apply, and track your application status in real time.',
    icon: User,
    color: 'charcoal',
    features: ['Browse & apply to jobs', 'Track applications', 'Save jobs', 'Profile management'],
  },
]

const colorMap = {
  cyan: {
    border: 'border-brand-cyan/20 hover:border-brand-cyan/50 focus-within:border-brand-cyan/60',
    iconBg: 'bg-brand-cyan/10',
    iconText: 'text-brand-cyan',
    btn: 'btn-primary shadow-glow-cyan',
    check: 'text-brand-cyan',
    glow: 'from-brand-cyan/10',
    ring: 'focus:ring-brand-cyan/20 focus:border-brand-cyan',
    activeBg: 'bg-brand-cyan/5',
    badge: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20',
  },
  orange: {
    border: 'border-brand-orange/20 hover:border-brand-orange/50 focus-within:border-brand-orange/60',
    iconBg: 'bg-brand-orange/10',
    iconText: 'text-brand-orange',
    btn: 'bg-brand-orange hover:bg-brand-orange-dark text-white shadow-sm inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-95',
    check: 'text-brand-orange',
    glow: 'from-brand-orange/10',
    ring: 'focus:ring-brand-orange/20 focus:border-brand-orange',
    activeBg: 'bg-brand-orange/5',
    badge: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20',
  },
  charcoal: {
    border: 'border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 focus-within:border-gray-400',
    iconBg: 'bg-gray-100 dark:bg-gray-800',
    iconText: 'text-gray-600 dark:text-gray-300',
    btn: 'bg-brand-charcoal dark:bg-gray-100 text-white dark:text-brand-charcoal hover:bg-gray-800 dark:hover:bg-white shadow-sm inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 active:scale-95',
    check: 'text-gray-500 dark:text-gray-400',
    glow: 'from-gray-500/5',
    ring: 'focus:ring-gray-300 focus:border-gray-400',
    activeBg: 'bg-gray-50 dark:bg-white/5',
    badge: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
  },
}

function LoginCard({ card }) {
  const { login, loginAsRole } = useAuth()
  const navigate = useNavigate()
  const c = colorMap[card.color]
  const demoCreds = DEMO_CREDS_BY_ROLE[card.role]

  const [expanded, setExpanded] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(true)

  const handleDemoLogin = () => {
    setLoading(true)
    setError('')
    setTimeout(() => {
      const result = loginAsRole(card.role)
      if (result.success) {
        navigate(`/dashboard/${card.role}`)
      } else {
        setError(result.error)
        setLoading(false)
      }
    }, 400)
  }

  const handleCredentialLogin = (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const result = login(email.trim().toLowerCase(), password, rememberMe)
      if (result.success) {
        navigate(`/dashboard/${result.role}`)
      } else {
        setError(result.error)
        setLoading(false)
      }
    }, 400)
  }

  const fillDemo = () => {
    setEmail(demoCreds.email)
    setPassword(demoCreds.password)
    setError('')
  }

  return (
    <div
      className={`card relative overflow-hidden flex flex-col border bg-white dark:bg-dark-surface ${c.border} transition-all duration-500 hover:-translate-y-1 hover:shadow-card-md group`}
      id={`login-card-${card.role}`}
    >
      {/* Card glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${c.glow} to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-125`} />

      <div className="relative z-10">
        <div className={`w-14 h-14 rounded-2xl ${c.iconBg} ${c.iconText} flex items-center justify-center mb-5`}>
          <card.icon size={26} />
        </div>
        <div className="mb-2">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1">{card.subtitle}</p>
          <h2 className="text-2xl font-display font-bold text-brand-charcoal dark:text-white">{card.title}</h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{card.description}</p>
        <ul className="space-y-2.5 mb-6">
          {card.features.map(f => (
            <li key={f} className="flex items-center gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
              <CheckCircle size={15} className={`${c.check} flex-shrink-0`} />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto relative z-10 pt-5 border-t border-gray-100 dark:border-gray-800/50 space-y-3">
        {/* Demo credentials hint */}
        <div className={`flex items-center justify-between px-3 py-2 rounded-xl border ${c.badge} text-[10px] font-bold uppercase tracking-wider`}>
          <span>Demo: {demoCreds.email}</span>
          <button onClick={fillDemo} className="opacity-70 hover:opacity-100 transition-opacity underline underline-offset-2">
            Fill
          </button>
        </div>

        {/* Quick demo login button */}
        <button
          onClick={handleDemoLogin}
          disabled={loading}
          id={`login-btn-${card.role}`}
          className={`${c.btn} w-full disabled:opacity-60 disabled:cursor-wait`}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Initialize Session <ArrowRight size={18} /></>
          )}
        </button>

        {/* Expand for manual credentials */}
        <button
          onClick={() => { setExpanded(!expanded); setError('') }}
          className="w-full flex items-center justify-center gap-1.5 text-[11px] font-bold text-gray-400 hover:text-brand-cyan transition-colors uppercase tracking-widest py-1"
        >
          {expanded ? 'Hide' : 'Use credentials'}
          <ChevronDown size={13} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        </button>

        {expanded && (
          <form onSubmit={handleCredentialLogin} className={`space-y-3 p-4 rounded-2xl border ${c.border} ${c.activeBg} animate-fade-in`}>
            {error && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                <AlertCircle size={14} className="flex-shrink-0" />
                {error}
              </div>
            )}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder={demoCreds.email}
                className={`input bg-white dark:bg-dark-bg border-gray-200 dark:border-gray-800 h-10 text-sm ${c.ring}`}
                autoComplete="email"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="••••••••••••"
                  className={`input bg-white dark:bg-dark-bg border-gray-200 dark:border-gray-800 h-10 text-sm pr-10 ${c.ring}`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`remember-${card.role}`}
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-brand-cyan"
              />
              <label htmlFor={`remember-${card.role}`} className="text-xs font-medium text-gray-500 cursor-pointer">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`${c.btn} w-full disabled:opacity-60 disabled:cursor-wait`}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : 'Sign In'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function Login() {
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
            <img src="/logo.png" alt="Firstdot Works" className="h-14 w-auto relative z-10 dark:invert dark:brightness-200 object-contain" />
          </Link>
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-brand-cyan transition-colors px-4 py-2 rounded-lg hover:bg-brand-cyan/5">
            ← Back to site
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-dark-surface shadow-sm border border-gray-100 dark:border-gray-800 mb-6">
            <Fingerprint size={24} className="text-brand-cyan" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-charcoal dark:text-white mb-4 tracking-tight">
            Select Your Portal
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-5">
            Tradition You Trust, Growth You Deserve.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 dark:bg-amber-500/5 text-amber-600 dark:text-amber-500 text-xs font-bold uppercase tracking-wider rounded-lg border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse-slow"></span>
            Demo Mode — Use the "Fill" button for credentials
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {portalCards.map(card => (
            <LoginCard key={card.role} card={card} />
          ))}
        </div>

        <p className="mt-12 text-xs text-gray-400 text-center max-w-md">
          Firstdot Works · Secure Portal Access · Demo v1.0
        </p>
      </div>
    </div>
  )
}
