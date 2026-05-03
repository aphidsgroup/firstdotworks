import { createContext, useContext, useState, useEffect } from 'react'

// Demo user accounts
const DEMO_USERS = {
  admin: {
    id: 'usr_admin_001',
    role: 'admin',
    name: 'Priya Krishnan',
    email: 'priya@firstdotworks.com',
    avatar: null,
    title: 'Senior Recruiter',
  },
  employer: {
    id: 'usr_emp_001',
    role: 'employer',
    name: 'Ramesh Iyer',
    email: 'ramesh@techcorp.in',
    avatar: null,
    title: 'HR Manager',
    companyId: 'comp_001',
    companyName: 'TechCorp Solutions',
  },
  candidate: {
    id: 'usr_cand_001',
    role: 'candidate',
    name: 'Arun Kumar',
    email: 'arun.kumar@gmail.com',
    avatar: null,
    title: 'Software Engineer',
  },
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('fdw_user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const login = (role) => {
    const user = DEMO_USERS[role]
    if (user) {
      setCurrentUser(user)
      localStorage.setItem('fdw_user', JSON.stringify(user))
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('fdw_user')
  }

  const isAuthenticated = !!currentUser
  const isAdmin = currentUser?.role === 'admin'
  const isEmployer = currentUser?.role === 'employer'
  const isCandidate = currentUser?.role === 'candidate'

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated, isAdmin, isEmployer, isCandidate }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
