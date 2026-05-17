import { createContext, useContext, useState, useEffect, useCallback } from 'react'

// ============================================================
//  DEMO CREDENTIAL MAP
//  Replace with real auth API in production
// ============================================================
const DEMO_CREDENTIALS = {
  'admin@firstdotworks.com': {
    password: 'admin@fdw2024',
    user: {
      id: 'usr_admin_001',
      role: 'admin',
      name: 'Priya Krishnan',
      email: 'admin@firstdotworks.com',
      avatar: null,
      title: 'Senior Recruiter',
    },
  },
  'employer@techcorp.in': {
    password: 'employer@fdw2024',
    user: {
      id: 'usr_emp_001',
      role: 'employer',
      name: 'Ramesh Iyer',
      email: 'employer@techcorp.in',
      avatar: null,
      title: 'HR Manager',
      companyId: 'comp_001',
      companyName: 'TechCorp Solutions',
    },
  },
  'arun.kumar@gmail.com': {
    password: 'candidate@fdw2024',
    user: {
      id: 'usr_cand_001',
      role: 'candidate',
      name: 'Arun Kumar',
      email: 'arun.kumar@gmail.com',
      avatar: null,
      title: 'Software Engineer',
    },
  },
}

// ============================================================
//  DEMO QUICK-LOGIN MAP (for the one-click demo cards)
// ============================================================
export const DEMO_USERS_BY_ROLE = {
  admin: DEMO_CREDENTIALS['admin@firstdotworks.com'].user,
  employer: DEMO_CREDENTIALS['employer@techcorp.in'].user,
  candidate: DEMO_CREDENTIALS['arun.kumar@gmail.com'].user,
}

export const DEMO_CREDS_BY_ROLE = {
  admin: { email: 'admin@firstdotworks.com', password: 'admin@fdw2024' },
  employer: { email: 'employer@techcorp.in', password: 'employer@fdw2024' },
  candidate: { email: 'arun.kumar@gmail.com', password: 'candidate@fdw2024' },
}

// ============================================================
//  HELPERS
// ============================================================
const generateToken = () => Math.random().toString(36).substr(2) + Date.now().toString(36)

const STORAGE_KEY = 'fdw_session'

const loadSession = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // Validate token exists
    if (!parsed?.token || !parsed?.user) return null
    return parsed
  } catch {
    return null
  }
}

const saveSession = (user, token, rememberMe = true) => {
  const payload = { user, token, createdAt: Date.now() }
  if (rememberMe) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } else {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    localStorage.removeItem(STORAGE_KEY)
  }
}

const clearSession = () => {
  localStorage.removeItem(STORAGE_KEY)
  sessionStorage.removeItem(STORAGE_KEY)
}

// ============================================================
//  CONTEXT
// ============================================================
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    return (
      loadSession() ||
      (() => {
        try {
          const raw = sessionStorage.getItem(STORAGE_KEY)
          if (!raw) return null
          const parsed = JSON.parse(raw)
          return parsed?.token && parsed?.user ? parsed : null
        } catch {
          return null
        }
      })()
    )
  })

  const currentUser = session?.user || null

  /**
   * login(email, password, rememberMe?)
   * Returns { success: true } or { success: false, error: string }
   */
  const login = useCallback((email, password, rememberMe = true) => {
    const entry = DEMO_CREDENTIALS[email?.toLowerCase?.()]
    if (!entry) {
      return { success: false, error: 'No account found with this email address.' }
    }
    if (entry.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' }
    }
    const token = generateToken()
    const newSession = { user: entry.user, token, createdAt: Date.now() }
    saveSession(entry.user, token, rememberMe)
    setSession(newSession)
    return { success: true, role: entry.user.role }
  }, [])

  /**
   * loginAsRole(role) — demo shortcut for one-click login cards
   */
  const loginAsRole = useCallback((role) => {
    const entry = Object.values(DEMO_CREDENTIALS).find(e => e.user.role === role)
    if (!entry) return { success: false, error: 'Unknown role' }
    const token = generateToken()
    const newSession = { user: entry.user, token, createdAt: Date.now() }
    saveSession(entry.user, token, true)
    setSession(newSession)
    return { success: true, role }
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setSession(null)
  }, [])

  const isAuthenticated = !!currentUser
  const isAdmin = currentUser?.role === 'admin'
  const isEmployer = currentUser?.role === 'employer'
  const isCandidate = currentUser?.role === 'candidate'

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        session,
        login,
        loginAsRole,
        logout,
        isAuthenticated,
        isAdmin,
        isEmployer,
        isCandidate,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
