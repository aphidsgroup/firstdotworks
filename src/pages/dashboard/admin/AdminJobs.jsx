import { useState } from 'react'
import { Plus, Edit, Eye, Trash2, Search, Filter, X, CheckCircle } from 'lucide-react'
import { jobs, formatSalary } from '../../../data/jobs'

const statusColors = { published: 'badge-green', draft: 'badge-gray', closed: 'badge-red' }

function JobPostingModal({ onClose }) {
  const [form, setForm] = useState({ title: '', company: '', location: '', minExp: '', maxExp: '', minSalary: '', maxSalary: '', type: 'full-time', mode: 'hybrid', department: '', skills: '', description: '', openings: 1, deadline: '' })
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => { setSuccess(false); onClose() }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-card-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-surface-border dark:border-dark-border">
          <h2 className="text-lg font-bold text-brand-charcoal dark:text-white">Post New Job</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface dark:hover:bg-dark-surface text-gray-400"><X size={18} /></button>
        </div>
        {success ? (
          <div className="p-12 text-center">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-brand-charcoal dark:text-white mb-1">Job Posted!</h3>
            <p className="text-sm text-gray-400">The job listing is now live.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="label">Job Title *</label>
                <input required type="text" placeholder="e.g. Senior React Developer" className="input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              </div>
              <div>
                <label className="label">Company Name *</label>
                <input required type="text" placeholder="Company" className="input" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
              </div>
              <div>
                <label className="label">Location *</label>
                <input required type="text" placeholder="Chennai, Tamil Nadu" className="input" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
              </div>
              <div>
                <label className="label">Min Experience (yrs)</label>
                <input type="number" min="0" placeholder="0" className="input" value={form.minExp} onChange={e => setForm({...form, minExp: e.target.value})} />
              </div>
              <div>
                <label className="label">Max Experience (yrs)</label>
                <input type="number" min="0" placeholder="5" className="input" value={form.maxExp} onChange={e => setForm({...form, maxExp: e.target.value})} />
              </div>
              <div>
                <label className="label">Min Salary (₹/yr)</label>
                <input type="number" placeholder="600000" className="input" value={form.minSalary} onChange={e => setForm({...form, minSalary: e.target.value})} />
              </div>
              <div>
                <label className="label">Max Salary (₹/yr)</label>
                <input type="number" placeholder="1000000" className="input" value={form.maxSalary} onChange={e => setForm({...form, maxSalary: e.target.value})} />
              </div>
              <div>
                <label className="label">Employment Type</label>
                <select className="select" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="label">Work Mode</label>
                <select className="select" value={form.mode} onChange={e => setForm({...form, mode: e.target.value})}>
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
              <div>
                <label className="label">Department</label>
                <input type="text" placeholder="Engineering" className="input" value={form.department} onChange={e => setForm({...form, department: e.target.value})} />
              </div>
              <div>
                <label className="label">Number of Openings</label>
                <input type="number" min="1" className="input" value={form.openings} onChange={e => setForm({...form, openings: e.target.value})} />
              </div>
              <div>
                <label className="label">Application Deadline</label>
                <input type="date" className="input" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Skills Required (comma-separated)</label>
                <input type="text" placeholder="React, TypeScript, Node.js" className="input" value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Job Description *</label>
                <textarea required rows={4} className="input resize-none" placeholder="Describe the role, responsibilities, and requirements..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary">Post Job</button>
              <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            </div>
          </form>
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
    <div className="space-y-5 animate-fade-in">
      {showModal && <JobPostingModal onClose={() => setShowModal(false)} />}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal dark:text-white">Job Management</h1>
          <p className="text-sm text-gray-400">All job postings across clients</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary btn-sm" id="admin-post-job-btn">
          <Plus size={16} /> Post New Job
        </button>
      </div>

      <div className="card">
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search jobs..." className="input pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>{['Job Title', 'Company', 'Location', 'Type', 'Salary', 'Applicants', 'Status', 'Actions'].map(h => <th key={h} className="th">{h}</th>)}</tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-card divide-y divide-surface-border dark:divide-dark-border">
              {filtered.map(job => (
                <tr key={job.id} className="tr-hover">
                  <td className="td">
                    <div>
                      <p className="font-medium text-brand-charcoal dark:text-white text-sm">{job.title}</p>
                      <p className="text-xs text-gray-400">{job.department}</p>
                    </div>
                  </td>
                  <td className="td text-sm text-gray-600 dark:text-gray-300">{job.company}</td>
                  <td className="td text-xs text-gray-400">{job.location}</td>
                  <td className="td"><span className="badge badge-cyan text-xs">{job.workMode}</span></td>
                  <td className="td text-sm font-medium text-brand-charcoal dark:text-white">{formatSalary(job.minSalary, job.maxSalary)}</td>
                  <td className="td text-sm text-brand-orange font-semibold">{job.applicantCount}</td>
                  <td className="td"><span className={`badge ${statusColors[job.status] || 'badge-gray'}`}>{job.status}</span></td>
                  <td className="td">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded hover:bg-surface dark:hover:bg-dark-surface text-gray-400 hover:text-brand-cyan transition-colors"><Eye size={14} /></button>
                      <button className="p-1.5 rounded hover:bg-surface dark:hover:bg-dark-surface text-gray-400 hover:text-brand-orange transition-colors"><Edit size={14} /></button>
                      <button className="p-1.5 rounded hover:bg-surface dark:hover:bg-dark-surface text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
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
