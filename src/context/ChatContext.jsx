import { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export function useChat() {
  return useContext(ChatContext);
}

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('site_chats');
    return saved ? JSON.parse(saved) : [];
  });

  const [anonymousId] = useState(() => {
    let id = localStorage.getItem('chat_anon_id');
    if (!id) {
      id = `user_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chat_anon_id', id);
    }
    return id;
  });

  useEffect(() => {
    localStorage.setItem('site_chats', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (text, senderType = 'user', sessionId = anonymousId) => {
    if (!text.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      text,
      senderType, // 'user' or 'agent'
      sessionId,
      timestamp: new Date().toISOString(),
      read: senderType === 'agent' // auto-read agent messages for the user
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const getSessionMessages = (sessionId = anonymousId) => {
    return messages.filter(m => m.sessionId === sessionId);
  };

  const getActiveSessions = () => {
    const sessions = {};
    messages.forEach(m => {
      if (!sessions[m.sessionId]) {
        sessions[m.sessionId] = {
          id: m.sessionId,
          lastMessage: m,
          unreadCount: 0
        };
      }
      if (m.timestamp > sessions[m.sessionId].lastMessage.timestamp) {
        sessions[m.sessionId].lastMessage = m;
      }
      if (m.senderType === 'user' && !m.read) {
        sessions[m.sessionId].unreadCount++;
      }
    });
    return Object.values(sessions).sort((a, b) => 
      new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp)
    );
  };

  const markSessionAsRead = (sessionId) => {
    setMessages(prev => prev.map(m => 
      m.sessionId === sessionId && m.senderType === 'user' ? { ...m, read: true } : m
    ));
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      sendMessage, 
      getSessionMessages, 
      getActiveSessions, 
      markSessionAsRead,
      anonymousId 
    }}>
      {children}
    </ChatContext.Provider>
  );
}
