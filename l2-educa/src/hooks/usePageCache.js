/**
 * Universal Page Cache Hook
 * Automatically manages formula cache per page
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { formulaCache } from '../utils/formulaCache';

export const usePageCache = () => {
  const location = useLocation();

  useEffect(() => {
    const handlePageCache = async () => {
      try {
        const currentPath = location.pathname;
        
        // Clear cache when on Terminal/Home
        if (currentPath === '/' || currentPath === '/terminal') {
          await formulaCache.clear();
          sessionStorage.removeItem('l2educa_current_page');
          
          if (import.meta.env.DEV) {
            console.log('🏠 Terminal: Cache cleared');
          }
        } else {
          // Set current page for content pages
          await formulaCache.setCurrentPage(currentPath);
        }
      } catch (error) {
        console.error('❌ Page cache error:', error);
        // Non-blocking error - cache is optional
      }
    };

    handlePageCache();
  }, [location.pathname]);
};

export default usePageCache;

