import { Briefcase, Users, UserCheck, CheckCircle, TrendingUp, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { jobs } from '../../../data/jobs'
import { applications } from '../../../data/applications'
import { candidates, statusColors, statusLabels } from '../../../data/candidates'

const kpis = [
  { label: 'Active Openings', value: '12', icon: Briefcase, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
  { label: 'Total Applications', value: '86', icon: Users, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  { label: 'Shortlisted', value: '22', icon: UserCheck, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/20' },
  { label: 'Positions Closed', value: '5', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' },
]

const compJobs = jobs.filter(j => j.companyId === 'comp_001')
const appByJob = compJobs.map(j => ({ name: j.title.split(' ').slice(0,2).join(' '), applicants: j.applicantCount }))

export default function EmployerDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal dark:text-white">Employer Dashboard</h1>
          <p className="text-sm text-gray-400">TechCorp Solutions — Hiring overview</p>
        </div>
        <Link to="/dashboard/employer/jobs" className="btn-primary btn-sm"><Plus size={15} /> Initialize Mandate</Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <div key={i} className="card">
            <div className={`w-9 h-9 rounded-lg ${k.bg} flex items-center justify-center mb-3`}>
              <k.icon size={18} className={k.color} />
            </div>
            <div className="text-2xl font-bold text-brand-charcoal dark:text-white">{k.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Applications chart */}
        <div className="card">
          <h3 className="text-base font-semibold text-brand-charcoal dark:text-white mb-4">Applications per Job</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={appByJob} margin={{ bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="applicants" fill="#29ABE2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* My Jobs */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-brand-charcoal dark:text-white">Active Postings</h3>
            <Link to="/dashboard/employer/jobs" className="text-xs text-brand-cyan hover:underline">Manage →</Link>
          </div>
          <div className="space-y-3">
            {compJobs.slice(0, 5).map(job => (
              <div key={job.id} className="flex items-center justify-between py-2 border-b border-surface-border dark:border-dark-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-brand-charcoal dark:text-white">{job.title}</p>
                  <p className="text-xs text-gray-400">{job.workMode} · {job.openings} openings</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-brand-orange">{job.applicantCount}</span>
                  <p className="text-xs text-gray-400">applicants</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent applicants */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-brand-charcoal dark:text-white">Recent Applicants</h3>
          <Link to="/dashboard/employer/applicants" className="text-xs text-brand-cyan hover:underline">View All →</Link>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead><tr>{['Candidate', 'Role', 'Job', 'Status', 'Action'].map(h => <th key={h} className="th">{h}</th>)}</tr></thead>
            <tbody className="bg-white dark:bg-dark-card divide-y divide-surface-border dark:divide-dark-border">
              {candidates.filter(c => ['applied', 'screened', 'shortlisted'].includes(c.status)).slice(0, 6).map(c => (
                <tr key={c.id} className="tr-hover">
                  <td className="td">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-brand-cyan/15 flex items-center justify-center text-brand-cyan text-xs font-bold">{c.name[0]}</div>
                      <p className="text-sm font-medium text-brand-charcoal dark:text-white">{c.name}</p>
                    </div>
                  </td>
                  <td className="td text-sm text-gray-500">{c.role}</td>
                  <td className="td text-xs text-gray-400">{c.appliedJobs[0] || '—'}</td>
                  <td className="td"><span className={`badge ${statusColors[c.status]}`}>{statusLabels[c.status]}</span></td>
                  <td className="td">
                    <div className="flex gap-1.5">
                      <button className="btn-primary btn-sm text-xs">Advance Node</button>
                      <button className="btn-ghost btn-sm text-xs text-red-500">Terminate Cycle</button>
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
