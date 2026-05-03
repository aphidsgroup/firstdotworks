import { useState } from 'react'
import { Search, Eye, Edit, Building2 } from 'lucide-react'
import { employers } from '../../../data/employers'

export default function AdminEmployers() {
  const [search, setSearch] = useState('')
  const filtered = employers.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) || e.industry.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal dark:text-white">Employer Accounts</h1>
          <p className="text-sm text-gray-400">{employers.length} registered companies</p>
        </div>
        <button className="btn-primary btn-sm"><Building2 size={15} /> Add Company</button>
      </div>

      <div className="card">
        <div className="mb-4 max-w-sm relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search companies..." className="input pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead><tr>{['Company', 'Industry', 'Location', 'Contact', 'Active Jobs', 'Hired', 'Status', 'Actions'].map(h => <th key={h} className="th">{h}</th>)}</tr></thead>
            <tbody className="bg-white dark:bg-dark-card divide-y divide-surface-border dark:divide-dark-border">
              {filtered.map(emp => (
                <tr key={emp.id} className="tr-hover">
                  <td className="td">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-brand-orange/15 flex items-center justify-center text-brand-orange text-xs font-bold">{emp.name[0]}</div>
                      <div>
                        <p className="font-medium text-brand-charcoal dark:text-white text-sm">{emp.name}</p>
                        <p className="text-xs text-gray-400">{emp.size} employees</p>
                      </div>
                    </div>
                  </td>
                  <td className="td text-sm text-gray-600 dark:text-gray-300">{emp.industry}</td>
                  <td className="td text-xs text-gray-400">{emp.city}, {emp.state}</td>
                  <td className="td text-sm text-gray-500">{emp.contactPerson}</td>
                  <td className="td text-sm font-semibold text-brand-cyan">{emp.activeJobs}</td>
                  <td className="td text-sm font-semibold text-brand-orange">{emp.totalHired}</td>
                  <td className="td"><span className={`badge ${emp.status === 'active' ? 'badge-green' : 'badge-gray'}`}>{emp.status}</span></td>
                  <td className="td">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded hover:bg-surface dark:hover:bg-dark-surface text-gray-400 hover:text-brand-cyan transition-colors"><Eye size={14} /></button>
                      <button className="p-1.5 rounded hover:bg-surface dark:hover:bg-dark-surface text-gray-400 hover:text-brand-orange transition-colors"><Edit size={14} /></button>
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
