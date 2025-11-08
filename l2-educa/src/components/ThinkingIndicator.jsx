import React from 'react';
import './ThinkingIndicator.css';

/**
 * Thinking Indicator Component
 * Shows an animated brain icon with gradient and "Pensando..." text
 * Used while AI is generating a response
 */
const ThinkingIndicator = () => {
  return (
    <div className="thinking-indicator">
      <div className="thinking-icon-wrapper">
        {/* Animated Brain Icon */}
        <svg 
          className="thinking-brain-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            
            {/* Animated gradient for glow effect */}
            <linearGradient id="brainGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3">
                <animate attributeName="stopOpacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5">
                <animate attributeName="stopOpacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3">
                <animate attributeName="stopOpacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          
          {/* Outer glow circle */}
          <circle 
            cx="12" 
            cy="12" 
            r="10" 
            fill="url(#brainGlowGradient)" 
            opacity="0.2"
            className="thinking-glow-circle"
          />
          
          {/* Brain icon path */}
          <path 
            d="M12 3C10.9 3 9.96 3.45 9.29 4.17C8.75 3.44 7.92 3 7 3C5.34 3 4 4.34 4 6C4 6.35 4.07 6.68 4.18 7C3.49 7.4 3 8.15 3 9C3 10.1 3.9 11 5 11C5 13.38 6.5 15.44 8.67 16.36C8.88 17.45 9.82 18.26 10.96 18.26C11.22 18.26 11.46 18.21 11.69 18.13C11.88 19.21 12.83 20 14 20C15.3 20 16.38 19.05 16.62 17.81C18.61 16.79 20 14.65 20 12.19C20.91 12.09 21.63 11.35 21.88 10.42C21.96 10.29 22 10.15 22 10C22 9.45 21.78 8.95 21.42 8.58C21.78 8.21 22 7.64 22 7C22 5.9 21.1 5 20 5C19.62 5 19.26 5.11 18.95 5.3C18.63 4.5 17.86 4 17 4C16.62 4 16.26 4.11 15.95 4.3C15.42 3.5 14.5 3 13.5 3C12.67 3 12 3.67 12 4.5V3Z" 
            fill="url(#brainGradient)"
            className="thinking-brain-path"
          />
          
          {/* Animated synapse dots */}
          <circle cx="8" cy="9" r="1" fill="#fff" opacity="0.8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="12" cy="8" r="1" fill="#fff" opacity="0.8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="16" cy="10" r="1" fill="#fff" opacity="0.8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="10" cy="13" r="1" fill="#fff" opacity="0.8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="0.9s" repeatCount="indefinite" />
          </circle>
          <circle cx="14" cy="14" r="1" fill="#fff" opacity="0.8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" begin="1.2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      
      {/* Animated text */}
      <div className="thinking-text">
        <span className="thinking-main-text">Pensando</span>
        <span className="thinking-dots">
          <span className="thinking-dot thinking-dot-1">.</span>
          <span className="thinking-dot thinking-dot-2">.</span>
          <span className="thinking-dot thinking-dot-3">.</span>
        </span>
      </div>
    </div>
  );
};

export default ThinkingIndicator;

