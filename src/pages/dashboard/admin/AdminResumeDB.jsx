import { useState, useMemo } from 'react'
import { Search, Eye, UserCheck, FileText, Download, Activity, Filter, ShieldCheck } from 'lucide-react'
import { candidates } from '../../../data/candidates'
import DataPortal from '../../../components/DataPortal'

const RESUME_COLUMNS = [
  { label: 'Full Name', accessor: 'name' },
  { label: 'Role', accessor: 'role' },
  { label: 'Location', accessor: 'location' },
  { label: 'Experience (yrs)', accessor: 'experience' },
  { label: 'Qualification', accessor: 'qualification' },
  { label: 'Skills', accessor: c => c.skills?.join(', ') || '' },
  { label: 'Expected Salary (₹)', accessor: 'expectedSalary' },
  { label: 'Notice Period (days)', accessor: 'noticePeriod' },
  { label: 'Email', accessor: 'email' },
  { label: 'Phone', accessor: 'phone' },
  { label: 'Resume Available', accessor: c => c.resumeAvailable ? 'Yes' : 'No' },
  { label: 'Open to Work', accessor: c => c.openToWork ? 'Yes' : 'No' },
]

export default function AdminResumeDB() {
  const [search, setSearch] = useState('')
  const [skillFilter, setSkillFilter] = useState('')
  const [expFilter, setExpFilter] = useState('')
  const [locFilter, setLocFilter] = useState('')
  const [openToWork, setOpenToWork] = useState(false)
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    return candidates.filter(c => {
      const q = search.toLowerCase()
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q) || c.qualification.toLowerCase().includes(q)
      const matchSkill = !skillFilter || c.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()))
      const matchExp = !expFilter || (expFilter === '0-2' ? c.experience <= 2 : expFilter === '3-5' ? c.experience >= 3 && c.experience <= 5 : c.experience >= 6)
      const matchLoc = !locFilter || c.location.toLowerCase().includes(locFilter.toLowerCase())
      const matchWork = !openToWork || c.openToWork
      return matchQ && matchSkill && matchExp && matchLoc && matchWork
    })
  }, [search, skillFilter, expFilter, locFilter, openToWork])

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-3">
            <Activity size={14} className="animate-pulse-slow" /> Core DB Access
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal dark:text-white tracking-tight">Talent Data Center</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">{candidates.length} secured profiles · Global administrative query access</p>
        </div>
        <DataPortal title="Talent Data Center" rows={candidates} columns={RESUME_COLUMNS} />
      </div>

      {/* Search & Filters */}
      <div className="card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6 space-y-4">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Deep query by identity, technical role, or qualification parameter..." className="input pl-11 bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20 h-11" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[140px]">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Stack Query</label>
            <input type="text" placeholder="React, Node..." className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 h-10 text-sm" value={skillFilter} onChange={e => setSkillFilter(e.target.value)} />
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Cycle Range</label>
            <select className="select bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 h-10 text-sm" value={expFilter} onChange={e => setExpFilter(e.target.value)}>
              <option value="">Any Range</option>
              <option value="0-2">0–2 Cycles</option>
              <option value="3-5">3–5 Cycles</option>
              <option value="6+">6+ Cycles</option>
            </select>
          </div>
          <div className="flex-1 min-w-[140px]">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Sector</label>
            <input type="text" placeholder="Chennai..." className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 h-10 text-sm" value={locFilter} onChange={e => setLocFilter(e.target.value)} />
          </div>
          <div className="flex items-center h-10 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-800 rounded-xl px-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="rounded border-gray-300 text-brand-cyan focus:ring-brand-cyan" checked={openToWork} onChange={e => setOpenToWork(e.target.checked)} />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 group-hover:text-brand-cyan transition-colors">Immediate Deployment</span>
            </label>
          </div>
          <div className="h-10 flex items-center">
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 py-1.5 px-3 bg-gray-100 dark:bg-gray-800 rounded-lg">{filtered.length} Nodes Found</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Candidate cards list */}
        <div className="lg:col-span-2 space-y-4 max-h-[calc(100vh-320px)] overflow-y-auto scrollbar-hidden pr-2">
          {filtered.map(c => (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              className={`card bg-white dark:bg-dark-surface border p-5 cursor-pointer transition-all duration-300 hover:shadow-card-md hover:-translate-y-1 ${selected?.id === c.id ? 'border-brand-cyan shadow-glow-cyan' : 'border-gray-100 dark:border-gray-800'}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan font-bold flex-shrink-0 text-lg">
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-brand-charcoal dark:text-white text-base leading-none">{c.name}</h4>
                      <p className="text-xs font-medium text-gray-500 mt-1.5 uppercase tracking-wider">{c.role} · {c.experience}y · {c.location}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {c.resumeAvailable && <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] font-bold uppercase tracking-wider">Secured</span>}
                      {c.openToWork && <span className="px-2 py-1 rounded bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 text-[10px] font-bold uppercase tracking-wider">Available</span>}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {c.skills.slice(0, 4).map(s => (
                      <span key={s} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gray-50 dark:bg-dark-bg text-gray-500 dark:text-gray-400 rounded border border-gray-100 dark:border-gray-800">{s}</span>
                    ))}
                    {c.skills.length > 4 && <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gray-50 dark:bg-dark-bg text-gray-400 rounded border border-gray-100 dark:border-gray-800">+{c.skills.length - 4}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400 bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 rounded-2xl">
              <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-dark-bg flex items-center justify-center mb-4">
                <Search size={24} className="text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-sm font-bold uppercase tracking-wider">No corresponding nodes discovered in DB</p>
            </div>
          )}
        </div>

        {/* Profile panel */}
        <div className="card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6 sticky top-6 self-start flex flex-col min-h-[400px]">
          {selected ? (
            <div className="space-y-6 flex-1 flex flex-col animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan text-2xl font-display font-bold shadow-glow-cyan">
                  {selected.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-brand-charcoal dark:text-white">{selected.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-cyan mt-1">{selected.role}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm py-5 border-y border-gray-100 dark:border-gray-800/50">
                {[
                  ['Cycles Exp', `${selected.experience} years`],
                  ['Sector', selected.location],
                  ['Qualification', selected.qualification],
                  ['Expected Comp', `₹${(selected.expectedSalary / 100000).toFixed(1)}L/yr`],
                  ['Notice Period', `${selected.noticePeriod} days`],
                  ['Comm Channel', selected.email],
                  ['Direct Line', selected.phone],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-center gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{k}</span>
                    <span className={`font-bold dark:text-white text-right truncate ${k === 'Expected Comp' ? 'text-brand-cyan' : ''}`} title={v}>{v}</span>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Stack Competencies</p>
                <div className="flex flex-wrap gap-2">
                  {selected.skills.map(s => <span key={s} className="px-2.5 py-1 rounded-md bg-gray-50 dark:bg-dark-bg text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 text-[10px] font-bold uppercase tracking-wider">{s}</span>)}
                </div>
              </div>

              <div className="mt-auto pt-6 flex flex-col gap-3">
                <button className="btn-primary shadow-glow-cyan w-full justify-center py-3"><UserCheck size={16} className="mr-2" /> Allocate to Mandate</button>
                {selected.resumeAvailable && (
                  <button className="px-4 py-3 rounded-xl border border-brand-cyan/30 text-brand-cyan font-bold hover:bg-brand-cyan/10 transition-colors w-full flex items-center justify-center uppercase tracking-wider text-xs"><Download size={16} className="mr-2" /> Retrieve Data File</button>
                )}
                <button className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full flex items-center justify-center uppercase tracking-wider text-xs"><Eye size={16} className="mr-2" /> Inspect Full Architecture</button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 text-gray-400">
              <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-dark-bg border border-gray-100 dark:border-gray-800 flex items-center justify-center mb-4">
                <ShieldCheck size={24} className="text-gray-300 dark:text-gray-600" />
              </div>
              <p className="text-sm font-bold uppercase tracking-wider max-w-[200px]">Select a node to inspect system parameters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
