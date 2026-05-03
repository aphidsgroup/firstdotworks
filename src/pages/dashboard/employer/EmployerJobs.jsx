import { useState } from 'react'
import { Plus, Edit, Eye, X, CheckCircle } from 'lucide-react'
import { jobs, formatSalary } from '../../../data/jobs'

const compJobs = jobs.filter(j => j.companyId === 'comp_001')

function PostJobModal({ onClose }) {
  const [form, setForm] = useState({ title: '', location: '', minExp: '', maxExp: '', type: 'full-time', mode: 'hybrid', skills: '', description: '', openings: 1, deadline: '' })
  const [success, setSuccess] = useState(false)
  const handleSubmit = (e) => { e.preventDefault(); setSuccess(true); setTimeout(() => { setSuccess(false); onClose() }, 2000) }
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-card-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-surface-border dark:border-dark-border">
          <h2 className="text-lg font-bold text-brand-charcoal dark:text-white text-center w-full uppercase tracking-widest text-[14px]">Initialize New Mandate</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface text-gray-400"><X size={18} /></button>
        </div>
        {success ? (
          <div className="p-12 text-center shadow-glow-cyan bg-brand-cyan/5 rounded-b-2xl animate-fade-in">
            <CheckCircle size={48} className="text-brand-cyan mx-auto mb-3" />
            <h3 className="text-lg font-bold dark:text-white uppercase tracking-widest">Mandate Published!</h3>
            <p className="text-sm text-gray-400 mt-2">Broadcast sequence initiated successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="label">Job Title *</label>
              <input required type="text" placeholder="e.g. React Developer" className="input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Location</label>
                <input type="text" placeholder="Chennai" className="input" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
              </div>
              <div>
                <label className="label">Work Mode</label>
                <select className="select" value={form.mode} onChange={e => setForm({...form, mode: e.target.value})}>
                  <option value="onsite">Onsite</option><option value="hybrid">Hybrid</option><option value="remote">Remote</option>
                </select>
              </div>
              <div>
                <label className="label">Min Exp (yrs)</label>
                <input type="number" min="0" className="input" value={form.minExp} onChange={e => setForm({...form, minExp: e.target.value})} />
              </div>
              <div>
                <label className="label">Max Exp (yrs)</label>
                <input type="number" min="0" className="input" value={form.maxExp} onChange={e => setForm({...form, maxExp: e.target.value})} />
              </div>
              <div>
                <label className="label">Openings</label>
                <input type="number" min="1" className="input" value={form.openings} onChange={e => setForm({...form, openings: e.target.value})} />
              </div>
              <div>
                <label className="label">Deadline</label>
                <input type="date" className="input" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="label">Skills (comma-separated)</label>
              <input type="text" placeholder="React, TypeScript..." className="input" value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} />
            </div>
            <div>
              <label className="label">Description *</label>
              <textarea required rows={4} className="input resize-none" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            </div>
            <div className="flex gap-3"><button type="submit" className="btn-primary flex-1 shadow-glow-cyan">Publish Mandate</button><button type="button" onClick={onClose} className="btn-ghost px-6 border border-gray-100 dark:border-gray-800">Abort</button></div>
          </form>
        )}
      </div>
    </div>
  )
}

export default function EmployerJobs() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="space-y-5 animate-fade-in">
      {showModal && <PostJobModal onClose={() => setShowModal(false)} />}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal dark:text-white">My Job Postings</h1>
          <p className="text-sm text-gray-400">TechCorp Solutions — {compJobs.length} active listings</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary shadow-glow-cyan btn-sm"><Plus size={16} className="mr-1" /> Initialize Mandate</button>
      </div>
      <div className="card overflow-hidden p-0">
        <div className="table-wrapper">
          <table className="table">
            <thead><tr>{['Job Title', 'Mode', 'Experience', 'Salary', 'Openings', 'Applicants', 'Deadline', 'Actions'].map(h => <th key={h} className="th">{h}</th>)}</tr></thead>
            <tbody className="bg-white dark:bg-dark-card divide-y divide-surface-border dark:divide-dark-border">
              {compJobs.map(job => (
                <tr key={job.id} className="tr-hover">
                  <td className="td"><p className="text-sm font-medium text-brand-charcoal dark:text-white">{job.title}</p><p className="text-xs text-gray-400">{job.department}</p></td>
                  <td className="td"><span className="badge badge-cyan text-xs">{job.workMode}</span></td>
                  <td className="td text-sm text-gray-500">{job.minExperience}–{job.maxExperience} yrs</td>
                  <td className="td text-sm font-medium text-brand-charcoal dark:text-white">{formatSalary(job.minSalary, job.maxSalary)}</td>
                  <td className="td text-sm text-gray-500">{job.openings}</td>
                  <td className="td text-sm font-semibold text-brand-orange">{job.applicantCount}</td>
                  <td className="td text-xs text-gray-400">{new Date(job.deadline).toLocaleDateString('en-IN')}</td>
                  <td className="td">
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded hover:bg-surface text-gray-400 hover:text-brand-cyan"><Eye size={14} /></button>
                      <button className="p-1.5 rounded hover:bg-surface text-gray-400 hover:text-brand-orange"><Edit size={14} /></button>
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
