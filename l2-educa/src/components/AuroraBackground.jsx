import React, { useEffect, useRef, useState } from 'react';
import './AuroraBackground.css';

const AuroraBackground = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                      window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Pause animations when not visible (desktop only, since mobile is static)
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsPaused(!entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    observer.observe(container);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className={`aurora-background ${isMobile ? 'mobile-static' : ''} ${isPaused ? 'paused' : ''}`}
    >
      <div className="aurora-blob aurora-blob-1"></div>
      <div className="aurora-blob aurora-blob-2"></div>
      <div className="aurora-blob aurora-blob-3"></div>
      <div className="aurora-blob aurora-blob-4"></div>
    </div>
  );
};

export default AuroraBackground;

