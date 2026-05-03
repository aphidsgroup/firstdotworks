import { useState, useEffect, useRef } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Briefcase, Users, Building2, FileText, Database,
  Bell, Search, ChevronLeft, ChevronRight, LogOut, Sun, Moon,
  User, ClipboardList, Bookmark, Settings, Menu, X, Command, MessageSquare
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useNotifications } from '../../context/NotificationContext'

const navItems = {
  admin: [
    { to: '/dashboard/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/dashboard/admin/jobs', label: 'Jobs', icon: Briefcase },
    { to: '/dashboard/admin/candidates', label: 'Candidates', icon: Users },
    { to: '/dashboard/admin/employers', label: 'Employers', icon: Building2 },
    { to: '/dashboard/admin/applications', label: 'Applications', icon: ClipboardList },
    { to: '/dashboard/admin/resume-db', label: 'Resume Database', icon: Database },
    { to: '/dashboard/admin/inbox', label: 'Chat Inbox', icon: MessageSquare },
    { to: '/dashboard/admin/settings', label: 'Settings', icon: Settings },
  ],
  employer: [
    { to: '/dashboard/employer', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/dashboard/employer/jobs', label: 'My Jobs', icon: Briefcase },
    { to: '/dashboard/employer/applicants', label: 'Applicants', icon: Users },
    { to: '/dashboard/employer/resume-search', label: 'Resume Search', icon: Database },
  ],
  candidate: [
    { to: '/dashboard/candidate', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/dashboard/candidate/profile', label: 'My Profile', icon: User },
    { to: '/dashboard/candidate/applications', label: 'Applications', icon: ClipboardList },
    { to: '/dashboard/candidate/saved-jobs', label: 'Saved Jobs', icon: Bookmark },
  ],
}

const roleLabel = { admin: 'Admin Operations', employer: 'Employer Workspace', candidate: 'Candidate Portal' }

export default function DashboardLayout({ role }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const { isDark, toggle } = useTheme()
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications()
  const [showNotifs, setShowNotifs] = useState(false)
  const notifRef = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  const items = navItems[role] || []

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0)
    }
    setShowNotifs(false) // Close dropdown on route change
  }, [pathname])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifs(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const Sidebar = ({ mobile = false }) => (
    <aside className={`
      flex flex-col bg-white dark:bg-dark-bg border-r border-surface-border dark:border-dark-border
      transition-all duration-300 flex-shrink-0 relative z-20
      ${mobile ? 'w-64 h-full shadow-2xl' : collapsed ? 'w-[72px]' : 'w-64'}
    `}>
      {/* Logo area */}
      <div className={`flex items-center h-20 px-6 border-b border-surface-border dark:border-dark-border flex-shrink-0 ${collapsed && !mobile ? 'justify-center px-0' : 'gap-3'}`}>
        {(!collapsed || mobile) && (
          <img src="/logo.png" alt="Firstdot Works" className="h-28 w-auto dark:invert dark:brightness-200 scale-125 object-contain" />
        )}
        {collapsed && !mobile && (
          <div className="w-8 h-8 rounded-full bg-brand-cyan flex items-center justify-center text-white font-bold text-lg">F</div>
        )}
        {!mobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-24 w-6 h-6 bg-white dark:bg-dark-surface border border-surface-border dark:border-dark-border rounded-full flex items-center justify-center text-gray-400 hover:text-brand-cyan hover:border-brand-cyan transition-colors z-10 shadow-sm"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </div>

      {/* Role badge */}
      {(!collapsed || mobile) && (
        <div className="px-6 pt-6 pb-2">
          <span className="overline-text text-brand-cyan">
            {roleLabel[role]}
          </span>
        </div>
      )}

      {/* Nav items */}
      <nav className={`flex-1 ${collapsed && !mobile ? 'px-3' : 'px-4'} py-4 space-y-1 overflow-y-auto scrollbar-hidden`}>
        {items.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => mobile && setMobileOpen(false)}
            className={({ isActive }) =>
              `relative flex items-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
               ${collapsed && !mobile ? 'justify-center px-0' : 'px-3'}
               ${isActive 
                 ? 'text-brand-cyan bg-brand-cyan/5' 
                 : 'text-gray-500 hover:text-brand-charcoal hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/5'}`
            }
            title={collapsed && !mobile ? item.label : undefined}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-brand-cyan rounded-r-full shadow-glow-cyan" />
                )}
                <item.icon size={18} className={`flex-shrink-0 ${isActive ? 'text-brand-cyan' : 'text-gray-400 group-hover:text-brand-charcoal dark:group-hover:text-gray-200'}`} />
                {(!collapsed || mobile) && <span>{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User area */}
      <div className={`p-4 border-t border-surface-border dark:border-dark-border ${collapsed && !mobile ? 'flex justify-center' : ''}`}>
        {(!collapsed || mobile) ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan font-bold text-sm flex-shrink-0 border border-brand-cyan/20">
              {currentUser?.name?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-brand-charcoal dark:text-white truncate">{currentUser?.name}</p>
              <p className="text-[11px] uppercase tracking-wide text-gray-400 truncate">{currentUser?.title}</p>
            </div>
            <button onClick={handleLogout} className="p-2 rounded-lg text-gray-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10 transition-colors" title="Logout">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button onClick={handleLogout} className="w-10 h-10 rounded-full bg-surface dark:bg-dark-surface flex items-center justify-center text-gray-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-500/10 transition-colors" title="Logout">
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-surface dark:bg-dark-surface">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] flex md:hidden">
          <div className="absolute inset-0 bg-brand-charcoal/80 backdrop-blur-sm transition-opacity" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 flex flex-col h-full animate-fade-in shadow-2xl">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">


        {/* Top bar */}
        <header className="h-20 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-surface-border dark:border-dark-border flex items-center px-6 gap-4 flex-shrink-0 z-[150]">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu size={22} />
          </button>

          {/* Command Search */}
          <div className="flex-1 max-w-xl hidden sm:block">
            <div className="relative group">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-cyan transition-colors" />
              <input
                type="text"
                placeholder="Search candidates, jobs, or commands..."
                className="w-full pl-10 pr-12 py-2.5 bg-gray-50 dark:bg-dark-surface border border-gray-200 dark:border-gray-800 rounded-xl text-sm
                           text-brand-charcoal placeholder:text-gray-400
                           focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan focus:bg-white
                           transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50">
                <kbd className="px-1.5 py-0.5 text-[10px] font-sans font-semibold border border-gray-300 dark:border-gray-600 rounded text-gray-500 dark:text-gray-400">⌘</kbd>
                <kbd className="px-1.5 py-0.5 text-[10px] font-sans font-semibold border border-gray-300 dark:border-gray-600 rounded text-gray-500 dark:text-gray-400">K</kbd>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button onClick={toggle} className="p-2.5 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-brand-cyan transition-all duration-300">
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setShowNotifs(!showNotifs)}
                className={`relative p-2.5 rounded-full transition-all duration-300 ${showNotifs ? 'bg-brand-cyan/10 text-brand-cyan' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-brand-cyan'}`}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-dark-bg animate-pulse-slow">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifs && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 rounded-3xl shadow-card-lg z-50 overflow-hidden animate-fade-in">
                  <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-dark-bg/50">
                    <h4 className="text-sm font-bold dark:text-white uppercase tracking-widest">Alerts Center</h4>
                    <button onClick={markAllAsRead} className="text-[10px] font-bold text-brand-cyan hover:text-brand-orange uppercase tracking-widest transition-colors">Mark All Read</button>
                  </div>
                  <div className="max-h-[350px] overflow-y-auto">
                    {notifications.length > 0 ? notifications.map(n => (
                      <div 
                        key={n.id} 
                        onClick={() => { markAsRead(n.id); navigate(n.link); setShowNotifs(false); }}
                        className={`p-4 border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors relative ${!n.read ? 'bg-brand-cyan/[0.02]' : ''}`}
                      >
                        {!n.read && <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-glow-cyan" />}
                        <div className="flex justify-between items-start mb-1 pl-2">
                          <h5 className={`text-xs font-bold leading-tight ${!n.read ? 'text-brand-charcoal dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>{n.title}</h5>
                          <span className="text-[10px] font-medium text-gray-400">{new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-normal pl-2">{n.message}</p>
                      </div>
                    )) : (
                      <div className="py-12 flex flex-col items-center justify-center text-gray-400 text-center px-6">
                        <Bell size={24} className="mb-3 opacity-20" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">No New Notifications</p>
                      </div>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="p-3 bg-gray-50/50 dark:bg-dark-bg/50 text-center border-t border-gray-100 dark:border-gray-800">
                      <button onClick={clearAll} className="text-[10px] font-bold text-gray-400 hover:text-rose-500 uppercase tracking-widest transition-colors">Clear All Logs</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main ref={mainRef} className="flex-1 overflow-y-auto p-6 md:p-8 z-10 scroll-smooth relative">
          {/* Decorative subtle background node map */}
          <div className="absolute top-0 right-0 w-[800px] h-[600px] opacity-[0.02] dark:opacity-[0.05] pointer-events-none bg-hero-pattern" />
          <div className="max-w-7xl mx-auto relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
