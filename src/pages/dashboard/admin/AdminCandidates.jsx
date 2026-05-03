import { useState, useMemo } from 'react'
import { Search, Eye, FileText, Tag, ChevronRight } from 'lucide-react'
import { candidates, statusColors, statusLabels } from '../../../data/candidates'

const stages = ['applied', 'screened', 'shortlisted', 'interview_scheduled', 'selected', 'rejected']

export default function AdminCandidates() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [locFilter, setLocFilter] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    return candidates.filter(c => {
      const q = search.toLowerCase()
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q) || c.skills.some(s => s.toLowerCase().includes(q))
      const matchStatus = !statusFilter || c.status === statusFilter
      const matchLoc = !locFilter || c.location.toLowerCase().includes(locFilter.toLowerCase())
      return matchQ && matchStatus && matchLoc
    })
  }, [search, statusFilter, locFilter])

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-brand-charcoal dark:text-white">Candidate Management</h1>
        <p className="text-sm text-gray-400">{candidates.length} total candidates in database</p>
      </div>

      {/* Filters */}
      <div className="card flex flex-wrap gap-3 items-end">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by name, role, or skill..." className="input pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div>
          <label className="label">Status</label>
          <select className="select w-40" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All statuses</option>
            {stages.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Location</label>
          <input type="text" placeholder="Chennai..." className="input w-36" value={locFilter} onChange={e => setLocFilter(e.target.value)} />
        </div>
        <div className="text-sm text-gray-400">{filtered.length} results</div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Candidate list */}
        <div className="lg:col-span-2 card overflow-hidden p-0">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>{['Candidate', 'Role', 'Experience', 'Location', 'Status', 'Strength', ''].map(h => <th key={h} className="th">{h}</th>)}</tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-card divide-y divide-surface-border dark:divide-dark-border">
                {filtered.map(c => (
                  <tr
                    key={c.id}
                    className={`tr-hover cursor-pointer ${selected?.id === c.id ? 'bg-brand-cyan/5' : ''}`}
                    onClick={() => setSelected(c)}
                  >
                    <td className="td">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-brand-cyan/15 flex items-center justify-center text-brand-cyan text-xs font-bold flex-shrink-0">
                          {c.name[0]}
                        </div>
                        <div>
                          <p className="font-medium text-brand-charcoal dark:text-white text-sm">{c.name}</p>
                          <p className="text-xs text-gray-400">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="td text-sm text-gray-600 dark:text-gray-300 max-w-[120px] truncate">{c.role}</td>
                    <td className="td text-sm text-gray-500">{c.experience}y</td>
                    <td className="td text-xs text-gray-400">{c.location}</td>
                    <td className="td"><span className={`badge ${statusColors[c.status]}`}>{statusLabels[c.status]}</span></td>
                    <td className="td">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-100 dark:bg-dark-surface rounded-full h-1.5">
                          <div className="h-1.5 rounded-full bg-brand-cyan" style={{ width: `${c.profileStrength}%` }}></div>
                        </div>
                        <span className="text-xs text-gray-400">{c.profileStrength}%</span>
                      </div>
                    </td>
                    <td className="td"><ChevronRight size={14} className="text-gray-300" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Candidate detail panel */}
        <div className="card">
          {selected ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-cyan/15 flex items-center justify-center text-brand-cyan text-lg font-bold">
                  {selected.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-brand-charcoal dark:text-white">{selected.name}</h3>
                  <p className="text-sm text-gray-400">{selected.role}</p>
                </div>
              </div>
              <span className={`badge ${statusColors[selected.status]}`}>{statusLabels[selected.status]}</span>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-400">Experience</span><span className="font-medium dark:text-gray-200">{selected.experience} years</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Location</span><span className="font-medium dark:text-gray-200">{selected.location}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Qualification</span><span className="font-medium dark:text-gray-200 text-right max-w-[140px]">{selected.qualification}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Expected CTC</span><span className="font-medium text-brand-cyan">₹{(selected.expectedSalary / 100000).toFixed(1)}L</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Notice Period</span><span className="font-medium dark:text-gray-200">{selected.noticePeriod} days</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Resume</span><span className={selected.resumeAvailable ? 'text-green-500 font-medium' : 'text-red-400'}>{selected.resumeAvailable ? '✓ Available' : '✗ Not uploaded'}</span></div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-2 font-medium">Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.skills.map(s => <span key={s} className="badge badge-gray text-xs">{s}</span>)}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-2 font-medium">Profile Strength</p>
                <div className="bg-gray-100 dark:bg-dark-surface rounded-full h-2">
                  <div className="h-2 rounded-full bg-brand-cyan transition-all" style={{ width: `${selected.profileStrength}%` }}></div>
                </div>
                <p className="text-xs text-right mt-1 text-brand-cyan font-semibold">{selected.profileStrength}%</p>
              </div>

              <div>
                <label className="label text-xs">Move to Stage</label>
                <select className="select text-sm">
                  {stages.map(s => <option key={s} value={s} selected={s === selected.status}>{statusLabels[s]}</option>)}
                </select>
              </div>

              <div className="flex gap-2">
                <button className="btn-primary btn-sm flex-1">Shortlist</button>
                <button className="btn-ghost btn-sm text-gray-500 border border-surface-border dark:border-dark-border flex-1">Note</button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Eye size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Click a candidate to view profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
