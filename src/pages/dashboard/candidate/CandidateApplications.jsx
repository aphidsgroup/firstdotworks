import { jobs } from '../../../data/jobs'
import { candidates, statusColors, statusLabels } from '../../../data/candidates'

const me = candidates[0]
const appliedJobs = jobs.filter(j => me.appliedJobs.includes(j.id))

const stages = ['applied', 'screened', 'shortlisted', 'interview_scheduled', 'selected']

export default function CandidateApplications() {
  const appStatus = me.status

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-brand-charcoal dark:text-white">My Applications</h1>
        <p className="text-sm text-gray-400">{appliedJobs.length} applications submitted</p>
      </div>

      {/* Pipeline stages */}
      <div className="card">
        <p className="text-sm font-semibold text-brand-charcoal dark:text-white mb-4">Application Pipeline</p>
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hidden">
          {stages.map((s, i) => {
            const stageIndex = stages.indexOf(appStatus)
            const isActive = i === stageIndex
            const isDone = i < stageIndex
            return (
              <div key={s} className="flex items-center gap-1 flex-shrink-0">
                <div className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive ? 'bg-brand-cyan text-white' :
                  isDone ? 'bg-green-500 text-white' :
                  'bg-gray-100 dark:bg-dark-surface text-gray-400'
                }`}>
                  {statusLabels[s]}
                </div>
                {i < stages.length - 1 && (
                  <div className={`w-4 h-px flex-shrink-0 ${isDone ? 'bg-green-400' : 'bg-gray-200 dark:bg-dark-border'}`}></div>
                )}
              </div>
            )
          })}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Current status: <span className={`badge ${statusColors[appStatus]} ml-1`}>{statusLabels[appStatus]}</span>
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {appliedJobs.map(job => (
          <div key={job.id} className="card">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan font-bold flex-shrink-0">
                {job.company[0]}
              </div>
              <span className={`badge ${statusColors[me.status]} flex-shrink-0`}>{statusLabels[me.status]}</span>
            </div>
            <h4 className="font-semibold text-brand-charcoal dark:text-white text-sm mb-1">{job.title}</h4>
            <p className="text-xs text-gray-400 mb-3">{job.company} · {job.location}</p>
            <div className="space-y-1 text-xs text-gray-500">
              <div className="flex justify-between"><span>Work Mode</span><span className="capitalize">{job.workMode}</span></div>
              <div className="flex justify-between"><span>Salary</span><span>₹{(job.minSalary/100000).toFixed(0)}L – ₹{(job.maxSalary/100000).toFixed(0)}L</span></div>
              <div className="flex justify-between"><span>Applied</span><span>Apr 2026</span></div>
            </div>
            <div className="mt-3 pt-3 border-t border-surface-border dark:border-dark-border flex gap-2">
              <button className="btn-ghost btn-sm text-xs flex-1 border border-surface-border dark:border-dark-border">View Job</button>
              <button className="btn-ghost btn-sm text-xs text-red-400 flex-1">Withdraw</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
