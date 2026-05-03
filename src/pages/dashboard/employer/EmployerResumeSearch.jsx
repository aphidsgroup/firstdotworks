import { useState, useMemo } from 'react'
import { Search, Lock, Bookmark } from 'lucide-react'
import { candidates } from '../../../data/candidates'

export default function EmployerResumeSearch() {
  const [search, setSearch] = useState('')
  const [skillFilter, setSkillFilter] = useState('')
  const [expFilter, setExpFilter] = useState('')
  const [saved, setSaved] = useState(new Set())

  const filtered = useMemo(() => {
    return candidates.filter(c => {
      const q = search.toLowerCase()
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q)
      const matchSkill = !skillFilter || c.skills.some(s => s.toLowerCase().includes(skillFilter.toLowerCase()))
      const matchExp = !expFilter || (expFilter === '0-2' ? c.experience <= 2 : expFilter === '3-5' ? c.experience >= 3 && c.experience <= 5 : c.experience >= 6)
      return matchQ && matchSkill && matchExp && c.openToWork
    })
  }, [search, skillFilter, expFilter])

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-brand-charcoal dark:text-white">Resume Search</h1>
        <p className="text-sm text-gray-400">Search candidates open to work — limited employer view</p>
      </div>

      <div className="card flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Name or role..." className="input pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <input type="text" placeholder="Skill (React, Python...)" className="input w-44" value={skillFilter} onChange={e => setSkillFilter(e.target.value)} />
        <select className="select w-36" value={expFilter} onChange={e => setExpFilter(e.target.value)}>
          <option value="">Any exp</option>
          <option value="0-2">0–2 yrs</option>
          <option value="3-5">3–5 yrs</option>
          <option value="6+">6+ yrs</option>
        </select>
        <div className="text-sm text-gray-400 self-center">{filtered.length} open candidates</div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c, i) => {
          const isUnlocked = i < 3 // First 3 are "unlocked" in demo
          const isSaved = saved.has(c.id)
          return (
            <div key={c.id} className="card relative">
              <button
                onClick={() => { const s = new Set(saved); isSaved ? s.delete(c.id) : s.add(c.id); setSaved(s) }}
                className={`absolute top-4 right-4 p-1.5 rounded-lg transition-colors ${isSaved ? 'text-brand-cyan bg-brand-cyan/10' : 'text-gray-300 hover:text-brand-cyan'}`}
              >
                <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-brand-orange/15 flex items-center justify-center text-brand-orange font-bold">{c.name[0]}</div>
                <div>
                  <p className="font-semibold text-brand-charcoal dark:text-white text-sm">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.role} · {c.experience}y</p>
                </div>
              </div>
              <div className="space-y-1 text-xs text-gray-500 mb-3">
                <div className="flex justify-between"><span>Location</span><span className="dark:text-gray-300">{c.location}</span></div>
                <div className="flex justify-between"><span>Qualification</span><span className="dark:text-gray-300">{c.qualification}</span></div>
                <div className="flex justify-between"><span>Expected CTC</span><span className="text-brand-cyan font-medium">₹{(c.expectedSalary / 100000).toFixed(1)}L</span></div>
                <div className="flex justify-between"><span>Notice</span><span className="dark:text-gray-300">{c.noticePeriod} days</span></div>
                <div className="flex justify-between">
                  <span>Contact</span>
                  <span className={isUnlocked ? 'text-brand-charcoal dark:text-gray-200' : 'text-gray-300'}>
                    {isUnlocked ? c.phone : '••••• •••••'}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {c.skills.slice(0, 3).map(s => <span key={s} className="badge badge-gray text-xs">{s}</span>)}
              </div>
              {!isUnlocked && (
                <button className="btn-outline btn-sm w-full justify-center text-xs">
                  <Lock size={12} /> Request Full Profile
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="card bg-brand-orange/5 border border-brand-orange/20">
        <div className="flex items-center gap-3">
          <Lock size={18} className="text-brand-orange flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-brand-charcoal dark:text-white">Limited Access Mode</p>
            <p className="text-xs text-gray-500">Full contact details and resume download available for the first 3 candidates in demo. Contact Firstdot Works to unlock complete database access.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
