import React, { useState } from 'react';
import './CardGlowEffect.css';

/**
 * HOC that adds glow effect on click before navigation
 */
const withCardGlow = (WrappedComponent) => {
  return function CardWithGlow(props) {
    const [isGlowing, setIsGlowing] = useState(false);
    const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

    const handleClick = (e, originalOnClick) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setGlowPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      
      setIsGlowing(true);

      // Wait for glow animation
      setTimeout(() => {
        if (originalOnClick) {
          originalOnClick(e);
        }
        setTimeout(() => setIsGlowing(false), 300);
      }, 600);
    };

    return (
      <div className={`card-glow-wrapper ${isGlowing ? 'glowing' : ''}`}>
        {isGlowing && (
          <div 
            className="click-glow-effect" 
            style={{
              left: `${glowPosition.x}px`,
              top: `${glowPosition.y}px`
            }}
          />
        )}
        <WrappedComponent {...props} onGlowClick={handleClick} />
      </div>
    );
  };
};

export default withCardGlow;

