import { useState, useMemo } from 'react'
import { Search, Eye, FileText, ChevronRight, Activity, Filter, ShieldCheck } from 'lucide-react'
import { candidates, statusColors, statusLabels } from '../../../data/candidates'

const premiumStatusColors = {
  applied: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
  screened: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20',
  shortlisted: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  interview_scheduled: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20',
  selected: 'bg-green-500/10 text-green-500 border-green-500/20',
  rejected: 'bg-red-500/10 text-red-500 border-red-500/20'
}

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
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-3">
            <Activity size={14} className="animate-pulse-slow" /> Network Nodes
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal dark:text-white tracking-tight">Candidate Architecture</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{candidates.length} active verified profiles</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Query identity, operational role, or stack..." className="input pl-11 bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20 h-11" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="relative">
          <select className="select pl-10 pr-10 h-11 bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20 appearance-none font-medium text-sm w-44" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All States</option>
            {stages.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
          </select>
          <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative">
          <input type="text" placeholder="Sector / Location..." className="input pl-4 bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20 h-11 w-40" value={locFilter} onChange={e => setLocFilter(e.target.value)} />
        </div>
        <div className="text-xs font-bold uppercase tracking-wider text-gray-400 py-2 px-4 bg-gray-50 dark:bg-dark-bg rounded-xl border border-gray-100 dark:border-gray-800 self-stretch flex items-center">{filtered.length} nodes matched</div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Candidate list */}
        <div className="lg:col-span-2 card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-0 overflow-hidden">
          <div className="table-wrapper mb-0">
            <table className="table w-full">
              <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-100 dark:border-gray-800/50">
                <tr>{['Identity', 'Role', 'Cycles', 'Sector', 'State', 'Fidelity', ''].map(h => <th key={h} className="th px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">{h}</th>)}</tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-100 dark:divide-gray-800/50">
                {filtered.map(c => (
                  <tr
                    key={c.id}
                    className={`tr-hover cursor-pointer transition-colors ${selected?.id === c.id ? 'bg-brand-cyan/5 dark:bg-brand-cyan/5' : 'hover:bg-gray-50 dark:hover:bg-dark-bg'}`}
                    onClick={() => setSelected(c)}
                  >
                    <td className="td px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan text-sm font-bold flex-shrink-0">
                          {c.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-brand-charcoal dark:text-white text-sm">{c.name}</p>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="td px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-300 max-w-[140px] truncate">{c.role}</td>
                    <td className="td px-6 py-4 text-xs font-medium text-gray-500">{c.experience}y</td>
                    <td className="td px-6 py-4 text-xs font-medium text-gray-400">{c.location}</td>
                    <td className="td px-6 py-4"><span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${premiumStatusColors[c.status]}`}>{statusLabels[c.status]}</span></td>
                    <td className="td px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 bg-gray-100 dark:bg-dark-bg rounded-full h-1.5 overflow-hidden">
                          <div className="h-full rounded-full bg-brand-cyan" style={{ width: `${c.profileStrength}%` }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-brand-cyan">{c.profileStrength}%</span>
                      </div>
                    </td>
                    <td className="td px-6 py-4 text-right"><ChevronRight size={16} className={`transition-transform ${selected?.id === c.id ? 'text-brand-cyan translate-x-1' : 'text-gray-300 dark:text-gray-600'}`} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Candidate detail panel */}
        <div className="card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6 sticky top-6 self-start flex flex-col min-h-[500px]">
          {selected ? (
            <div className="space-y-6 flex-1 flex flex-col animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan text-xl font-bold shadow-glow-cyan">
                  {selected.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-brand-charcoal dark:text-white">{selected.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-1">{selected.role}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${premiumStatusColors[selected.status]}`}>{statusLabels[selected.status]}</span>
                {selected.openToWork && <span className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border bg-brand-orange/10 text-brand-orange border-brand-orange/20"><ShieldCheck size={12} className="inline mr-1 -mt-0.5" /> Available</span>}
              </div>

              <div className="space-y-3 text-sm py-4 border-y border-gray-100 dark:border-gray-800/50">
                <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Cycles Exp</span><span className="font-bold dark:text-white">{selected.experience} years</span></div>
                <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Sector</span><span className="font-bold dark:text-white">{selected.location}</span></div>
                <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Qualification</span><span className="font-bold dark:text-white text-right max-w-[160px] truncate" title={selected.qualification}>{selected.qualification}</span></div>
                <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Expected Comp</span><span className="font-bold text-brand-cyan">₹{(selected.expectedSalary / 100000).toFixed(1)}L/yr</span></div>
                <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Notice Period</span><span className="font-bold dark:text-white">{selected.noticePeriod} days</span></div>
                <div className="flex justify-between items-center"><span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Data Node</span><span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${selected.resumeAvailable ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{selected.resumeAvailable ? 'Secured' : 'Missing'}</span></div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Stack Competencies</p>
                <div className="flex flex-wrap gap-2">
                  {selected.skills.map(s => <span key={s} className="px-2 py-1 rounded bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 text-[10px] font-bold uppercase tracking-wider">{s}</span>)}
                </div>
              </div>

              <div className="mt-auto pt-6">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Shift State</label>
                <select className="select w-full mb-4 bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 text-xs font-bold uppercase tracking-wider h-11">
                  {stages.map(s => <option key={s} value={s} selected={s === selected.status}>{statusLabels[s]}</option>)}
                </select>

                <div className="flex gap-3">
                  <button className="btn-primary shadow-glow-cyan flex-1 justify-center text-xs">Route</button>
                  <button className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-1 text-xs text-center uppercase tracking-wider">Log Note</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
              <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-gray-800 flex items-center justify-center mb-4">
                <FileText size={24} className="text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-sm font-medium">Select a node to inspect architecture</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
