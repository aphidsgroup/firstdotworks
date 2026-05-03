import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function FloatingChat() {
  const { settings } = useSiteSettings();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showAutoMessage, setShowAutoMessage] = useState(false);
  
  // Show automated message bubble shortly after mount if chat is enabled
  useEffect(() => {
    if (settings?.chatEnabled) {
      const timer = setTimeout(() => {
        setShowAutoMessage(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [settings?.chatEnabled]);

  if (!settings) return null;

  const { chatEnabled, whatsappEnabled, agentName, whatsappNumber, welcomeMessage } = settings;

  if (!chatEnabled && !whatsappEnabled) return null;

  const messageStr = encodeURIComponent(welcomeMessage || "Hi, I have a query regarding your services.");
  const cleanNumber = whatsappNumber?.replace(/[^0-9]/g, '') || "919941875131";
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${messageStr}`;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Live Chat Automated Bubble */}
      {chatEnabled && (
        <div className={`bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 rounded-2xl shadow-card-lg p-4 flex flex-col gap-2 transition-all duration-500 pointer-events-auto transform origin-bottom-right w-64 ${showAutoMessage && !isChatOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4 pointer-events-none'}`}>
          <div className="flex justify-between items-start">
             <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan relative flex-shrink-0">
                  <span className="text-[10px] font-bold">{agentName?.charAt(0) || 'A'}</span>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 border border-white dark:border-dark-card rounded-full"></span>
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{agentName}</p>
             </div>
             <button onClick={(e) => { e.stopPropagation(); setShowAutoMessage(false); }} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={14} /></button>
          </div>
          <div className="bg-gray-50 dark:bg-dark-bg rounded-xl rounded-tl-none p-3 mt-1">
            <p className="text-sm font-medium text-brand-charcoal dark:text-gray-200 leading-snug">{welcomeMessage}</p>
          </div>
          <button onClick={() => { setShowAutoMessage(false); setIsChatOpen(true); }} className="text-[10px] font-bold text-brand-cyan hover:text-brand-orange uppercase tracking-widest mt-1 text-left transition-colors">Reply via Live Chat →</button>
        </div>
      )}

      {/* Main Stacked Buttons */}
      <div className="flex flex-col gap-3 pointer-events-auto">
        
        {/* WhatsApp Icon */}
        {whatsappEnabled && (
           <a 
            href={whatsappUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-14 h-14 bg-[#25D366] hover:bg-[#1ebd5c] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-glow-cyan transition-all duration-300 hover:-translate-y-1 relative group"
            aria-label="Chat on WhatsApp"
            onClick={() => setShowAutoMessage(false)}
          >
            <span className="absolute -inset-2 bg-[#25D366]/30 rounded-full animate-ping opacity-75"></span>
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current relative z-10">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </a>
        )}

        {/* Live Chat Icon */}
        {chatEnabled && (
          <button 
            onClick={() => { setIsChatOpen(!isChatOpen); setShowAutoMessage(false); }}
            className={`w-14 h-14 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 relative group ${isChatOpen ? 'bg-gray-800 hover:bg-gray-700' : 'bg-brand-cyan hover:bg-brand-cyan/90 hover:-translate-y-1 hover:shadow-glow-cyan'}`}
            aria-label="Toggle Live Chat"
          >
            {isChatOpen ? <X size={24} /> : <MessageCircle size={28} />}
          </button>
        )}

      </div>
    </div>
  );
}
