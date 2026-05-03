import { Link } from 'react-router-dom'
import { Briefcase, ClipboardList, Bookmark, UserCheck, Bell, TrendingUp } from 'lucide-react'
import { jobs } from '../../../data/jobs'
import { candidates } from '../../../data/candidates'

const me = candidates[0] // Arun Kumar — demo candidate

const kpis = [
  { label: 'Recommended Jobs', value: '18', icon: TrendingUp, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
  { label: 'Applications Sent', value: me.appliedJobs.length, icon: ClipboardList, color: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  { label: 'Shortlisted', value: '3', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' },
  { label: 'Saved Jobs', value: me.savedJobs.length, icon: Bookmark, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/20' },
]

const recommended = jobs.filter(j => j.skills.some(s => me.skills.includes(s))).slice(0, 6)
const appliedJobs = jobs.filter(j => me.appliedJobs.includes(j.id))

const activity = [
  { text: 'Application sent to TechCorp Solutions for Senior React Developer', time: '2 hours ago', color: 'bg-brand-cyan' },
  { text: 'Your profile was viewed by DataPulse Analytics', time: '5 hours ago', color: 'bg-brand-orange' },
  { text: 'Job saved: ML Engineer at DataPulse Analytics', time: 'Yesterday', color: 'bg-purple-400' },
  { text: 'Profile strength improved to 85%', time: '2 days ago', color: 'bg-green-500' },
]

export default function CandidateDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal dark:text-white">Welcome back, {me.name.split(' ')[0]}! 👋</h1>
          <p className="text-sm text-gray-400">{me.role} · {me.location}</p>
        </div>
        <Link to="/dashboard/candidate/profile" className="btn-outline btn-sm">Complete Profile →</Link>
      </div>

      {/* Profile strength banner */}
      <div className="card bg-gradient-to-r from-brand-cyan/10 to-brand-orange/5 border border-brand-cyan/20">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan text-xl font-bold flex-shrink-0">
            {me.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-brand-charcoal dark:text-white mb-1">Profile Strength: {me.profileStrength}%</p>
            <div className="bg-white/50 dark:bg-white/10 rounded-full h-2 mb-1">
              <div className="h-2 rounded-full bg-brand-cyan transition-all" style={{ width: `${me.profileStrength}%` }}></div>
            </div>
            <p className="text-xs text-gray-500">Add your LinkedIn URL and certifications to reach 100%</p>
          </div>
          <Link to="/dashboard/candidate/profile" className="btn-primary btn-sm flex-shrink-0">Improve</Link>
        </div>
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

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Recommended Jobs */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-brand-charcoal dark:text-white">Recommended Jobs</h3>
            <Link to="/jobs" className="text-xs text-brand-cyan hover:underline">Browse All →</Link>
          </div>
          <div className="space-y-3">
            {recommended.map(job => (
              <div key={job.id} className="flex items-start gap-3 p-3 rounded-xl border border-surface-border dark:border-dark-border hover:border-brand-cyan/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan font-bold text-sm flex-shrink-0">
                  {job.company[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-brand-charcoal dark:text-white">{job.title}</p>
                  <p className="text-xs text-gray-400">{job.company} · {job.location}</p>
                  <div className="flex gap-2 mt-1.5">
                    <span className="badge badge-cyan text-xs">{job.workMode}</span>
                    <span className="text-xs text-gray-400">{job.minExperience}–{job.maxExperience}y exp</span>
                  </div>
                </div>
                <Link to="/login" className="btn-primary btn-sm text-xs flex-shrink-0">Apply</Link>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="card">
          <h3 className="text-base font-semibold text-brand-charcoal dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className={`w-2 h-2 rounded-full ${a.color} flex-shrink-0 mt-1.5`}></div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug">{a.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Application tracking */}
          <div className="mt-5 pt-4 border-t border-surface-border dark:border-dark-border">
            <h4 className="text-sm font-semibold text-brand-charcoal dark:text-white mb-3">My Applications</h4>
            <div className="space-y-2">
              {appliedJobs.map(job => (
                <div key={job.id} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-300 truncate max-w-[120px]">{job.title}</span>
                  <span className="badge badge-orange text-xs">{me.status.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
