import { Briefcase, Users, Building2, ClipboardList, TrendingUp, UserCheck, Calendar, Activity } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, FunnelChart, Funnel, LabelList } from 'recharts'
import { candidates } from '../../../data/candidates'
import { jobs } from '../../../data/jobs'
import { employers } from '../../../data/employers'
import { applications, applicationTrend, hiringFunnel } from '../../../data/applications'

const kpis = [
  { label: 'Active Jobs', value: '124', change: '+8 this week', icon: Briefcase, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
  { label: 'Total Candidates', value: '2,450', change: '+37 this week', icon: Users, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  { label: 'Active Clients', value: '38', change: '7 active mandates', icon: Building2, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
  { label: 'New Applications', value: '318', change: '+42 today', icon: ClipboardList, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  { label: 'Shortlisted', value: '74', change: '23% conversion', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' },
  { label: 'Interviews', value: '16', change: '5 this week', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/20' },
]

const COLORS = ['#29ABE2', '#F7941D', '#10B981', '#8B5CF6', '#EF4444']

const jobStatusData = [
  { name: 'Published', value: 18 },
  { name: 'Draft', value: 4 },
  { name: 'Closed', value: 7 },
  { name: 'On Hold', value: 2 },
]

const recentApps = applications.slice(0, 8)

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-brand-charcoal dark:text-white">Admin Overview</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Firstdot Works — Recruitment Operations Dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="card flex flex-col gap-2">
            <div className={`w-9 h-9 rounded-lg ${kpi.bg} flex items-center justify-center`}>
              <kpi.icon size={18} className={kpi.color} />
            </div>
            <div className="text-2xl font-bold text-brand-charcoal dark:text-white">{kpi.value}</div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">{kpi.label}</div>
            <div className="text-xs text-brand-cyan">{kpi.change}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Applications trend */}
        <div className="card lg:col-span-2">
          <h3 className="text-base font-semibold text-brand-charcoal dark:text-white mb-4">Applications Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={applicationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="applications" stroke="#29ABE2" strokeWidth={2} dot={{ fill: '#29ABE2' }} />
              <Line type="monotone" dataKey="shortlisted" stroke="#F7941D" strokeWidth={2} dot={{ fill: '#F7941D' }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-1 rounded bg-brand-cyan inline-block"></span>Applications</span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-1 rounded bg-brand-orange inline-block"></span>Shortlisted</span>
          </div>
        </div>

        {/* Job Status Pie */}
        <div className="card">
          <h3 className="text-base font-semibold text-brand-charcoal dark:text-white mb-4">Job Status</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={jobStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                {jobStatusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {jobStatusData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-gray-500"><span className="w-2 h-2 rounded-full inline-block" style={{ background: COLORS[i] }}></span>{d.name}</span>
                <span className="font-semibold text-brand-charcoal dark:text-white">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Funnel + Top Clients */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Hiring Funnel */}
        <div className="card">
          <h3 className="text-base font-semibold text-brand-charcoal dark:text-white mb-4">Candidate Hiring Funnel</h3>
          <div className="space-y-2">
            {hiringFunnel.map((stage, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-24 flex-shrink-0">{stage.stage}</span>
                <div className="flex-1 bg-gray-100 dark:bg-dark-surface rounded-full h-6 overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center pl-3 text-white text-xs font-semibold transition-all"
                    style={{ width: `${(stage.count / hiringFunnel[0].count) * 100}%`, background: COLORS[i] }}
                  >
                    {stage.count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clients */}
        <div className="card">
          <h3 className="text-base font-semibold text-brand-charcoal dark:text-white mb-4">Top Hiring Clients</h3>
          <div className="space-y-3">
            {employers.filter(e => e.status === 'active').slice(0, 5).map((emp, i) => (
              <div key={emp.id} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-xs font-bold text-brand-cyan flex-shrink-0">
                  {emp.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-charcoal dark:text-white truncate">{emp.name}</p>
                  <p className="text-xs text-gray-400">{emp.industry}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-semibold text-brand-charcoal dark:text-white">{emp.activeJobs}</div>
                  <div className="text-xs text-gray-400">active jobs</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-brand-charcoal dark:text-white">Recent Applications</h3>
          <a href="#" className="text-xs text-brand-cyan hover:underline">View All →</a>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                {['Candidate', 'Job ID', 'Status', 'Applied', 'Note'].map(h => (
                  <th key={h} className="th">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-card divide-y divide-surface-border dark:divide-dark-border">
              {recentApps.map(app => {
                const cand = candidates.find(c => c.id === app.candidateId)
                const statusColor = { applied: 'badge-gray', screened: 'badge-cyan', shortlisted: 'badge-purple', interview_scheduled: 'badge-orange', selected: 'badge-green', rejected: 'badge-red' }
                return (
                  <tr key={app.id} className="tr-hover">
                    <td className="td font-medium text-brand-charcoal dark:text-white">{cand?.name}</td>
                    <td className="td text-gray-400 text-xs">{app.jobId}</td>
                    <td className="td"><span className={`badge ${statusColor[app.status]}`}>{app.status.replace('_', ' ')}</span></td>
                    <td className="td text-gray-400 text-xs">{new Date(app.appliedAt).toLocaleDateString('en-IN')}</td>
                    <td className="td text-xs text-gray-500 truncate max-w-[160px]">{app.recruiterNote || '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
