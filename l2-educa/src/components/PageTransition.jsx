import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import './PageTransition.css';

const PageTransition = () => {
  const { isTransitioning, transitionColor } = useNavigation();

  if (!isTransitioning) return null;

  return (
    <div className={`page-transition-overlay ${transitionColor}`}>
      <div className="liquid-container">
        <div className="liquid-wave wave-1"></div>
        <div className="liquid-wave wave-2"></div>
        <div className="liquid-wave wave-3"></div>
      </div>
      <div className="shimmer-effect"></div>
      <div className="transition-particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.4}s`,
            animationDuration: `${0.8 + Math.random() * 0.4}s`
          }}></div>
        ))}
      </div>
    </div>
  );
};

export default PageTransition;

