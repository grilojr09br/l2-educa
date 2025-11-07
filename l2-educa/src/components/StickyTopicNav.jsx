import React, { useState, useEffect, useRef } from 'react';
import './StickyTopicNav.css';

/**
 * Universal sticky navigation component for topic pages
 * Mobile: Bottom bar with horizontal scroll and morphing indicator
 * Desktop: Top dropdown menu
 * 
 * @param {Array} sections - Array of section objects [{id, title, icon}, ...]
 * @param {string} currentSection - ID of currently active section
 */
const StickyTopicNav = ({ sections = [], currentSection = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [ripples, setRipples] = useState([]);
  
  const navContainerRef = useRef(null);
  const itemRefs = useRef({});

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll visibility handler
  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show on scroll up, hide on scroll down (with delay)
      if (currentScrollY < lastScrollY) {
        // Scrolling up - show nav
        setIsVisible(true);
        if (scrollTimeout) clearTimeout(scrollTimeout);
      } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        // Scrolling down - hide nav after delay
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsVisible(false);
          setIsOpen(false); // Also close dropdown when hiding
        }, 300);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [lastScrollY]);

  // Update morphing indicator position (mobile only)
  useEffect(() => {
    if (!isMobile || !currentSection) return;

    const activeItem = itemRefs.current[currentSection];
    const container = navContainerRef.current;

    if (activeItem && container) {
      const itemRect = activeItem.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      setIndicatorStyle({
        left: itemRect.left - containerRect.left + container.scrollLeft,
        width: itemRect.width,
      });

      // Auto-scroll active item to center
      const itemCenter = activeItem.offsetLeft + activeItem.offsetWidth / 2;
      const containerCenter = container.offsetWidth / 2;
      const scrollPosition = itemCenter - containerCenter;

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [currentSection, isMobile, sections]);

  const scrollToSection = (sectionId, event = null) => {
    try {
      // Handle ripple effect for mobile
      if (isMobile && event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const ripple = {
          id: Date.now(),
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        setRipples(prev => [...prev, ripple]);
        
        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== ripple.id));
        }, 600);
      }

      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = isMobile ? -100 : -80; // Extra offset for bottom nav
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({ 
          top: y, 
          behavior: 'smooth' 
        });
        
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error scrolling to section:', error);
    }
  };

  // Swipe gesture handling (mobile only)
  useEffect(() => {
    if (!isMobile) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const handleTouchStart = (e) => {
      // Ignore if touching input/textarea or if multiple touches
      if (e.target.matches('input, textarea, select') || e.touches.length > 1) return;
      
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      touchEndX = e.touches[0].clientX;
      touchEndY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      // Only trigger if horizontal swipe is dominant (not vertical scroll)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        const currentIndex = sections.findIndex(s => s.id === currentSection);
        
        if (deltaX > 0 && currentIndex > 0) {
          // Swipe right - previous section
          scrollToSection(sections[currentIndex - 1].id);
        } else if (deltaX < 0 && currentIndex < sections.length - 1) {
          // Swipe left - next section
          scrollToSection(sections[currentIndex + 1].id);
        }
      }

      touchStartX = 0;
      touchStartY = 0;
      touchEndX = 0;
      touchEndY = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMobile, currentSection, sections]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.sticky-topic-nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  if (!sections || sections.length === 0) {
    return null;
  }

  // Mobile Bottom Navigation
  if (isMobile) {
    return (
      <div className={`sticky-topic-nav mobile-bottom ${isVisible ? 'visible' : 'hidden'}`}>
        <nav 
          className="nav-mobile-container" 
          ref={navContainerRef}
          role="navigation"
          aria-label="Navegação de seções"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              ref={(el) => (itemRefs.current[section.id] = el)}
              className={`nav-item-mobile ${currentSection === section.id ? 'active' : ''}`}
              onClick={(e) => scrollToSection(section.id, e)}
              aria-label={`Ir para ${section.title}`}
              aria-current={currentSection === section.id ? 'true' : 'false'}
            >
              <div className="nav-icon-wrapper">
                <span className="material-icons">{section.icon || 'article'}</span>
              </div>
              <span className="nav-label-mobile">{section.title}</span>
              
              {/* Ripple effects */}
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="ripple-effect"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                  }}
                />
              ))}
            </button>
          ))}
          
          {/* Morphing indicator blob */}
          <div
            className="nav-morphing-indicator"
            style={{
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width}px`,
            }}
            aria-hidden="true"
          />
        </nav>
      </div>
    );
  }

  // Desktop/Tablet Top Dropdown Navigation
  return (
    <div className={`sticky-topic-nav ${isVisible ? 'visible' : 'hidden'} ${isOpen ? 'open' : ''}`}>
      <button 
        className="nav-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fechar navegação' : 'Abrir navegação'}
        aria-expanded={isOpen}
      >
        <span className="material-icons menu-icon">menu</span>
        <span className="nav-label">Navegação</span>
        <span className="material-icons arrow-icon">{isOpen ? 'expand_less' : 'expand_more'}</span>
      </button>

      {isOpen && (
        <div className="nav-dropdown">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-item ${currentSection === section.id ? 'active' : ''}`}
              onClick={() => scrollToSection(section.id)}
            >
              <span className="material-icons item-icon">{section.icon || 'article'}</span>
              <span className="item-title">{section.title}</span>
              {currentSection === section.id && (
                <span className="active-indicator"></span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StickyTopicNav;

