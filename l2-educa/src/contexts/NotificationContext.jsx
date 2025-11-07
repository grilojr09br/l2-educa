import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(undefined);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: notification.type || 'info', // success, error, warning, info
      message: notification.message,
      duration: notification.duration || 5000,
      ...notification,
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Auto-dismiss
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    // Helper functions
    success: (message, options = {}) => addNotification({ type: 'success', message, ...options }),
    error: (message, options = {}) => addNotification({ type: 'error', message, ...options }),
    warning: (message, options = {}) => addNotification({ type: 'warning', message, ...options }),
    info: (message, options = {}) => addNotification({ type: 'info', message, ...options }),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};


