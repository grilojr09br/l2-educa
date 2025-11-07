import { useState, useEffect } from 'react';

/**
 * Hook to detect which section is currently visible in viewport
 * Uses Intersection Observer API
 * 
 * @param {string[]} sectionIds - Array of section IDs to observe
 * @returns {string} - The ID of the currently active section
 */
export const useSectionDetection = (sectionIds) => {
  const [currentSection, setCurrentSection] = useState('');

  useEffect(() => {
    try {
      if (!sectionIds || sectionIds.length === 0) {
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCurrentSection(entry.target.id);
            }
          });
        },
        { 
          threshold: 0.3,
          rootMargin: '-80px 0px -80% 0px'
        }
      );

      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });

      return () => observer.disconnect();
    } catch (error) {
      console.error('Error in useSectionDetection:', error);
    }
  }, [sectionIds]);

  return currentSection;
};

export default useSectionDetection;

