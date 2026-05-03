import { X, Briefcase, MapPin, IndianRupee, Layers, Users, Calendar } from 'lucide-react'

export function JobPostingModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-charcoal/80 backdrop-blur-md animate-fade-in" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-dark-surface rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-800/50 flex items-center justify-between bg-gray-50/50 dark:bg-dark-bg/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shadow-glow-cyan">
              <Briefcase size={20} />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-brand-charcoal dark:text-white">Initialize New Mandate</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-0.5">Mandate ID: SEQ-{Math.floor(1000 + Math.random() * 9000)}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-brand-charcoal dark:hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form body */}
        <div className="p-8 overflow-y-auto space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <Briefcase size={12} /> Mandate Title
              </label>
              <input type="text" placeholder="e.g. Senior Logic Architect" className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 focus:border-brand-cyan/50 focus:ring-brand-cyan/20 h-12" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <Layers size={12} /> Partner Entity
              </label>
              <select className="select bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 h-12">
                <option value="">Select Entity</option>
                <option value="comp_001">TechCorp Solutions</option>
                <option value="comp_002">Nexus Retail Group</option>
                <option value="comp_003">PixelCraft Studio</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <MapPin size={12} /> Geographic Sector
              </label>
              <input type="text" placeholder="Chennai, Remote..." className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 h-12" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <IndianRupee size={12} /> Compensation Range (LPA)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="Min" className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 h-12" />
                <input type="number" placeholder="Max" className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <Users size={12} /> Cycle Nodes (Experience)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="Min y" className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 h-12" />
                <input type="number" placeholder="Max y" className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <Calendar size={12} /> Termination Date
              </label>
              <input type="date" className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 h-12" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
              Mandate Specifications
            </label>
            <textarea placeholder="Describe the mission parameters..." className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 min-h-[120px] py-3" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
              Stack Competencies
            </label>
            <input type="text" placeholder="e.g. React, TypeScript, GraphQL (Press Enter to add)" className="input bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 h-12" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-gray-100 dark:border-gray-800/50 flex items-center justify-end gap-4 bg-gray-50/30 dark:bg-dark-bg/30">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-gray-500 font-bold uppercase tracking-wider text-xs hover:text-brand-charcoal dark:hover:text-white transition-colors">Discard</button>
          <button className="btn-primary shadow-glow-cyan px-8 py-3 h-12 text-xs">Publish Mandate</button>
        </div>
      </div>
    </div>
  )
}
