import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, MapPin, Briefcase, Clock, ChevronDown, Bookmark, X, Sparkles, Loader2, CheckCircle } from 'lucide-react'
import { formatSalary } from '../../data/jobs'
import { useAuth } from '../../context/AuthContext'
import { useDataStore } from '../../context/DataStoreContext'

const workModeColors = { hybrid: 'badge-cyan', remote: 'badge-green', onsite: 'badge-gray' }
const typeColors = { 'full-time': 'badge-cyan', 'part-time': 'badge-orange', contract: 'badge-gray' }

function JobCard({ job }) {
  const [saved, setSaved] = useState(false)
  const [applied, setApplied] = useState(false)
  const [applying, setApplying] = useState(false)
  const { isCandidate, currentUser } = useAuth()

  const handleApply = (e) => {
    if (!isCandidate) return
    e.preventDefault()
    setApplying(true)
    // Simulate DB insert/latency
    setTimeout(() => {
      setApplying(false)
      setApplied(true)
    }, 1500)
  }
  return (
    <div className="card-hover group flex flex-col gap-4 relative overflow-hidden bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-cyan/5 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110"></div>
      
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-gray-700 flex items-center justify-center text-xs font-bold text-gray-500">
              {job.company.substring(0, 1)}
            </span>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{job.company}</p>
          </div>
          <h3 className="font-display font-bold text-brand-charcoal dark:text-white text-lg leading-tight mb-3 group-hover:text-brand-cyan transition-colors">{job.title}</h3>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className={`p-2 rounded-xl transition-all duration-300 flex-shrink-0 ${saved ? 'text-brand-orange bg-brand-orange/10' : 'text-gray-400 hover:text-brand-cyan hover:bg-brand-cyan/10'}`}
          title="Save job"
        >
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 relative z-10">
        <span className={`badge ${workModeColors[job.workMode] || 'badge-gray'}`}>{job.workMode}</span>
        <span className={`badge ${typeColors[job.employmentType] || 'badge-gray'}`}>{job.employmentType}</span>
        <span className="badge badge-gray bg-gray-50 text-gray-600 border border-gray-100">{job.department}</span>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 relative z-10">
        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-brand-cyan/70" /> {job.location}</span>
        <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-brand-cyan/70" /> {job.minExperience}–{job.maxExperience} yrs</span>
        <span className="flex items-center gap-1.5"><Clock size={14} className="text-brand-cyan/70" /> {new Date(job.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2 mt-2 relative z-10">{job.description}</p>
      
      <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-gray-800 mt-auto relative z-10">
        <div>
          <span className="text-base font-display font-bold text-brand-charcoal dark:text-white">
            {formatSalary(job.minSalary, job.maxSalary)}
          </span>
          <span className="text-xs font-medium text-gray-400 ml-1">/ year</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-semibold tracking-wide uppercase text-gray-400">{job.applicantCount + (applied ? 1 : 0)} Applied</span>
          {isCandidate ? (
            <button 
              onClick={handleApply}
              disabled={applied || applying}
              className={`py-2 px-4 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${
                applied 
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                  : 'btn-primary shadow-none group-hover:shadow-glow-cyan'
              }`}
            >
              {applying ? <><Loader2 size={16} className="animate-spin" /> Working...</> : 
               applied ? <><CheckCircle size={16} /> Applied</> : 
               'Apply Now'}
            </button>
          ) : (
            <Link to="/login" className="btn-primary py-2 px-4 shadow-none group-hover:shadow-glow-cyan text-sm">Apply</Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Jobs() {
  const { jobs: allJobs } = useDataStore()
  const [search, setSearch] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [modeFilter, setModeFilter] = useState('')
  const [expFilter, setExpFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [visible, setVisible] = useState(9)
  const [showFilters, setShowFilters] = useState(false)

  // Only show published jobs on the public page
  const jobs = allJobs.filter(j => j.status === 'published')

  const filtered = useMemo(() => {
    return jobs.filter(j => {
      const q = search.toLowerCase()
      const matchSearch = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.skills.some(s => s.toLowerCase().includes(q))
      const matchLoc = !locationFilter || j.location.toLowerCase().includes(locationFilter.toLowerCase())
      const matchMode = !modeFilter || j.workMode === modeFilter
      const matchType = !typeFilter || j.employmentType === typeFilter
      const matchExp = !expFilter || (expFilter === '0-2' ? j.maxExperience <= 2 : expFilter === '3-5' ? j.minExperience >= 3 && j.maxExperience <= 5 : j.minExperience >= 6)
      return matchSearch && matchLoc && matchMode && matchType && matchExp
    })
  }, [search, locationFilter, modeFilter, expFilter, typeFilter, jobs])

  const hasFilters = search || locationFilter || modeFilter || expFilter || typeFilter
  const clearAll = () => { setSearch(''); setLocationFilter(''); setModeFilter(''); setExpFilter(''); setTypeFilter('') }

  return (
    <div className="animate-fade-in bg-surface dark:bg-dark-bg min-h-screen">
      {/* Hero Search Section - Command Center Style */}
      <div className="bg-brand-charcoal py-20 relative overflow-hidden">
        {/* Subtle Network Map Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M-10,50 Q25,20 50,50 T110,50" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="1" fill="white" />
            <circle cx="25" cy="35" r="0.5" fill="white" />
            <circle cx="75" cy="65" r="0.5" fill="white" />
          </svg>
        </div>

        <div className="container-xl relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 tracking-tight">Access the <span className="text-brand-cyan">Talent Network</span></h1>
            <p className="text-gray-400 text-lg">Browse {jobs.length}+ high-growth opportunities across Chennai's top companies.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-cyan transition-colors" />
                <input
                  type="text"
                  placeholder="Search jobs, skills, or companies..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:bg-white/10 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/30 transition-all shadow-lg text-base"
                  id="job-search-input"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-6 py-4 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 font-semibold shadow-lg sm:w-auto w-full ${showFilters || hasFilters ? 'bg-brand-cyan text-white border-brand-cyan shadow-glow-cyan' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
              >
                <Filter size={18} /> {hasFilters ? 'Filters Active' : 'Filters'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xl py-12">
        {/* Filter Bar - Bento Style */}
        <div className={`transition-all duration-500 overflow-hidden ${showFilters ? 'max-h-96 opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'}`}>
          <div className="card bg-white dark:bg-dark-surface p-6 flex flex-wrap gap-4 items-end border-t-4 border-t-brand-cyan">
            <div className="flex-1 min-w-[200px]">
              <label className="label text-xs uppercase tracking-wider text-gray-500">Location</label>
              <input type="text" placeholder="e.g. Chennai, Remote" value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="input" />
            </div>
            <div className="w-full sm:w-auto min-w-[150px]">
              <label className="label text-xs uppercase tracking-wider text-gray-500">Work Mode</label>
              <select value={modeFilter} onChange={e => setModeFilter(e.target.value)} className="select">
                <option value="">All modes</option>
                <option value="onsite">Onsite</option>
                <option value="hybrid">Hybrid</option>
                <option value="remote">Remote</option>
              </select>
            </div>
            <div className="w-full sm:w-auto min-w-[150px]">
              <label className="label text-xs uppercase tracking-wider text-gray-500">Experience</label>
              <select value={expFilter} onChange={e => setExpFilter(e.target.value)} className="select">
                <option value="">All levels</option>
                <option value="0-2">0–2 years</option>
                <option value="3-5">3–5 years</option>
                <option value="6+">6+ years</option>
              </select>
            </div>
            <div className="w-full sm:w-auto min-w-[150px]">
              <label className="label text-xs uppercase tracking-wider text-gray-500">Type</label>
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="select">
                <option value="">All types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            {hasFilters && (
              <button onClick={clearAll} className="px-4 py-3 text-sm font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors flex items-center justify-center gap-2 w-full sm:w-auto border border-transparent">
                <X size={16} /> Clear All
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-display font-bold text-brand-charcoal dark:text-white">Active Openings</h2>
            <span className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-dark-surface text-gray-600 dark:text-gray-300 text-xs font-bold border border-gray-200 dark:border-gray-700">
              {filtered.length} Jobs
            </span>
          </div>
          {hasFilters && (
            <button onClick={clearAll} className="text-sm font-medium text-brand-cyan hover:underline flex items-center gap-1">
              <Sparkles size={14} /> Clear all filters
            </button>
          )}
        </div>

        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <Loader2 size={40} className="animate-spin mb-4 text-brand-cyan" />
            <p className="font-medium animate-pulse">Syncing with Talent Network...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card py-20 text-center border-dashed border-2 border-gray-200 dark:border-gray-800 bg-transparent">
            <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-dark-surface rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-display font-bold text-brand-charcoal dark:text-white mb-2">No matches found in the network</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">Try adjusting your search criteria or clear filters to see more opportunities.</p>
            <button onClick={clearAll} className="btn-outline">Clear All Filters</button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.slice(0, visible).map(job => <JobCard key={job.id} job={job} />)}
            </div>
            {visible < filtered.length && (
              <div className="flex justify-center mt-12">
                <button onClick={() => setVisible(v => v + 6)} className="btn-ghost border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-surface shadow-sm font-semibold px-6 py-3">
                  Load More Jobs <ChevronDown size={16} className="ml-1 opacity-50" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
