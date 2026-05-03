import { useState } from 'react'
import { Upload, CheckCircle } from 'lucide-react'
import { candidates } from '../../../data/candidates'

const me = candidates[0]

export default function CandidateProfile() {
  const [form, setForm] = useState({
    name: me.name,
    email: me.email,
    phone: me.phone,
    role: me.role,
    location: me.location,
    experience: me.experience,
    qualification: me.qualification,
    expectedSalary: (me.expectedSalary / 100000).toFixed(1),
    noticePeriod: me.noticePeriod,
    skills: me.skills.join(', '),
    summary: 'Experienced software engineer with 4+ years building scalable web applications using React, Node.js, and cloud technologies. Passionate about clean code and great user experiences.',
    linkedin: '',
    portfolio: '',
  })
  const [saved, setSaved] = useState(false)
  const [uploaded, setUploaded] = useState(me.resumeAvailable)

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-5 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-brand-charcoal dark:text-white">My Profile</h1>
        <p className="text-sm text-gray-400">Keep your profile updated to get better matches</p>
      </div>

      {/* Profile strength */}
      <div className="card bg-brand-cyan/5 border border-brand-cyan/20">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-brand-charcoal dark:text-white">Profile Strength</span>
          <span className="text-brand-cyan font-bold">{me.profileStrength}%</span>
        </div>
        <div className="bg-white/50 dark:bg-white/10 rounded-full h-2.5">
          <div className="h-2.5 rounded-full bg-brand-cyan transition-all" style={{ width: `${me.profileStrength}%` }}></div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Add LinkedIn URL (+5%), Portfolio (+5%), 2 more skills (+5%) to complete profile</p>
      </div>

      {/* Resume upload */}
      <div className="card">
        <h3 className="text-base font-semibold text-brand-charcoal dark:text-white mb-4">Resume</h3>
        {uploaded ? (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-900/15 border border-green-200 dark:border-green-800">
            <CheckCircle size={20} className="text-green-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-700 dark:text-green-300">Resume uploaded</p>
              <p className="text-xs text-green-500">Arun_Kumar_Resume.pdf · Last updated April 2026</p>
            </div>
            <button onClick={() => setUploaded(false)} className="btn-outline btn-sm text-xs">Replace</button>
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-surface-border dark:border-dark-border rounded-xl p-8 text-center cursor-pointer hover:border-brand-cyan/50 transition-colors"
            onClick={() => setUploaded(true)}
          >
            <Upload size={28} className="mx-auto mb-3 text-gray-300" />
            <p className="text-sm font-medium text-gray-500">Drop your resume here or click to upload</p>
            <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX · Max 5MB</p>
            <button className="btn-outline btn-sm mt-4">Choose File</button>
          </div>
        )}
      </div>

      {/* Profile form */}
      <div className="card">
        <h3 className="text-base font-semibold text-brand-charcoal dark:text-white mb-5">Personal Details</h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="label">Full Name</label><input type="text" className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
            <div><label className="label">Email</label><input type="email" className="input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
            <div><label className="label">Phone</label><input type="tel" className="input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
            <div><label className="label">Current Role</label><input type="text" className="input" value={form.role} onChange={e => setForm({...form, role: e.target.value})} /></div>
            <div><label className="label">Location</label><input type="text" className="input" value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
            <div><label className="label">Total Experience (yrs)</label><input type="number" min="0" className="input" value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} /></div>
            <div><label className="label">Highest Qualification</label><input type="text" className="input" value={form.qualification} onChange={e => setForm({...form, qualification: e.target.value})} /></div>
            <div><label className="label">Expected CTC (L/yr)</label><input type="number" min="0" step="0.1" className="input" value={form.expectedSalary} onChange={e => setForm({...form, expectedSalary: e.target.value})} /></div>
            <div><label className="label">Notice Period (days)</label><input type="number" min="0" className="input" value={form.noticePeriod} onChange={e => setForm({...form, noticePeriod: e.target.value})} /></div>
            <div><label className="label">LinkedIn URL</label><input type="url" placeholder="https://linkedin.com/in/..." className="input" value={form.linkedin} onChange={e => setForm({...form, linkedin: e.target.value})} /></div>
          </div>
          <div><label className="label">Skills (comma-separated)</label><input type="text" className="input" value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} /></div>
          <div><label className="label">Profile Summary</label><textarea rows={3} className="input resize-none" value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} /></div>
          <button type="submit" className="btn-primary">
            {saved ? <><CheckCircle size={16} /> Saved!</> : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  )
}
