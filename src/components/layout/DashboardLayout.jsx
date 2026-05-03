import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Briefcase, Users, Building2, FileText, Database,
  Bell, Search, ChevronLeft, ChevronRight, LogOut, Sun, Moon,
  User, ClipboardList, Bookmark, Settings, Menu, X
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

const navItems = {
  admin: [
    { to: '/dashboard/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/dashboard/admin/jobs', label: 'Jobs', icon: Briefcase },
    { to: '/dashboard/admin/candidates', label: 'Candidates', icon: Users },
    { to: '/dashboard/admin/employers', label: 'Employers', icon: Building2 },
    { to: '/dashboard/admin/applications', label: 'Applications', icon: ClipboardList },
    { to: '/dashboard/admin/resume-db', label: 'Resume Database', icon: Database },
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

const roleLabel = { admin: 'Admin Panel', employer: 'Employer Portal', candidate: 'Candidate Portal' }
const roleColor = { admin: 'text-brand-cyan', employer: 'text-brand-orange', candidate: 'text-green-500' }

export default function DashboardLayout({ role }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { currentUser, logout } = useAuth()
  const { isDark, toggle } = useTheme()
  const navigate = useNavigate()
  const items = navItems[role] || []

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const Sidebar = ({ mobile = false }) => (
    <aside className={`
      flex flex-col bg-white dark:bg-dark-card border-r border-surface-border dark:border-dark-border
      transition-all duration-300 flex-shrink-0
      ${mobile ? 'w-64 h-full' : collapsed ? 'w-16' : 'w-60'}
    `}>
      {/* Logo area */}
      <div className={`flex items-center h-14 px-4 border-b border-surface-border dark:border-dark-border flex-shrink-0 ${collapsed && !mobile ? 'justify-center' : 'gap-2'}`}>
        {(!collapsed || mobile) && (
          <img src="/logo.png" alt="Firstdot Works" className="h-7 w-auto" />
        )}
        {!mobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1.5 rounded-lg hover:bg-surface dark:hover:bg-dark-surface text-gray-400 transition-colors"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </div>

      {/* Role badge */}
      {(!collapsed || mobile) && (
        <div className="px-4 pt-4 pb-2">
          <span className={`text-xs font-bold uppercase tracking-widest ${roleColor[role]}`}>
            {roleLabel[role]}
          </span>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
        {items.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => mobile && setMobileOpen(false)}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''} ${collapsed && !mobile ? 'justify-center px-2' : ''}`
            }
            title={collapsed && !mobile ? item.label : undefined}
          >
            <item.icon size={18} className="flex-shrink-0" />
            {(!collapsed || mobile) && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User area */}
      <div className={`p-3 border-t border-surface-border dark:border-dark-border ${collapsed && !mobile ? 'flex justify-center' : ''}`}>
        {(!collapsed || mobile) ? (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan font-bold text-sm flex-shrink-0">
              {currentUser?.name?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-brand-charcoal dark:text-white truncate">{currentUser?.name}</p>
              <p className="text-xs text-gray-400 truncate">{currentUser?.title}</p>
            </div>
            <button onClick={handleLogout} className="p-1.5 rounded text-gray-400 hover:text-red-500 transition-colors" title="Logout">
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <button onClick={handleLogout} className="p-1.5 rounded text-gray-400 hover:text-red-500 transition-colors" title="Logout">
            <LogOut size={16} />
          </button>
        )}
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-surface dark:bg-dark-bg">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 flex flex-col h-full">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white dark:bg-dark-card border-b border-surface-border dark:border-dark-border flex items-center px-4 gap-3 flex-shrink-0">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-1.5 rounded text-gray-500"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu size={20} />
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="input pl-9 py-1.5 text-sm h-9"
            />
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <button onClick={toggle} className="p-2 rounded-lg text-gray-400 hover:bg-surface dark:hover:bg-dark-surface transition-colors">
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button className="relative p-2 rounded-lg text-gray-400 hover:bg-surface dark:hover:bg-dark-surface transition-colors">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand-orange"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan font-bold text-sm ml-1 cursor-pointer">
              {currentUser?.name?.[0] || 'U'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
