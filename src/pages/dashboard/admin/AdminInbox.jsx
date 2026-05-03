import { useState, useEffect, useRef } from 'react';
import { Search, Send, User, MessageCircle, MoreVertical, CheckCheck, Clock } from 'lucide-react';
import { useChat } from '../../../context/ChatContext';

export default function AdminInbox() {
  const { getActiveSessions, getSessionMessages, sendMessage, markSessionAsRead } = useChat();
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [reply, setReply] = useState('');
  const scrollRef = useRef(null);

  const sessions = getActiveSessions();
  const activeMessages = selectedSessionId ? getSessionMessages(selectedSessionId) : [];

  useEffect(() => {
    if (selectedSessionId) {
      markSessionAsRead(selectedSessionId);
    }
  }, [selectedSessionId, activeMessages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!reply.trim() || !selectedSessionId) return;
    sendMessage(reply, 'agent', selectedSessionId);
    setReply('');
  };

  return (
    <div className="h-[calc(100vh-160px)] flex bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-card-lg animate-fade-in">
      
      {/* Sessions Sidebar */}
      <div className="w-80 border-r border-gray-100 dark:border-gray-800 flex flex-col bg-gray-50/30 dark:bg-dark-bg/30">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-surface">
          <h2 className="text-xl font-display font-bold dark:text-white mb-4">Support Inbox</h2>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search sessions..." className="input pl-10 bg-gray-50 dark:bg-dark-bg border-gray-200 dark:border-gray-800 h-10 text-sm" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sessions.length > 0 ? sessions.map(session => (
            <button
              key={session.id}
              onClick={() => setSelectedSessionId(session.id)}
              className={`w-full p-4 flex items-start gap-3 transition-colors text-left border-b border-gray-50 dark:border-gray-800/50 ${selectedSessionId === session.id ? 'bg-brand-cyan/5 border-r-2 border-r-brand-cyan' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 relative flex-shrink-0">
                <User size={20} />
                {session.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-dark-surface">
                    {session.unreadCount}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-bold text-brand-charcoal dark:text-white truncate uppercase tracking-tight">{session.id.split('_')[1] || 'Guest User'}</p>
                  <span className="text-[10px] font-medium text-gray-400">{new Date(session.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className={`text-xs truncate ${session.unreadCount > 0 ? 'text-brand-charcoal dark:text-white font-bold' : 'text-gray-500'}`}>
                  {session.lastMessage.senderType === 'agent' ? 'You: ' : ''}{session.lastMessage.text}
                </p>
              </div>
            </button>
          )) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-center px-6">
              <MessageCircle size={32} className="mb-4 opacity-20" />
              <p className="text-sm font-bold uppercase tracking-widest">No Active Sessions</p>
              <p className="text-xs mt-2">New messages from the website will appear here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-dark-surface relative">
        {selectedSessionId ? (
          <>
            {/* Chat Header */}
            <div className="h-20 px-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/80 dark:bg-dark-surface/80 backdrop-blur-xl sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan font-bold shadow-sm">
                  {selectedSessionId.split('_')[1]?.charAt(0).toUpperCase() || 'G'}
                </div>
                <div>
                  <h3 className="font-display font-bold text-brand-charcoal dark:text-white leading-none mb-1">{selectedSessionId.split('_')[1] || 'Guest User'}</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Node · Global Region</span>
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-brand-cyan transition-colors"><MoreVertical size={20} /></button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto space-y-6 bg-hero-pattern-light dark:bg-hero-pattern-dark">
              {activeMessages.map((msg, i) => (
                <div key={msg.id} className={`flex ${msg.senderType === 'agent' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${msg.senderType === 'agent' ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
                    <div className={`px-5 py-3.5 rounded-3xl text-sm leading-relaxed shadow-sm ${
                      msg.senderType === 'agent' 
                        ? 'bg-brand-cyan text-white rounded-tr-none shadow-glow-cyan' 
                        : 'bg-white dark:bg-dark-bg border border-gray-100 dark:border-gray-800 text-brand-charcoal dark:text-gray-200 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-2 px-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {msg.senderType === 'agent' && <CheckCheck size={14} className="text-brand-cyan" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 bg-white dark:bg-dark-surface border-t border-gray-100 dark:border-gray-800">
              <form onSubmit={handleSend} className="relative group">
                <input
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your secure response..."
                  className="w-full pl-6 pr-24 py-4 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan focus:bg-white transition-all duration-300"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-400 uppercase tracking-widest border border-gray-200 dark:border-gray-700">
                    <Clock size={12} /> 1h target
                  </div>
                  <button type="submit" className="w-10 h-10 bg-brand-cyan text-white rounded-xl flex items-center justify-center shadow-glow-cyan hover:scale-105 transition-all">
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-gray-400 bg-gray-50/20 dark:bg-dark-bg/20">
            <div className="w-20 h-20 rounded-3xl bg-white dark:bg-dark-surface border border-gray-100 dark:border-gray-800 flex items-center justify-center mb-6 shadow-sm">
              <MessageCircle size={40} className="text-gray-200 dark:text-gray-700" />
            </div>
            <h3 className="text-xl font-display font-bold text-brand-charcoal dark:text-white mb-2 tracking-tight">Select a Session</h3>
            <p className="text-sm max-w-sm font-medium leading-relaxed">Choose an active communication node from the sidebar to begin operational support.</p>
          </div>
        )}
      </div>
    </div>
  );
}
