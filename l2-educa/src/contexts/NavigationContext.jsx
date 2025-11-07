import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSubjectFromPath, getTopicFromPath } from '../config/subjectsConfig';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionColor, setTransitionColor] = useState('purple');
  
  // Track current location context for chatbot integration
  const [currentSubject, setCurrentSubject] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  
  // Update context when location changes
  useEffect(() => {
    const subject = getSubjectFromPath(location.pathname);
    const topic = subject ? getTopicFromPath(location.pathname, subject) : null;
    
    setCurrentSubject(subject);
    setCurrentTopic(topic);
  }, [location.pathname]);

  const navigateWithTransition = useCallback((to, color = 'purple') => {
    // Set transition color
    setTransitionColor(color);
    
    // Start transition
    setIsTransitioning(true);

    // Wait for card glow animation (600ms) then navigate
    setTimeout(() => {
      navigate(to);
      
      // End transition after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1200);
    }, 600);
  }, [navigate]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    navigateWithTransition,
    isTransitioning,
    transitionColor,
    currentSubject,
    currentTopic,
    currentPath: location.pathname
  }), [navigateWithTransition, isTransitioning, transitionColor, currentSubject, currentTopic, location.pathname]);

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

