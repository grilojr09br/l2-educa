/**
 * Utility functions for mobile device and orientation detection
 */

/**
 * Check if the current device is a mobile device
 * @returns {boolean} True if mobile device
 */
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Check if the device is in portrait orientation
 * @returns {boolean} True if portrait orientation
 */
export const isPortraitOrientation = () => {
  return window.innerHeight > window.innerWidth;
};

/**
 * Check if device is mobile AND in portrait mode
 * @returns {boolean} True if mobile in portrait
 */
export const isMobilePortrait = () => {
  return isMobileDevice() && isPortraitOrientation();
};

/**
 * Add a class to body based on device and orientation
 * Call this on mount and orientation change
 */
export const updateOrientationClass = () => {
  const body = document.body;
  
  // Remove existing orientation classes
  body.classList.remove('mobile-portrait', 'mobile-landscape', 'desktop');
  
  if (isMobileDevice()) {
    if (isPortraitOrientation()) {
      body.classList.add('mobile-portrait');
    } else {
      body.classList.add('mobile-landscape');
    }
  } else {
    body.classList.add('desktop');
  }
};

/**
 * Hook to listen for orientation changes
 * @param {Function} callback Function to call on orientation change
 */
export const useOrientationChange = (callback) => {
  if (typeof window === 'undefined') return;
  
  const handleOrientationChange = () => {
    updateOrientationClass();
    if (callback) callback();
  };
  
  window.addEventListener('resize', handleOrientationChange);
  window.addEventListener('orientationchange', handleOrientationChange);
  
  // Initial call
  handleOrientationChange();
  
  return () => {
    window.removeEventListener('resize', handleOrientationChange);
    window.removeEventListener('orientationchange', handleOrientationChange);
  };
};

