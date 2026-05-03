import { useState } from 'react'
import { candidates, statusColors, statusLabels } from '../../../data/candidates'
import { jobs } from '../../../data/jobs'
import { UserCheck, X } from 'lucide-react'

const compJobs = jobs.filter(j => j.companyId === 'comp_001')

export default function EmployerApplicants() {
  const [selectedJob, setSelectedJob] = useState(compJobs[0]?.id || '')
  const [actions, setActions] = useState({})

  const applicants = candidates.filter(c => c.appliedJobs.includes(selectedJob))

  const act = (id, action) => setActions(prev => ({ ...prev, [id]: action }))

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-brand-charcoal dark:text-white">Applicants</h1>
        <p className="text-sm text-gray-400">Review and shortlist candidates for your openings</p>
      </div>

      <div className="card">
        <label className="label">Filter by Job Posting</label>
        <select className="select max-w-xs" value={selectedJob} onChange={e => setSelectedJob(e.target.value)}>
          {compJobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {applicants.length === 0 ? (
          <div className="col-span-3 text-center py-12 text-gray-400">
            <p className="text-sm">No applicants for this posting yet.</p>
          </div>
        ) : applicants.map(c => {
          const state = actions[c.id]
          return (
            <div key={c.id} className={`card relative transition-all ${state === 'shortlisted' ? 'border-green-300 bg-green-50 dark:bg-green-900/10' : state === 'rejected' ? 'border-red-200 bg-red-50 dark:bg-red-900/10 opacity-60' : ''}`}>
              {state && (
                <div className={`absolute top-3 right-3 badge ${state === 'shortlisted' ? 'badge-green' : 'badge-red'}`}>
                  {state === 'shortlisted' ? 'Shortlisted ✓' : 'Rejected'}
                </div>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-brand-cyan/15 flex items-center justify-center text-brand-cyan font-bold">{c.name[0]}</div>
                <div>
                  <p className="font-semibold text-brand-charcoal dark:text-white text-sm">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.role}</p>
                </div>
              </div>
              <div className="space-y-1 text-xs text-gray-500 mb-3">
                <div className="flex justify-between"><span>Experience</span><span className="font-medium dark:text-gray-300">{c.experience} years</span></div>
                <div className="flex justify-between"><span>Location</span><span className="font-medium dark:text-gray-300">{c.location}</span></div>
                <div className="flex justify-between"><span>Expected CTC</span><span className="font-medium text-brand-cyan">₹{(c.expectedSalary / 100000).toFixed(1)}L</span></div>
                <div className="flex justify-between"><span>Notice</span><span className="font-medium dark:text-gray-300">{c.noticePeriod} days</span></div>
                <div className="flex justify-between"><span>Resume</span><span className={c.resumeAvailable ? 'text-green-500 font-medium' : 'text-red-400'}>{c.resumeAvailable ? 'Available' : 'Not uploaded'}</span></div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {c.skills.slice(0, 3).map(s => <span key={s} className="badge badge-gray text-xs">{s}</span>)}
              </div>
              {!state && (
                <div className="flex gap-2">
                  <button onClick={() => act(c.id, 'shortlisted')} className="btn-primary btn-sm flex-1 text-xs">
                    <UserCheck size={13} /> Shortlist
                  </button>
                  <button onClick={() => act(c.id, 'rejected')} className="btn-ghost btn-sm text-red-500 border border-red-200 flex-1 text-xs">
                    <X size={13} /> Reject
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
