import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { useEffect } from 'react'
import FloatingChat from './components/FloatingChat'


// Public layout wrapper
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Public pages
import Home from './pages/public/Home'
import About from './pages/public/About'
import Services from './pages/public/Services'
import Jobs from './pages/public/Jobs'
import Employers from './pages/public/Employers'
import Candidates from './pages/public/Candidates'
import Contact from './pages/public/Contact'
import Login from './pages/public/Login'

// Dashboard layout
import DashboardLayout from './components/layout/DashboardLayout'

// Admin pages
import AdminDashboard from './pages/dashboard/admin/AdminDashboard'
import AdminJobs from './pages/dashboard/admin/AdminJobs'
import AdminCandidates from './pages/dashboard/admin/AdminCandidates'
import AdminEmployers from './pages/dashboard/admin/AdminEmployers'
import AdminApplications from './pages/dashboard/admin/AdminApplications'
import AdminResumeDB from './pages/dashboard/admin/AdminResumeDB'

// Employer pages
import EmployerDashboard from './pages/dashboard/employer/EmployerDashboard'
import EmployerJobs from './pages/dashboard/employer/EmployerJobs'
import EmployerApplicants from './pages/dashboard/employer/EmployerApplicants'
import EmployerResumeSearch from './pages/dashboard/employer/EmployerResumeSearch'

// Candidate pages
import CandidateDashboard from './pages/dashboard/candidate/CandidateDashboard'
import CandidateProfile from './pages/dashboard/candidate/CandidateProfile'
import CandidateApplications from './pages/dashboard/candidate/CandidateApplications'
import CandidateSavedJobs from './pages/dashboard/candidate/CandidateSavedJobs'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}

function ProtectedRoute({ children, allowedRole }) {
  const { currentUser } = useAuth()
  if (!currentUser) return <Navigate to="/login" replace />
  if (allowedRole && currentUser.role !== allowedRole) {
    return <Navigate to={`/dashboard/${currentUser.role}`} replace />
  }
  return children
}

function AppRoutes() {
  const { currentUser } = useAuth()

  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={
        currentUser?.role 
          ? <Navigate to={`/dashboard/${currentUser.role}`} replace /> 
          : <PublicLayout><Home /></PublicLayout>
      } />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
      <Route path="/jobs" element={<PublicLayout><Jobs /></PublicLayout>} />
      <Route path="/employers" element={<PublicLayout><Employers /></PublicLayout>} />
      <Route path="/candidates" element={<PublicLayout><Candidates /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/login" element={
        currentUser?.role
          ? <Navigate to={`/dashboard/${currentUser.role}`} replace />
          : <Login />
      } />

      {/* Admin dashboard */}
      <Route path="/dashboard/admin" element={
        <ProtectedRoute allowedRole="admin">
          <DashboardLayout role="admin" />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="jobs" element={<AdminJobs />} />
        <Route path="candidates" element={<AdminCandidates />} />
        <Route path="employers" element={<AdminEmployers />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="resume-db" element={<AdminResumeDB />} />
      </Route>

      {/* Employer dashboard */}
      <Route path="/dashboard/employer" element={
        <ProtectedRoute allowedRole="employer">
          <DashboardLayout role="employer" />
        </ProtectedRoute>
      }>
        <Route index element={<EmployerDashboard />} />
        <Route path="jobs" element={<EmployerJobs />} />
        <Route path="applicants" element={<EmployerApplicants />} />
        <Route path="resume-search" element={<EmployerResumeSearch />} />
      </Route>

      {/* Candidate dashboard */}
      <Route path="/dashboard/candidate" element={
        <ProtectedRoute allowedRole="candidate">
          <DashboardLayout role="candidate" />
        </ProtectedRoute>
      }>
        <Route index element={<CandidateDashboard />} />
        <Route path="profile" element={<CandidateProfile />} />
        <Route path="applications" element={<CandidateApplications />} />
        <Route path="saved-jobs" element={<CandidateSavedJobs />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
          <FloatingChat />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
