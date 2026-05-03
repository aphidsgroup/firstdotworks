import { useState } from 'react'
import { Save, Shield, MessageCircle, Settings as SettingsIcon, CheckCircle, Smartphone } from 'lucide-react'
import { useSiteSettings } from '../../../context/SiteSettingsContext'
import { useAuth } from '../../../context/AuthContext'

export default function AdminSettings() {
  const { settings, updateSettings } = useSiteSettings()
  const { currentUser } = useAuth()
  
  const [form, setForm] = useState({
    siteName: settings.siteName,
    contactEmail: settings.contactEmail,
    chatEnabled: settings.chatEnabled,
    whatsappEnabled: settings.whatsappEnabled,
    agentName: settings.agentName,
    agentTitle: settings.agentTitle,
    agentStatus: settings.agentStatus,
    widgetColor: settings.widgetColor,
    whatsappNumber: settings.whatsappNumber,
    welcomeMessage: settings.welcomeMessage,
  })
  
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' })
  const [saved, setSaved] = useState(false)
  const [pwdSaved, setPwdSaved] = useState(false)

  const handleSaveSettings = (e) => {
    e.preventDefault()
    updateSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleSavePassword = (e) => {
    e.preventDefault()
    if (passwordForm.new !== passwordForm.confirm) {
      alert("Passwords don't match")
      return
    }
    // Simulate password change
    setPwdSaved(true)
    setTimeout(() => {
      setPwdSaved(false)
      setPasswordForm({ current: '', new: '', confirm: '' })
    }, 2000)
  }

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal dark:text-white tracking-tight">System Configuration</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">Complete CMS controls and platform settings</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Chat & Widget Configuration */}
          <form onSubmit={handleSaveSettings} className="card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan"><MessageCircle size={20} /></div>
              <div>
                <h3 className="text-lg font-bold dark:text-white leading-tight">Chat Widget Configuration</h3>
                <p className="text-xs text-gray-400">Manage the dual floating chat system</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-12 h-6 rounded-full transition-colors relative ${form.chatEnabled ? 'bg-brand-cyan' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.chatEnabled ? 'left-7' : 'left-1'}`} />
                  </div>
                  <input type="checkbox" className="hidden" checked={form.chatEnabled} onChange={e => setForm({...form, chatEnabled: e.target.checked})} />
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-300">Enable Live Chat (Agent Bubble)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-12 h-6 rounded-full transition-colors relative ${form.whatsappEnabled ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.whatsappEnabled ? 'left-7' : 'left-1'}`} />
                  </div>
                  <input type="checkbox" className="hidden" checked={form.whatsappEnabled} onChange={e => setForm({...form, whatsappEnabled: e.target.checked})} />
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-300">Enable WhatsApp Button</span>
                </label>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Agent Name</label>
                  <input type="text" required className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800" value={form.agentName} onChange={e => setForm({...form, agentName: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Agent Title / Role</label>
                  <input type="text" required className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800" value={form.agentTitle} onChange={e => setForm({...form, agentTitle: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Agent Status</label>
                  <select className="select bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800" value={form.agentStatus} onChange={e => setForm({...form, agentStatus: e.target.value})}>
                    <option value="online">Online</option>
                    <option value="away">Away / Busy</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Widget Accent Color</label>
                  <div className="flex gap-3">
                    <input type="color" className="w-11 h-11 rounded-xl cursor-pointer bg-transparent border-none" value={form.widgetColor} onChange={e => setForm({...form, widgetColor: e.target.value})} />
                    <input type="text" className="input flex-1 bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 uppercase font-mono text-xs" value={form.widgetColor} onChange={e => setForm({...form, widgetColor: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">WhatsApp Number</label>
                  <input type="text" required className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800" value={form.whatsappNumber} onChange={e => setForm({...form, whatsappNumber: e.target.value})} />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Automated Welcome Message</label>
                  <textarea rows="2" required className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 resize-none py-3" value={form.welcomeMessage} onChange={e => setForm({...form, welcomeMessage: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              {saved ? (
                <span className="flex items-center gap-2 text-green-500 text-sm font-bold"><CheckCircle size={16} /> Saved Successfully</span>
              ) : <span />}
              <button type="submit" className="btn-primary shadow-glow-cyan"><Save size={16} className="mr-2" /> Apply Changes</button>
            </div>
          </form>

          {/* Platform Branding */}
          <form onSubmit={handleSaveSettings} className="card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6 space-y-6">
             <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500"><SettingsIcon size={20} /></div>
              <div>
                <h3 className="text-lg font-bold dark:text-white leading-tight">Global Branding</h3>
                <p className="text-xs text-gray-400">Core platform details</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
               <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Platform Name</label>
                  <input type="text" required className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800" value={form.siteName} onChange={e => setForm({...form, siteName: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Global Contact Email</label>
                  <input type="email" required className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800" value={form.contactEmail} onChange={e => setForm({...form, contactEmail: e.target.value})} />
                </div>
            </div>
            <div className="pt-4 flex justify-end">
              <button type="submit" className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors uppercase tracking-widest text-[10px]"><Save size={14} className="mr-2 inline" /> Update Platform</button>
            </div>
          </form>
        </div>

        {/* Security / Sidebar */}
        <div className="space-y-6">
          <form onSubmit={handleSavePassword} className="card bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 p-6 space-y-6">
             <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500"><Shield size={20} /></div>
              <div>
                <h3 className="text-lg font-bold dark:text-white leading-tight">Account Security</h3>
                <p className="text-xs text-gray-400">Admin password controls</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Current Password</label>
                <input type="password" required className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800" value={passwordForm.current} onChange={e => setPasswordForm({...passwordForm, current: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">New Password</label>
                <input type="password" required className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800" value={passwordForm.new} onChange={e => setPasswordForm({...passwordForm, new: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Confirm Password</label>
                <input type="password" required className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800" value={passwordForm.confirm} onChange={e => setPasswordForm({...passwordForm, confirm: e.target.value})} />
              </div>
            </div>
            <div className="pt-2">
              <button type="submit" className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-rose-500/20 transition-all text-sm">{pwdSaved ? 'Password Updated' : 'Change Password'}</button>
            </div>
          </form>

          {/* Device Preview Info */}
           <div className="card bg-brand-cyan/5 border border-brand-cyan/20 p-5 rounded-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center mb-3">
              <Smartphone size={24} />
            </div>
            <p className="text-sm font-bold text-brand-charcoal dark:text-white mb-1">Live Updates</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Changes made to the chat widget configuration reflect immediately across the entire platform.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
