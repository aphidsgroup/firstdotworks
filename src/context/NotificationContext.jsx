import { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('site_notifications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('site_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (title, message, type = 'info', link = '#') => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      type,
      link,
      read: false,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      addNotification, 
      markAsRead, 
      markAllAsRead, 
      clearAll, 
      unreadCount 
    }}>
      {children}
    </NotificationContext.Provider>
  );
}
