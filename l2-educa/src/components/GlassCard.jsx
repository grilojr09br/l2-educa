import React from 'react';
import './GlassCard.css';

const GlassCard = ({ children, className = '', style = {} }) => {
  return (
    <div className={`glass-card ${className}`} style={style}>
      {children}
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(GlassCard);

