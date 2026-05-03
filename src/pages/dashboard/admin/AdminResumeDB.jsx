import { useState, useMemo } from 'react'
import { Search, Eye, UserCheck, FileText, Download } from 'lucide-react'
import { candidates } from '../../../data/candidates'

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
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-brand-charcoal dark:text-white">Resume Database Centre</h1>
        <p className="text-sm text-gray-400">{candidates.length} profiles in talent pool • Global admin view</p>
      </div>

      {/* Search & Filters */}
      <div className="card space-y-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by name, role, qualification..." className="input pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-3">
          <div>
            <label className="label text-xs">Skill</label>
            <input type="text" placeholder="React, Python..." className="input w-36 text-sm" value={skillFilter} onChange={e => setSkillFilter(e.target.value)} />
          </div>
          <div>
            <label className="label text-xs">Experience</label>
            <select className="select w-36 text-sm" value={expFilter} onChange={e => setExpFilter(e.target.value)}>
              <option value="">Any</option>
              <option value="0-2">0–2 yrs</option>
              <option value="3-5">3–5 yrs</option>
              <option value="6+">6+ yrs</option>
            </select>
          </div>
          <div>
            <label className="label text-xs">Location</label>
            <input type="text" placeholder="Chennai..." className="input w-36 text-sm" value={locFilter} onChange={e => setLocFilter(e.target.value)} />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer pb-1">
              <input type="checkbox" className="rounded" checked={openToWork} onChange={e => setOpenToWork(e.target.checked)} />
              <span className="text-sm text-gray-600 dark:text-gray-300">Open to work only</span>
            </label>
          </div>
          <div className="text-sm text-gray-400 self-end pb-1">{filtered.length} candidates</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Candidate cards list */}
        <div className="lg:col-span-2 space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-hidden pr-1">
          {filtered.map(c => (
            <div
              key={c.id}
              onClick={() => setSelected(c)}
              className={`card cursor-pointer transition-all hover:shadow-card-md hover:-translate-y-0.5 ${selected?.id === c.id ? 'border-brand-cyan border-2' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-cyan/15 flex items-center justify-center text-brand-cyan font-bold flex-shrink-0">
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-brand-charcoal dark:text-white text-sm">{c.name}</h4>
                      <p className="text-xs text-gray-500">{c.role} · {c.experience}y exp · {c.location}</p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      {c.resumeAvailable && <span className="badge badge-green text-xs">Resume</span>}
                      {c.openToWork && <span className="badge badge-cyan text-xs">Open</span>}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {c.skills.slice(0, 3).map(s => (
                      <span key={s} className="px-1.5 py-0.5 text-xs bg-surface dark:bg-dark-surface text-gray-500 rounded border border-surface-border dark:border-dark-border">{s}</span>
                    ))}
                    {c.skills.length > 3 && <span className="text-xs text-gray-400">+{c.skills.length - 3}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Search size={28} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">No candidates match your search</p>
            </div>
          )}
        </div>

        {/* Profile panel */}
        <div className="card sticky top-0 self-start">
          {selected ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-cyan/15 flex items-center justify-center text-brand-cyan text-xl font-bold">{selected.name[0]}</div>
                <div>
                  <h3 className="font-bold text-brand-charcoal dark:text-white">{selected.name}</h3>
                  <p className="text-sm text-gray-400">{selected.role}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm border-t border-surface-border dark:border-dark-border pt-3">
                {[
                  ['Experience', `${selected.experience} years`],
                  ['Location', selected.location],
                  ['Qualification', selected.qualification],
                  ['Expected CTC', `₹${(selected.expectedSalary / 100000).toFixed(1)}L/yr`],
                  ['Notice Period', `${selected.noticePeriod} days`],
                  ['Email', selected.email],
                  ['Phone', selected.phone],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span className="text-gray-400">{k}</span>
                    <span className="font-medium dark:text-gray-200 text-right">{v}</span>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wider">Skills</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.skills.map(s => <span key={s} className="badge badge-cyan text-xs">{s}</span>)}
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-surface-border dark:border-dark-border">
                <button className="btn-primary btn-sm justify-center"><UserCheck size={14} /> Shortlist Candidate</button>
                {selected.resumeAvailable && (
                  <button className="btn-outline btn-sm justify-center"><Download size={14} /> Download Resume</button>
                )}
                <button className="btn-ghost btn-sm text-gray-500"><Eye size={14} /> View Full Profile</button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <FileText size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Click a candidate to view profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
