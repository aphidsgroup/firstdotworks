import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, MapPin, Briefcase, Clock, ChevronDown, Bookmark, ArrowRight, X } from 'lucide-react'
import { jobs, formatSalary } from '../../data/jobs'

const workModeColors = { hybrid: 'badge-cyan', remote: 'badge-green', onsite: 'badge-gray' }
const typeColors = { 'full-time': 'badge-cyan', 'part-time': 'badge-orange', contract: 'badge-purple' }

function JobCard({ job }) {
  const [saved, setSaved] = useState(false)
  return (
    <div className="card-hover flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-brand-charcoal dark:text-white text-base leading-tight mb-1">{job.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className={`p-2 rounded-lg transition-colors flex-shrink-0 ${saved ? 'text-brand-cyan bg-brand-cyan/10' : 'text-gray-400 hover:bg-surface dark:hover:bg-dark-surface'}`}
          title="Save job"
        >
          <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className={`badge ${workModeColors[job.workMode] || 'badge-gray'}`}>{job.workMode}</span>
        <span className={`badge ${typeColors[job.employmentType] || 'badge-gray'}`}>{job.employmentType}</span>
        <span className="badge badge-orange">{job.department}</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
        <span className="flex items-center gap-1"><Briefcase size={11} /> {job.minExperience}–{job.maxExperience} yrs</span>
        <span className="flex items-center gap-1"><Clock size={11} /> {new Date(job.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {job.skills.slice(0, 4).map(s => (
          <span key={s} className="px-2 py-0.5 text-xs bg-surface dark:bg-dark-surface text-gray-600 dark:text-gray-400 rounded-md border border-surface-border dark:border-dark-border">{s}</span>
        ))}
        {job.skills.length > 4 && <span className="px-2 py-0.5 text-xs text-gray-400">+{job.skills.length - 4}</span>}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">{job.description}</p>
      <div className="flex items-center justify-between pt-2 border-t border-surface-border dark:border-dark-border mt-auto">
        <span className="text-sm font-semibold text-brand-charcoal dark:text-white">
          {formatSalary(job.minSalary, job.maxSalary)} <span className="text-xs font-normal text-gray-400">/ year</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{job.applicantCount} applied</span>
          <Link to="/login" className="btn-primary btn-sm">Apply</Link>
        </div>
      </div>
    </div>
  )
}

export default function Jobs() {
  const [search, setSearch] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [modeFilter, setModeFilter] = useState('')
  const [expFilter, setExpFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [visible, setVisible] = useState(9)
  const [showFilters, setShowFilters] = useState(false)

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
  }, [search, locationFilter, modeFilter, expFilter, typeFilter])

  const hasFilters = search || locationFilter || modeFilter || expFilter || typeFilter
  const clearAll = () => { setSearch(''); setLocationFilter(''); setModeFilter(''); setExpFilter(''); setTypeFilter('') }

  return (
    <div className="animate-fade-in">
      {/* Hero search */}
      <div className="bg-brand-charcoal py-14">
        <div className="container-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Find Your Next Opportunity</h1>
          <p className="text-gray-400 mb-7">Browse {jobs.length}+ active jobs across top companies in Chennai and beyond.</p>
          <div className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Job title, skill, or company..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input pl-10 h-12"
                id="job-search-input"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 h-12 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container-xl py-8">
        {/* Filter bar */}
        {showFilters && (
          <div className="card mb-6 flex flex-wrap gap-3 items-end animate-slide-up">
            <div>
              <label className="label">Location</label>
              <input type="text" placeholder="Chennai, Remote..." value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="input w-44" />
            </div>
            <div>
              <label className="label">Work Mode</label>
              <select value={modeFilter} onChange={e => setModeFilter(e.target.value)} className="select w-36">
                <option value="">All modes</option>
                <option value="onsite">Onsite</option>
                <option value="hybrid">Hybrid</option>
                <option value="remote">Remote</option>
              </select>
            </div>
            <div>
              <label className="label">Experience</label>
              <select value={expFilter} onChange={e => setExpFilter(e.target.value)} className="select w-36">
                <option value="">All levels</option>
                <option value="0-2">0–2 years</option>
                <option value="3-5">3–5 years</option>
                <option value="6+">6+ years</option>
              </select>
            </div>
            <div>
              <label className="label">Type</label>
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="select w-36">
                <option value="">All types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            {hasFilters && (
              <button onClick={clearAll} className="btn-ghost btn-sm text-red-500 flex items-center gap-1">
                <X size={14} /> Clear All
              </button>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-semibold text-brand-charcoal dark:text-white">{Math.min(visible, filtered.length)}</span> of <span className="font-semibold">{filtered.length}</span> jobs
            {hasFilters && <span className="ml-2 badge-cyan badge">Filtered</span>}
          </p>
          {hasFilters && <button onClick={clearAll} className="text-xs text-red-500 hover:underline">Clear filters</button>}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-brand-charcoal dark:text-white mb-2">No jobs found</h3>
            <p className="text-gray-400 text-sm mb-4">Try adjusting your search or filters.</p>
            <button onClick={clearAll} className="btn-outline btn-sm">Clear Filters</button>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.slice(0, visible).map(job => <JobCard key={job.id} job={job} />)}
            </div>
            {visible < filtered.length && (
              <div className="text-center mt-8">
                <button onClick={() => setVisible(v => v + 6)} className="btn-outline">
                  Load More <ChevronDown size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
