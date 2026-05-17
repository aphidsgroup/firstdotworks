/**
 * DataStoreContext — Central in-memory data store
 * =================================================
 * Seeded from mock data arrays. Persists mutations to localStorage.
 * Replace individual `useEffect + fetch()` calls per resource when
 * a real backend API is available.
 *
 * TODO (Phase 2): Replace each localStorage read/write with:
 *   const [jobs, setJobs] = useSWR('/api/v1/jobs', fetcher)
 */
import { createContext, useContext, useState, useCallback } from 'react'
import { jobs as initialJobs } from '../data/jobs'
import { candidates as initialCandidates } from '../data/candidates'
import { employers as initialEmployers } from '../data/employers'
import { applications as initialApplications } from '../data/applications'

const DataStoreContext = createContext(null)

const KEYS = {
  jobs: 'fdw_store_jobs',
  candidates: 'fdw_store_candidates',
  applications: 'fdw_store_applications',
  employers: 'fdw_store_employers',
  submissions: 'fdw_form_submissions',
}

function loadOrSeed(key, seedData) {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch {}
  return [...seedData]
}

function persist(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {}
}

export function DataStoreProvider({ children }) {
  const [jobs, setJobsState] = useState(() => loadOrSeed(KEYS.jobs, initialJobs))
  const [candidates, setCandidatesState] = useState(() => loadOrSeed(KEYS.candidates, initialCandidates))
  const [applications, setApplicationsState] = useState(() => loadOrSeed(KEYS.applications, initialApplications))
  const [employers, setEmployersState] = useState(() => loadOrSeed(KEYS.employers, initialEmployers))
  const [submissions, setSubmissions] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEYS.submissions)) || [] } catch { return [] }
  })

  // ─── Jobs ────────────────────────────────────────────────────────────────
  const addJob = useCallback((jobData) => {
    const newJob = {
      id: `job_${Date.now()}`,
      status: 'published',
      applicantCount: 0,
      postedAt: new Date().toISOString(),
      ...jobData,
    }
    setJobsState(prev => {
      const next = [newJob, ...prev]
      persist(KEYS.jobs, next)
      return next
    })
    return newJob
  }, [])

  const updateJob = useCallback((id, updates) => {
    setJobsState(prev => {
      const next = prev.map(j => j.id === id ? { ...j, ...updates } : j)
      persist(KEYS.jobs, next)
      return next
    })
  }, [])

  const deleteJob = useCallback((id) => {
    setJobsState(prev => {
      const next = prev.filter(j => j.id !== id)
      persist(KEYS.jobs, next)
      return next
    })
  }, [])

  const bulkUpdateJobStatus = useCallback((ids, status) => {
    setJobsState(prev => {
      const next = prev.map(j => ids.includes(j.id) ? { ...j, status } : j)
      persist(KEYS.jobs, next)
      return next
    })
  }, [])

  // ─── Candidates ──────────────────────────────────────────────────────────
  const updateCandidateStatus = useCallback((id, status) => {
    setCandidatesState(prev => {
      const next = prev.map(c => c.id === id ? { ...c, status } : c)
      persist(KEYS.candidates, next)
      return next
    })
  }, [])

  const bulkUpdateCandidateStatus = useCallback((ids, status) => {
    setCandidatesState(prev => {
      const next = prev.map(c => ids.includes(c.id) ? { ...c, status } : c)
      persist(KEYS.candidates, next)
      return next
    })
  }, [])

  // ─── Applications ────────────────────────────────────────────────────────
  const updateApplicationStatus = useCallback((id, status) => {
    setApplicationsState(prev => {
      const next = prev.map(a => a.id === id ? { ...a, status } : a)
      persist(KEYS.applications, next)
      return next
    })
  }, [])

  const addApplication = useCallback((appData) => {
    const newApp = {
      id: `app_${Date.now()}`,
      status: 'applied',
      appliedAt: new Date().toISOString(),
      recruiterNote: '',
      ...appData,
    }
    setApplicationsState(prev => {
      const next = [newApp, ...prev]
      persist(KEYS.applications, next)
      return next
    })
    return newApp
  }, [])

  const bulkUpdateApplicationStatus = useCallback((ids, status) => {
    setApplicationsState(prev => {
      const next = prev.map(a => ids.includes(a.id) ? { ...a, status } : a)
      persist(KEYS.applications, next)
      return next
    })
  }, [])

  // ─── Employers ───────────────────────────────────────────────────────────
  const updateEmployer = useCallback((id, updates) => {
    setEmployersState(prev => {
      const next = prev.map(e => e.id === id ? { ...e, ...updates } : e)
      persist(KEYS.employers, next)
      return next
    })
  }, [])

  // ─── Form submissions (Contact, etc.) ────────────────────────────────────
  const addSubmission = useCallback((type, data) => {
    const record = { id: `sub_${Date.now()}`, type, data, submittedAt: new Date().toISOString() }
    setSubmissions(prev => {
      const next = [record, ...prev]
      persist(KEYS.submissions, next)
      return next
    })
    return record
  }, [])

  // ─── Reset (dev tool) ────────────────────────────────────────────────────
  const resetStore = useCallback(() => {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k))
    setJobsState([...initialJobs])
    setCandidatesState([...initialCandidates])
    setApplicationsState([...initialApplications])
    setEmployersState([...initialEmployers])
    setSubmissions([])
  }, [])

  return (
    <DataStoreContext.Provider
      value={{
        // Data
        jobs,
        candidates,
        applications,
        employers,
        submissions,
        // Job actions
        addJob,
        updateJob,
        deleteJob,
        bulkUpdateJobStatus,
        // Candidate actions
        updateCandidateStatus,
        bulkUpdateCandidateStatus,
        // Application actions
        updateApplicationStatus,
        addApplication,
        bulkUpdateApplicationStatus,
        // Employer actions
        updateEmployer,
        // Form submissions
        addSubmission,
        // Dev
        resetStore,
      }}
    >
      {children}
    </DataStoreContext.Provider>
  )
}

export function useDataStore() {
  const ctx = useContext(DataStoreContext)
  if (!ctx) throw new Error('useDataStore must be used within DataStoreProvider')
  return ctx
}
