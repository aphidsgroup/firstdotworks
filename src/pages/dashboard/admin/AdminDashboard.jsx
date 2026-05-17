import { Briefcase, Users, Building2, ClipboardList, TrendingUp, UserCheck, Calendar, Activity } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useDataStore } from '../../../context/DataStoreContext'
import { applicationTrend, hiringFunnel } from '../../../data/applications'

const COLORS = ['#29ABE2', '#F7941D', '#0B0F19', '#1E293B', '#334155']

export default function AdminDashboard() {
  const { jobs, candidates, employers, applications } = useDataStore()

  // ── Derived KPI values from real data ────────────────────────────────────
  const activeJobs = jobs.filter(j => j.status === 'published').length
  const totalCandidates = candidates.length
  const activeEmployers = employers.filter(e => e.status === 'active').length
  const newApplications = applications.length
  const shortlisted = applications.filter(a => a.status === 'shortlisted').length
  const interviews = applications.filter(a => a.status === 'interview_scheduled').length
  const shortlistPct = newApplications > 0 ? Math.round((shortlisted / newApplications) * 100) : 0

  const kpis = [
    { label: 'Active Jobs', value: activeJobs.toString(), change: `${jobs.filter(j => j.status === 'published').length} published`, icon: Briefcase, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10', border: 'hover:border-brand-cyan/50', shadow: 'hover:shadow-glow-cyan' },
    { label: 'Total Candidates', value: totalCandidates.toLocaleString(), change: `${candidates.filter(c => c.openToWork).length} open to work`, icon: Users, color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'hover:border-brand-orange/50', shadow: 'hover:shadow-glow-orange' },
    { label: 'Active Clients', value: activeEmployers.toString(), change: `${employers.length} total partners`, icon: Building2, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10', border: 'hover:border-brand-cyan/50', shadow: 'hover:shadow-glow-cyan' },
    { label: 'Applications', value: newApplications.toString(), change: `${applications.filter(a => a.status === 'applied').length} pending review`, icon: ClipboardList, color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'hover:border-brand-orange/50', shadow: 'hover:shadow-glow-orange' },
    { label: 'Shortlisted', value: shortlisted.toString(), change: `${shortlistPct}% conversion`, icon: UserCheck, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10', border: 'hover:border-brand-cyan/50', shadow: 'hover:shadow-glow-cyan' },
    { label: 'Interviews', value: interviews.toString(), change: `${applications.filter(a => a.status === 'selected').length} selected`, icon: Calendar, color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'hover:border-brand-orange/50', shadow: 'hover:shadow-glow-orange' },
  ]

  const jobStatusData = [
    { name: 'Published', value: jobs.filter(j => j.status === 'published').length },
    { name: 'Draft', value: jobs.filter(j => j.status === 'draft').length },
    { name: 'Closed', value: jobs.filter(j => j.status === 'closed').length },
    { name: 'On Hold', value: jobs.filter(j => j.status === 'on_hold').length },
  ].filter(d => d.value > 0)

  const recentApps = applications.slice(0, 8)

  const statusColor = {
    applied: 'badge-gray',
    screened: 'badge-cyan',
    shortlisted: 'badge-purple',
    interview_scheduled: 'badge-orange',
    selected: 'badge-green',
    rejected: 'badge-red',
  }

  return (
    <div className="space-y-8 animate-fade-in pb-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-3">
            <Activity size={14} className="animate-pulse-slow" /> System Active
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal dark:text-white tracking-tight">System Overview</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">Recruitment Operations Command Center</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className={`card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-5 flex flex-col gap-3 transition-all duration-300 ${kpi.border} ${kpi.shadow} group`}>
            <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
              <kpi.icon size={20} className={kpi.color} />
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-brand-charcoal dark:text-white mb-0.5">{kpi.value}</div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400">{kpi.label}</div>
            </div>
            <div className={`text-xs font-semibold ${kpi.color} mt-auto`}>{kpi.change}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Applications trend */}
        <div className="card lg:col-span-2 bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Application Velocity</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={applicationTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.5} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ stroke: '#29ABE2', strokeWidth: 1, strokeDasharray: '4 4' }} contentStyle={{ borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0B0F19', color: '#fff' }} />
              <Line type="monotone" dataKey="applications" stroke="#29ABE2" strokeWidth={3} dot={{ fill: '#0B0F19', stroke: '#29ABE2', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="shortlisted" stroke="#F7941D" strokeWidth={3} dot={{ fill: '#0B0F19', stroke: '#F7941D', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex gap-6 mt-4 justify-center">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500"><span className="w-3 h-3 rounded-full bg-brand-cyan shadow-glow-cyan inline-block"></span>Applications</span>
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500"><span className="w-3 h-3 rounded-full bg-brand-orange shadow-glow-orange inline-block"></span>Shortlisted</span>
          </div>
        </div>

        {/* Job Status Pie */}
        <div className="card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Mandate Distribution</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={jobStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value" paddingAngle={5} stroke="none">
                {jobStatusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#0B0F19', color: '#fff' }} itemStyle={{ color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3 mt-6">
            {jobStatusData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400"><span className="w-2 h-2 rounded-full inline-block" style={{ background: COLORS[i] }}></span>{d.name}</span>
                <span className="font-display font-bold text-sm text-brand-charcoal dark:text-white">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Funnel + Top Clients */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Hiring Funnel */}
        <div className="card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Pipeline Conversion</h3>
          <div className="space-y-4">
            {hiringFunnel.map((stage, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 w-28 flex-shrink-0">{stage.stage}</span>
                <div className="flex-1 bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-gray-800 rounded-full h-8 overflow-hidden relative">
                  <div
                    className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(stage.count / (hiringFunnel?.[0]?.count || 1)) * 100}%`, background: COLORS[i % 2 === 0 ? 0 : 1] }}
                  />
                  <div className="absolute top-0 left-0 w-full h-full flex items-center px-4 text-xs font-bold text-white z-10 drop-shadow-md">
                    {stage.count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Clients */}
        <div className="card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Key Partners</h3>
          <div className="space-y-4">
            {employers.filter(e => e.status === 'active').slice(0, 5).map((emp, i) => (
              <div key={emp.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${i % 2 === 0 ? 'bg-brand-cyan/10 text-brand-cyan' : 'bg-brand-orange/10 text-brand-orange'}`}>
                  {emp.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-brand-charcoal dark:text-white truncate">{emp.name}</p>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{emp.industry}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-display font-bold text-brand-charcoal dark:text-white leading-none">{emp.activeJobs}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">Active</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Recent Applications</h3>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan">{applications.length} total</span>
        </div>
        <div className="table-wrapper -mx-6 mb-0 border-t border-gray-100 dark:border-gray-800/50">
          <table className="table w-full">
            <thead className="bg-gray-50 dark:bg-dark-bg border-b border-gray-100 dark:border-gray-800/50">
              <tr>
                {['Candidate', 'Job ID', 'Status', 'Applied On', 'Recruiter Note'].map(h => (
                  <th key={h} className="th px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-dark-surface divide-y divide-gray-100 dark:divide-gray-800/50">
              {recentApps.map(app => {
                const cand = candidates.find(c => c.id === app.candidateId)
                return (
                  <tr key={app.id} className="tr-hover hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                    <td className="td px-6 py-4 font-bold text-brand-charcoal dark:text-white text-sm">{cand?.name || app.candidateId}</td>
                    <td className="td px-6 py-4 text-gray-400 text-xs font-medium uppercase tracking-wider">{app.jobId}</td>
                    <td className="td px-6 py-4"><span className={`badge ${statusColor[app.status] || 'badge-gray'} px-3 py-1 font-bold text-[10px] uppercase tracking-wider`}>{app.status?.replace('_', ' ') || 'applied'}</span></td>
                    <td className="td px-6 py-4 text-gray-400 text-xs font-medium">{new Date(app.appliedAt).toLocaleDateString('en-IN')}</td>
                    <td className="td px-6 py-4 text-xs font-medium text-gray-500 truncate max-w-[200px]">{app.recruiterNote || '—'}</td>
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
