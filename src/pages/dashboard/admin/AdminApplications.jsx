import { useState } from 'react'
import { Search, Filter, Activity, Download, CheckSquare, Square, ShieldCheck, Trash2, X } from 'lucide-react'
import { applications } from '../../../data/applications'
import { candidates, statusColors, statusLabels } from '../../../data/candidates'
import { jobs } from '../../../data/jobs'
import DataPortal from '../../../components/DataPortal'

const APP_COLUMNS = [
  { label: 'Candidate Name', accessor: a => candidates.find(c => c.id === a.candidateId)?.name || a.candidateId },
  { label: 'Role Applied', accessor: a => candidates.find(c => c.id === a.candidateId)?.role || '' },
  { label: 'Job Title', accessor: a => jobs.find(j => j.id === a.jobId)?.title || a.jobId },
  { label: 'Company', accessor: a => jobs.find(j => j.id === a.jobId)?.company || '' },
  { label: 'Applied On', accessor: a => new Date(a.appliedAt).toLocaleDateString('en-IN') },
  { label: 'Status', accessor: a => statusLabels[a.status] || a.status },
  { label: 'Recruiter Note', accessor: 'recruiterNote' },
]

const premiumStatusColors = {
  applied: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
  screened: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20',
  shortlisted: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  interview_scheduled: 'bg-brand-orange/10 text-brand-orange border-brand-orange/20',
  selected: 'bg-green-500/10 text-green-500 border-green-500/20',
  rejected: 'bg-red-500/10 text-red-500 border-red-500/20'
}

