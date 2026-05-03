import { useState, useEffect } from 'react'
import { Upload, CheckCircle, FileText, Loader2, RefreshCw } from 'lucide-react'
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
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleUpload = () => {
    setUploading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setUploading(false)
          setUploaded(true)
          return 100
        }
        return p + 5
      })
    }, 50)
  }

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
      <div className="card border-surface-border dark:border-dark-border">
        <h3 className="text-base font-semibold text-brand-charcoal dark:text-white mb-4 flex items-center gap-2">
          <FileText size={18} className="text-brand-cyan" /> Resume Management
        </h3>
        
        {uploading ? (
          <div className="p-8 border-2 border-dashed border-brand-cyan/30 rounded-xl bg-brand-cyan/5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Loader2 size={20} className="animate-spin text-brand-cyan" />
                <span className="text-sm font-bold text-brand-charcoal dark:text-white uppercase tracking-widest">Encrypting & Storing Node...</span>
              </div>
              <span className="text-sm font-bold text-brand-cyan">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
              <div className="bg-brand-cyan h-full transition-all duration-300 shadow-glow-cyan" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        ) : uploaded ? (
          <div className="flex items-center gap-4 p-5 rounded-xl bg-green-500/5 dark:bg-green-500/10 border border-green-500/20">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shadow-sm">
              <CheckCircle size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-brand-charcoal dark:text-white">Arun_Kumar_Resume.pdf</p>
              <p className="text-xs text-green-600 font-medium mt-0.5 tracking-wide uppercase">Stored in Network · Active</p>
            </div>
            <button onClick={() => setUploaded(false)} className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-brand-cyan transition-colors" title="Replace Data">
              <RefreshCw size={18} />
            </button>
          </div>
        ) : (
          <div
            className="border-2 border-dashed border-surface-border dark:border-dark-border rounded-xl p-10 text-center cursor-pointer hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all duration-300 group"
            onClick={handleUpload}
          >
            <div className="w-16 h-16 bg-gray-50 dark:bg-dark-bg rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100 dark:border-gray-800 group-hover:border-brand-cyan/30 group-hover:scale-110 transition-all">
              <Upload size={32} className="text-gray-300 group-hover:text-brand-cyan" />
            </div>
            <h4 className="text-sm font-bold text-brand-charcoal dark:text-white mb-1">Initialize Data Upload</h4>
            <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">PDF, DOCX formats supported. Maximum capacity 5MB per node.</p>
            <button className="btn-outline btn-sm mt-6 group-hover:border-brand-cyan group-hover:text-brand-cyan">Identify File</button>
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
