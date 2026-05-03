import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "919941875131"; // Assuming Indian number
  const message = encodeURIComponent("Hi Deepa, I have a query regarding Firstdot Works services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Automated Chat Bubble (Deepa) */}
      <div className={`bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 rounded-2xl shadow-card-lg p-3 flex items-center gap-3 transition-all duration-300 pointer-events-auto transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] relative flex-shrink-0">
          <MessageCircle size={20} />
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-dark-card rounded-full animate-pulse"></span>
        </div>
        <div className="pr-4">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Chat with</p>
          <p className="text-sm font-bold text-brand-charcoal dark:text-white leading-tight">Deepa from Firstdotworks</p>
        </div>
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
          aria-label="Chat with Deepa on WhatsApp"
        />
        <button 
          onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} 
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 z-20 transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* Main WhatsApp Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#25D366] hover:bg-[#1ebd5c] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-glow-cyan transition-all duration-300 hover:-translate-y-1 pointer-events-auto relative group"
        aria-label="Toggle WhatsApp Chat"
      >
        <span className="absolute -inset-2 bg-[#25D366]/30 rounded-full animate-ping opacity-75"></span>
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </button>
    </div>
  );
}