export default function AdminApplications() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedIds, setSelectedIds] = useState([])

  const filtered = applications.filter(a => {
    const cand = candidates.find(c => c.id === a.candidateId)
    const job = jobs.find(j => j.id === a.jobId)
    const q = search.toLowerCase()
    const matchQ = !q || cand?.name.toLowerCase().includes(q) || job?.title.toLowerCase().includes(q)
    const matchStatus = !statusFilter || a.status === statusFilter
    return matchQ && matchStatus
  })

  const stages = ['applied', 'screened', 'shortlisted', 'interview_scheduled', 'selected', 'rejected']

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filtered.map(a => a.id))
    }
  }

  const toggleSelect = (id, e) => {
    e.stopPropagation()
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const handleBulkExport = () => {
    const selectedData = applications.filter(a => selectedIds.includes(a.id))
    const headers = APP_COLUMNS.map(col => col.label).join(',')
    const rows = selectedData.map(a => 
      APP_COLUMNS.map(col => {
        const val = typeof col.accessor === 'function' ? col.accessor(a) : a[col.accessor]
        return `"${val}"`
      }).join(',')
    ).join('\n')
    
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`
    const link = document.createElement('a')
    link.setAttribute('href', encodeURI(csvContent))
    link.setAttribute('download', 'applications_export.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleBulkDelete = () => {
    if (window.confirm(`Remove ${selectedIds.length} application nodes?`)) {
      alert(`Simulated removal of Application IDs: ${selectedIds.join(', ')}`)
      setSelectedIds([])
    }
  }

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-3">
            <Activity size={14} className="animate-pulse-slow" /> Network Pipeline
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal dark:text-white tracking-tight">Transmission Flow</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{applications.length} total active nodes tracked</p>
        </div>
        <DataPortal title="Application Pipeline" rows={applications} columns={APP_COLUMNS} />
      </div>

      <div className="card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6 overflow-hidden">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 min-w-[250px]">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Query nodes by candidate or mandate..." className="input pl-11 bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 focus:border-brand-orange/50 focus:ring-brand-orange/20 h-11" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="relative">
            <select className="select pl-10 pr-10 h-11 bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 focus:border-brand-orange/50 focus:ring-brand-orange/20 appearance-none font-medium text-sm" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="">All Sequences</option>
              {stages.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
            </select>
            <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-gray-400 py-2 px-4 bg-gray-50 dark:bg-dark-bg rounded-xl border border-gray-100 dark:border-gray-800 self-stretch flex items-center">{filtered.length} matches</div>
        </div>

        <div className="table-wrapper -mx-6 mb-0 border-t border-gray-100 dark:border-gray-800/50">
          <table className="table w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-100 dark:border-gray-800/50">
              <tr>
                <th className="th px-6 py-3 w-10">
                  <button onClick={toggleSelectAll} className="text-gray-400 hover:text-brand-orange transition-colors">
                    {selectedIds.length === filtered.length && filtered.length > 0 ? <CheckSquare size={16} /> : <Square size={16} />}
                  </button>
                </th>
                {['Node Identifier', 'Target Mandate', 'Timestamp', 'Status', 'Ops Note', 'Action'].map(h => (
                  <th key={h} className="th px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-100 dark:divide-gray-800/50">
              {filtered.map(a => {
                const cand = candidates.find(c => c.id === a.candidateId)
                const job = jobs.find(j => j.id === a.jobId)
                return (
                  <tr key={a.id} className={`tr-hover transition-colors ${selectedIds.includes(a.id) ? 'bg-brand-orange/5' : 'hover:bg-gray-50 dark:hover:bg-dark-bg'}`}>
                    <td className="td px-6 py-4">
                      <button onClick={(e) => toggleSelect(a.id, e)} className={`${selectedIds.includes(a.id) ? 'text-brand-orange' : 'text-gray-300 dark:text-gray-600'} hover:text-brand-orange transition-colors`}>
                        {selectedIds.includes(a.id) ? <CheckSquare size={16} /> : <Square size={16} />}
                      </button>
                    </td>
                    <td className="td px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan text-sm font-bold flex-shrink-0">{cand?.name[0]}</div>
                        <div>
                          <p className="text-sm font-bold text-brand-charcoal dark:text-white">{cand?.name}</p>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{cand?.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="td px-6 py-4">
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{job?.title}</p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{job?.company}</p>
                    </td>
                    <td className="td px-6 py-4 text-xs font-medium text-gray-400">{new Date(a.appliedAt).toLocaleDateString('en-IN')}</td>
                    <td className="td px-6 py-4"><span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${premiumStatusColors[a.status]}`}>{statusLabels[a.status]}</span></td>
                    <td className="td px-6 py-4 text-xs font-medium text-gray-500 max-w-[200px] truncate">{a.recruiterNote || '—'}</td>
                    <td className="td px-6 py-4">
                      <div className="flex items-center gap-2">
                        <select className="select text-[10px] font-bold uppercase tracking-wider py-1.5 h-9 bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 w-32">
                          {stages.map(s => <option key={s} value={s} selected={s === a.status}>{statusLabels[s]}</option>)}
                        </select>
                        <button className="h-9 px-3 rounded-lg bg-brand-orange/10 text-brand-orange border border-brand-orange/20 text-[10px] font-bold uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all">Sync</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Action Toolbar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-brand-charcoal dark:bg-white text-white dark:text-brand-charcoal px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-6 animate-slide-up border border-white/10 dark:border-brand-charcoal/10">
          <div className="flex items-center gap-3 pr-6 border-r border-white/20 dark:border-brand-charcoal/20">
            <span className="text-sm font-bold">{selectedIds.length} nodes selected</span>
            <button onClick={() => setSelectedIds([])} className="p-1 hover:bg-white/10 dark:hover:bg-brand-charcoal/10 rounded-lg transition-colors"><X size={16} /></button>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={handleBulkExport} className="flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-brand-charcoal/10 hover:bg-white/20 dark:hover:bg-brand-charcoal/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
              <Download size={14} /> Export CSV
            </button>
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-brand-charcoal/10 hover:bg-white/20 dark:hover:bg-brand-charcoal/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">
                <ShieldCheck size={14} /> Transition
              </button>
              <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-48 bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 rounded-xl shadow-xl p-2 text-brand-charcoal dark:text-white">
                 {stages.map(s => (
                   <button key={s} onClick={() => { alert(`Bulk transitioned ${selectedIds.length} to ${s}`); setSelectedIds([]) }} className="w-full text-left px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors">{statusLabels[s]}</button>
                 ))}
              </div>
            </div>
            <button onClick={handleBulkDelete} className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-rose-500/20">
              <Trash2 size={14} /> Remove Nodes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
