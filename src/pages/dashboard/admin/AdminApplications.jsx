import { useState } from 'react'
import { Search } from 'lucide-react'
import { applications } from '../../../data/applications'
import { candidates, statusColors, statusLabels } from '../../../data/candidates'
import { jobs } from '../../../data/jobs'

export default function AdminApplications() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = applications.filter(a => {
    const cand = candidates.find(c => c.id === a.candidateId)
    const job = jobs.find(j => j.id === a.jobId)
    const q = search.toLowerCase()
    const matchQ = !q || cand?.name.toLowerCase().includes(q) || job?.title.toLowerCase().includes(q)
    const matchStatus = !statusFilter || a.status === statusFilter
    return matchQ && matchStatus
  })

  const stages = ['applied', 'screened', 'shortlisted', 'interview_scheduled', 'selected', 'rejected']

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-brand-charcoal dark:text-white">Applications</h1>
        <p className="text-sm text-gray-400">{applications.length} total applications</p>
      </div>

      <div className="card flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by candidate or job..." className="input pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="select w-44" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          {stages.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
        </select>
        <div className="text-sm text-gray-400 self-center">{filtered.length} results</div>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="table-wrapper">
          <table className="table">
            <thead><tr>{['Candidate', 'Job', 'Applied', 'Status', 'Recruiter Note', 'Action'].map(h => <th key={h} className="th">{h}</th>)}</tr></thead>
            <tbody className="bg-white dark:bg-dark-card divide-y divide-surface-border dark:divide-dark-border">
              {filtered.map(a => {
                const cand = candidates.find(c => c.id === a.candidateId)
                const job = jobs.find(j => j.id === a.jobId)
                return (
                  <tr key={a.id} className="tr-hover">
                    <td className="td">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-brand-cyan/15 flex items-center justify-center text-brand-cyan text-xs font-bold flex-shrink-0">{cand?.name[0]}</div>
                        <div>
                          <p className="text-sm font-medium text-brand-charcoal dark:text-white">{cand?.name}</p>
                          <p className="text-xs text-gray-400">{cand?.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="td">
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{job?.title}</p>
                      <p className="text-xs text-gray-400">{job?.company}</p>
                    </td>
                    <td className="td text-xs text-gray-400">{new Date(a.appliedAt).toLocaleDateString('en-IN')}</td>
                    <td className="td"><span className={`badge ${statusColors[a.status]}`}>{statusLabels[a.status]}</span></td>
                    <td className="td text-xs text-gray-500 max-w-[180px] truncate">{a.recruiterNote || '—'}</td>
                    <td className="td">
                      <select className="select text-xs py-1 h-8 w-36">
                        {stages.map(s => <option key={s} value={s} selected={s === a.status}>{statusLabels[s]}</option>)}
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
