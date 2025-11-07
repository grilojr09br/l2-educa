/**
 * Performance Context
 * Global state management for performance optimization
 * Only notifies user after sustained performance issues
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';
import { usePerformance } from '../utils/usePerformance';

const PerformanceContext = createContext();

export const usePerformanceContext = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformanceContext must be used within PerformanceProvider');
  }
  return context;
};

export const PerformanceProvider = ({ children }) => {
  const performanceData = usePerformance();
  const [showNotification, setShowNotification] = useState(false);
  const lowFpsTimerRef = useRef(null);
  const notificationShownRef = useRef(false);

  // Monitor page visibility
  const [isPageVisible, setIsPageVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden);
      // Reset notification when page becomes hidden
      if (document.hidden) {
        if (lowFpsTimerRef.current) {
          clearTimeout(lowFpsTimerRef.current);
          lowFpsTimerRef.current = null;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Monitor FPS and show notification after 5 seconds of low performance
  useEffect(() => {
    // Ignore if page is not visible
    if (!isPageVisible) {
      if (lowFpsTimerRef.current) {
        clearTimeout(lowFpsTimerRef.current);
        lowFpsTimerRef.current = null;
      }
      return;
    }

    // If FPS is low and page is visible
    if (performanceData.fps < 30 && isPageVisible) {
      // Start timer if not already started
      if (!lowFpsTimerRef.current && !notificationShownRef.current) {
        console.warn('⚠️ Low FPS detected, starting 5s timer...');
        lowFpsTimerRef.current = setTimeout(() => {
          console.warn('🔋 Sustained low FPS, showing performance notification');
          setShowNotification(true);
          notificationShownRef.current = true;
          lowFpsTimerRef.current = null;
        }, 5000); // 5 seconds
      }
    } else {
      // FPS recovered or page not visible, clear timer
      if (lowFpsTimerRef.current) {
        clearTimeout(lowFpsTimerRef.current);
        lowFpsTimerRef.current = null;
      }
    }

    return () => {
      if (lowFpsTimerRef.current) {
        clearTimeout(lowFpsTimerRef.current);
      }
    };
  }, [performanceData.fps, isPageVisible]);

  // Hide notification after 10 seconds
  useEffect(() => {
    if (showNotification) {
      const hideTimer = setTimeout(() => {
        setShowNotification(false);
      }, 10000); // 10 seconds

      return () => clearTimeout(hideTimer);
    }
  }, [showNotification]);

  // Memoize context value
  const contextValue = useMemo(() => ({
    ...performanceData,
    showNotification,
    isPageVisible
  }), [performanceData, showNotification, isPageVisible]);

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
      {showNotification && (
        <div className="performance-notification">
          <div className="performance-notification-content">
            <span className="material-icons">info</span>
            <div className="performance-notification-text">
              <strong>Performance Baixa Detectada</strong>
              <p>O site pode estar lento. Tente fechar outras abas ou apps.</p>
            </div>
            <button 
              className="performance-notification-close"
              onClick={() => setShowNotification(false)}
              aria-label="Fechar notificação"
            >
              <span className="material-icons">close</span>
            </button>
          </div>
        </div>
      )}
    </PerformanceContext.Provider>
  );
};

export default PerformanceProvider;

