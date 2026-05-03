import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/employers', label: 'For Employers' },
  { to: '/candidates', label: 'For Candidates' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { currentUser, logout } = useAuth()
  const { isDark, toggle } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-surface-border dark:border-dark-border transition-all duration-300 ${scrolled ? 'h-20' : 'h-32'} ${open ? 'z-[9999]' : 'z-50'}`}>
      <div className="container-xl h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 relative group">
            <div className="absolute -inset-2 bg-brand-cyan/0 group-hover:bg-brand-cyan/5 rounded-full blur-md transition-all duration-500"></div>
            <img src="/logo.png" alt="Firstdot Works" className={`${scrolled ? 'h-16' : 'h-28'} w-auto relative z-10 transition-all duration-500 dark:invert dark:brightness-200 scale-125 object-contain`} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-brand-cyan'
                      : 'text-gray-500 hover:text-brand-charcoal dark:text-gray-400 dark:hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-glow-cyan animate-fade-in" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggle}
              className="p-2.5 rounded-full text-gray-400 hover:text-brand-cyan hover:bg-brand-cyan/5 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/dashboard/${currentUser.role}`)}
                  className="btn-outline btn-sm"
                >
                  Dashboard
                </button>
                <button onClick={logout} className="text-sm font-semibold text-gray-500 hover:text-rose-500 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-semibold text-brand-charcoal dark:text-white hover:text-brand-cyan transition-colors">
                  Login
                </Link>
                <Link to="/contact" className="btn-primary btn-sm">
                  Get in Touch
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={toggle} className="p-2 rounded-full text-gray-500 relative z-[110]">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-brand-charcoal dark:text-white relative z-[110]"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden fixed inset-0 z-[9999] animate-fade-in flex flex-col">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-md" onClick={() => setOpen(false)} />
            
            {/* Menu Content */}
            <div className="relative w-full h-full bg-white dark:bg-dark-bg flex flex-col shadow-2xl">
              <div className="h-32 flex items-center px-6 border-b border-surface-border dark:border-dark-border bg-white dark:bg-dark-bg">
                 <img src="/logo.png" alt="Firstdot Works" className="h-28 w-auto dark:invert dark:brightness-200 scale-125 object-contain" />
              </div>
            <nav className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-2">
              {navLinks.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-4 rounded-xl text-lg font-bold transition-all ${
                      isActive
                        ? 'text-brand-cyan bg-brand-cyan/5'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              
              <div className="pt-8 mt-4 border-t border-surface-border dark:border-dark-border flex flex-col gap-4">
                {currentUser ? (
                  <>
                    <button
                      onClick={() => { navigate(`/dashboard/${currentUser.role}`); setOpen(false) }}
                      className="btn-outline py-4 text-base"
                    >
                      Dashboard
                    </button>
                    <button onClick={() => { logout(); setOpen(false) }} className="btn-ghost text-rose-500 py-4 text-base">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn-outline py-4 justify-center text-base" onClick={() => setOpen(false)}>
                      Login
                    </Link>
                    <Link to="/contact" className="btn-primary py-4 justify-center text-base" onClick={() => setOpen(false)}>
                      Get in Touch
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
