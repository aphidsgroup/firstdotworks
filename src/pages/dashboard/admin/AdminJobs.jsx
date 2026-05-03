import { useState } from 'react'
import { Plus, Edit, Eye, Trash2, Search, Filter, X, CheckCircle, Briefcase, Activity } from 'lucide-react'
import { jobs, formatSalary } from '../../../data/jobs'

const statusColors = { published: 'bg-green-500/10 text-green-500 border-green-500/20', draft: 'bg-gray-500/10 text-gray-500 border-gray-500/20', closed: 'bg-red-500/10 text-red-500 border-red-500/20' }

function JobPostingModal({ onClose }) {
  const [form, setForm] = useState({ title: '', company: '', location: '', minExp: '', maxExp: '', minSalary: '', maxSalary: '', type: 'full-time', mode: 'hybrid', department: '', skills: '', description: '', openings: 1, deadline: '' })
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => { setSuccess(false); onClose() }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white dark:bg-[#0B0F19] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-glow-cyan w-full max-w-3xl max-h-[90vh] flex flex-col relative overflow-hidden">
        {/* Background Network Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-hero-pattern pointer-events-none"></div>

        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 relative z-10 bg-white/50 dark:bg-dark-bg/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
              <Briefcase size={16} />
            </div>
            <h2 className="text-xl font-display font-bold text-brand-charcoal dark:text-white">Initialize Mandate</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-brand-charcoal dark:hover:text-white transition-colors"><X size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 relative z-10 custom-scrollbar">
          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-brand-cyan/10 flex items-center justify-center mb-6">
                <CheckCircle size={40} className="text-brand-cyan" />
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-charcoal dark:text-white mb-2">Mandate Published!</h3>
              <p className="text-gray-400">The job listing has been successfully broadcasted to the network.</p>
            </div>
          ) : (
            <form id="job-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Role Designation *</label>
                  <input required type="text" placeholder="e.g. Senior React Node" className="input bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Entity Name *</label>
                  <input required type="text" placeholder="Company" className="input bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Mandate Location *</label>
                  <input required type="text" placeholder="Chennai, TN" className="input bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Min Exp (Cycles)</label>
                  <input type="number" min="0" placeholder="0" className="input bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20" value={form.minExp} onChange={e => setForm({...form, minExp: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Max Exp (Cycles)</label>
                  <input type="number" min="0" placeholder="5" className="input bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20" value={form.maxExp} onChange={e => setForm({...form, maxExp: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Base Comp (₹/yr)</label>
                  <input type="number" placeholder="600000" className="input bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20" value={form.minSalary} onChange={e => setForm({...form, minSalary: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Ceiling Comp (₹/yr)</label>
                  <input type="number" placeholder="1000000" className="input bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20" value={form.maxSalary} onChange={e => setForm({...form, maxSalary: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Contract Type</label>
                  <select className="select bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Operational Mode</label>
                  <select className="select bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20" value={form.mode} onChange={e => setForm({...form, mode: e.target.value})}>
                    <option value="onsite">On-site</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Division</label>
                  <input type="text" placeholder="Engineering" className="input bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20" value={form.department} onChange={e => setForm({...form, department: e.target.value})} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Capacity</label>
                  <input type="number" min="1" className="input bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20" value={form.openings} onChange={e => setForm({...form, openings: e.target.value})} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Stack Requirements (csv)</label>
                  <input type="text" placeholder="React, TypeScript, Node.js" className="input bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20" value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Operational Brief *</label>
                  <textarea required rows={5} className="input resize-none bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20" placeholder="Detail the mandate parameters..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                </div>
              </div>
            </form>
          )}
        </div>
        
        {!success && (
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-dark-bg/50 backdrop-blur-md relative z-10 flex gap-3 justify-end">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Abort</button>
            <button type="submit" form="job-form" className="btn-primary shadow-glow-cyan px-8">Publish Mandate</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminJobs() {
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const filtered = jobs.filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {showModal && <JobPostingModal onClose={() => setShowModal(false)} />}

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-3">
            <Activity size={14} className="animate-pulse-slow" /> Active Mandates
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal dark:text-white tracking-tight">Job Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">Control center for all active hiring mandates</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary shadow-glow-cyan" id="admin-post-job-btn">
          <Plus size={18} className="mr-2" /> Initialize Mandate
        </button>
      </div>

      <div className="card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6 overflow-hidden">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-[250px]">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Query mandates by role or entity..." className="input pl-11 bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20 h-11" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 h-11">
            <Filter size={16} /> Parameters
          </button>
        </div>
        
        <div className="table-wrapper -mx-6 mb-0 border-t border-gray-100 dark:border-gray-800/50">
          <table className="table w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-100 dark:border-gray-800/50">
              <tr>
                {['Role ID', 'Entity', 'Sector', 'Mode', 'Compensation', 'Nodes', 'Status', 'Execute'].map(h => (
                  <th key={h} className="th px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-100 dark:divide-gray-800/50">
              {filtered.map(job => (
                <tr key={job.id} className="tr-hover hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                  <td className="td px-6 py-4">
                    <div>
                      <p className="font-bold text-brand-charcoal dark:text-white text-sm">{job.title}</p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{job.department}</p>
                    </div>
                  </td>
                  <td className="td px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-300">{job.company}</td>
                  <td className="td px-6 py-4 text-xs font-medium text-gray-400">{job.location}</td>
                  <td className="td px-6 py-4"><span className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wider border border-gray-200 dark:border-gray-700">{job.workMode}</span></td>
                  <td className="td px-6 py-4 text-sm font-bold text-brand-charcoal dark:text-white">{formatSalary(job.minSalary, job.maxSalary)}</td>
                  <td className="td px-6 py-4 text-sm text-brand-orange font-display font-bold">{job.applicantCount}</td>
                  <td className="td px-6 py-4"><span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${statusColors[job.status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>{job.status}</span></td>
                  <td className="td px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 rounded-lg hover:bg-brand-cyan/10 text-gray-400 hover:text-brand-cyan transition-colors" title="Inspect"><Eye size={16} /></button>
                      <button className="p-2 rounded-lg hover:bg-brand-orange/10 text-gray-400 hover:text-brand-orange transition-colors" title="Modify"><Edit size={16} /></button>
                      <button className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors" title="Terminate"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
