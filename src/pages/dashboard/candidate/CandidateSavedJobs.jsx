import { useState } from 'react'
import { Bookmark, MapPin, Briefcase, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { jobs, formatSalary } from '../../../data/jobs'
import { candidates } from '../../../data/candidates'

const me = candidates[0]

export default function CandidateSavedJobs() {
  const [saved, setSaved] = useState(new Set(me.savedJobs))
  const savedJobs = jobs.filter(j => saved.has(j.id))

  const unsave = (id) => {
    const s = new Set(saved)
    s.delete(id)
    setSaved(s)
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-brand-charcoal dark:text-white">Saved Jobs</h1>
        <p className="text-sm text-gray-400">{saved.size} jobs saved to your watchlist</p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="card text-center py-16">
          <Bookmark size={36} className="mx-auto mb-4 text-gray-200" />
          <h3 className="text-lg font-semibold text-brand-charcoal dark:text-white mb-2">No saved jobs</h3>
          <p className="text-sm text-gray-400 mb-5">Start browsing and save jobs you're interested in</p>
          <Link to="/jobs" className="btn-primary btn-sm">Browse Jobs <ArrowRight size={15} /></Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobs.map(job => (
            <div key={job.id} className="card flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-semibold text-brand-charcoal dark:text-white text-sm">{job.title}</h4>
                  <p className="text-xs text-gray-400">{job.company}</p>
                </div>
                <button
                  onClick={() => unsave(job.id)}
                  className="text-brand-cyan p-1.5 rounded-lg hover:bg-brand-cyan/10 transition-colors flex-shrink-0"
                  title="Remove from saved"
                >
                  <Bookmark size={15} fill="currentColor" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-cyan text-xs">{job.workMode}</span>
                <span className="badge badge-orange text-xs">{job.department}</span>
              </div>
              <div className="text-xs text-gray-500 space-y-1">
                <div className="flex items-center gap-1"><MapPin size={11} /> {job.location}</div>
                <div className="flex items-center gap-1"><Briefcase size={11} /> {job.minExperience}–{job.maxExperience} years exp</div>
              </div>
              <div className="text-sm font-semibold text-brand-charcoal dark:text-white">
                {formatSalary(job.minSalary, job.maxSalary)}<span className="text-xs font-normal text-gray-400"> /yr</span>
              </div>
              <div className="flex gap-2 mt-auto pt-2 border-t border-surface-border dark:border-dark-border">
                <Link to="/login" className="btn-primary btn-sm flex-1 justify-center text-xs">Apply Now</Link>
                <button onClick={() => unsave(job.id)} className="btn-ghost btn-sm text-red-400 text-xs border border-red-100 dark:border-red-900/20">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center pt-4">
        <Link to="/jobs" className="btn-outline btn-sm">Discover More Jobs <ArrowRight size={15} /></Link>
      </div>
    </div>
  )
}
