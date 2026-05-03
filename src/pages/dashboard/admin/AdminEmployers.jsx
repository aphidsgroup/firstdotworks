import { useState } from 'react'
import { Search, Eye, Edit, Building2, Activity, Filter, X, CheckCircle, Plus } from 'lucide-react'
import { employers } from '../../../data/employers'

function RegisterEntityModal({ onClose }) {
  const [success, setSuccess] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => { setSuccess(false); onClose() }, 2000)
  }
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white dark:bg-[#0B0F19] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-glow-cyan w-full max-w-xl flex flex-col relative overflow-hidden animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-dark-bg/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
              <Building2 size={16} />
            </div>
            <h2 className="text-xl font-display font-bold text-brand-charcoal dark:text-white">Register Partner Entity</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-brand-charcoal dark:hover:text-white transition-colors"><X size={18} /></button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-brand-cyan/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-brand-cyan" />
              </div>
              <h3 className="text-xl font-bold dark:text-white mb-2">Entity Initialized!</h3>
              <p className="text-sm text-gray-400">Partner node has been successfully registered in the network.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Entity Name *</label>
                  <input required type="text" placeholder="e.g. Global Logic Systems" className="input bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Industry Vertical</label>
                  <input type="text" placeholder="Information Technology" className="input bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Operational Scale</label>
                  <select className="select bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800">
                    <option value="50-200">50-200 Nodes</option>
                    <option value="200-500">200-500 Nodes</option>
                    <option value="1000+">1000+ Nodes</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Primary Sector</label>
                  <input type="text" placeholder="Chennai, TN" className="input bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Lead Contact</label>
                  <input type="text" placeholder="Name of POC" className="input bg-gray-50 dark:bg-dark-surface border-gray-200 dark:border-gray-800" />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="submit" className="btn-primary shadow-glow-cyan flex-1">Initialize Entity</button>
                <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors uppercase tracking-widest text-[10px]">Abort</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminEmployers() {
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const filtered = employers.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) || e.industry.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        {showModal && <RegisterEntityModal onClose={() => setShowModal(false)} />}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-3">
            <Activity size={14} className="animate-pulse-slow" /> Active Entities
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal dark:text-white tracking-tight">Employer Architecture</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{employers.length} authenticated partner companies</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary shadow-glow-cyan">
          <Plus size={16} className="mr-2" /> Register Partner
        </button>
      </div>

      <div className="card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6 overflow-hidden">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-[250px] max-w-md">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Query entities by name or division..." className="input pl-11 bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20 h-11" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 h-11">
            <Filter size={16} /> Parameters
          </button>
        </div>
        
        <div className="table-wrapper -mx-6 mb-0 border-t border-gray-100 dark:border-gray-800/50">
          <table className="table w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-100 dark:border-gray-800/50">
              <tr>{['Entity Profile', 'Sector Division', 'Location', 'Operations Contact', 'Active Nodes', 'Deployed', 'Status', 'Execute'].map(h => <th key={h} className="th px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">{h}</th>)}</tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-100 dark:divide-gray-800/50">
              {filtered.map(emp => (
                <tr key={emp.id} className="tr-hover hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                  <td className="td px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange text-sm font-bold flex-shrink-0">{emp.name[0]}</div>
                      <div>
                        <p className="font-bold text-brand-charcoal dark:text-white text-sm">{emp.name}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">{emp.size} cycles capacity</p>
                      </div>
                    </div>
                  </td>
                  <td className="td px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{emp.industry}</td>
                  <td className="td px-6 py-4 text-xs font-medium text-gray-400">{emp.city}, {emp.state}</td>
                  <td className="td px-6 py-4 text-xs font-medium text-gray-600 dark:text-gray-300">{emp.contactPerson}</td>
                  <td className="td px-6 py-4 text-sm font-display font-bold text-brand-cyan">{emp.activeJobs}</td>
                  <td className="td px-6 py-4 text-sm font-display font-bold text-brand-orange">{emp.totalHired}</td>
                  <td className="td px-6 py-4"><span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${emp.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'}`}>{emp.status}</span></td>
                  <td className="td px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 rounded-lg hover:bg-brand-cyan/10 text-gray-400 hover:text-brand-cyan transition-colors" title="Inspect"><Eye size={16} /></button>
                      <button className="p-2 rounded-lg hover:bg-brand-orange/10 text-gray-400 hover:text-brand-orange transition-colors" title="Modify"><Edit size={16} /></button>
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
