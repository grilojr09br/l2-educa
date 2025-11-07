import React, { useState, useEffect } from 'react';
import './MobileOrientationNotification.css';

/**
 * Component that shows a notification on mobile devices
 * suggesting landscape orientation for better formula viewing
 * Uses acid liquid glass design with animated rotation icon
 */
const MobileOrientationNotification = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if it's a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Show notification
      setShow(true);
      
      // Auto-hide after 6 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="mobile-orientation-notification">
      <div className="notification-glass-container">
        {/* Animated circles for acid glass effect */}
        <div className="glass-circle circle-1"></div>
        <div className="glass-circle circle-2"></div>
        <div className="glass-circle circle-3"></div>
        <div className="glass-circle circle-4"></div>
        
        <div className="notification-content">
          {/* Animated rotation icon */}
          <div className="rotation-icon-wrapper">
            <svg className="rotation-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Phone outline */}
              <rect className="phone-outline" x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              {/* Rotation arrows */}
              <path className="rotation-arrow" d="M2 12 L4 10 L4 14 Z" fill="currentColor"/>
              <path className="rotation-arrow" d="M22 12 L20 10 L20 14 Z" fill="currentColor"/>
              {/* Curved arrows */}
              <path className="rotation-curve" d="M3 8 Q2 12 3 16" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path className="rotation-curve" d="M21 8 Q22 12 21 16" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
          
          <div className="notification-text">
            <p className="notification-title">Melhor Visualização</p>
            <p className="notification-message">Gire o celular para horizontal e visualize as fórmulas completas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileOrientationNotification;

