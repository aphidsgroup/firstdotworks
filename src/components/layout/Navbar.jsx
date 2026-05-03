import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Sun, Moon, ChevronDown, Briefcase } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/employers', label: 'For Employers' },
  { to: '/candidates', label: 'For Candidates' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const { isDark, toggle } = useTheme()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md border-b border-surface-border dark:border-dark-border shadow-sm">
      <div className="container-xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img src="/logo.png" alt="Firstdot Works" className="h-9 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-brand-cyan bg-brand-cyan/10'
                      : 'text-gray-600 hover:text-brand-charcoal hover:bg-surface dark:text-gray-300 dark:hover:text-white dark:hover:bg-dark-surface'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-gray-500 hover:bg-surface dark:hover:bg-dark-surface transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/dashboard/${currentUser.role}`)}
                  className="btn-outline btn-sm"
                >
                  Dashboard
                </button>
                <button onClick={logout} className="btn-ghost btn-sm text-red-500 hover:bg-red-50">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary btn-sm">
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={toggle} className="p-2 rounded-lg text-gray-500">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-surface dark:hover:bg-dark-surface"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden py-4 border-t border-surface-border dark:border-dark-border animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map(l => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-brand-cyan bg-brand-cyan/10'
                        : 'text-gray-600 hover:text-brand-charcoal hover:bg-surface dark:text-gray-300'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="pt-3 mt-2 border-t border-surface-border dark:border-dark-border flex flex-col gap-2">
                {currentUser ? (
                  <>
                    <button
                      onClick={() => { navigate(`/dashboard/${currentUser.role}`); setOpen(false) }}
                      className="btn-outline btn-sm text-center"
                    >
                      Dashboard
                    </button>
                    <button onClick={() => { logout(); setOpen(false) }} className="btn-ghost btn-sm text-red-500">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="btn-primary btn-sm text-center" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
