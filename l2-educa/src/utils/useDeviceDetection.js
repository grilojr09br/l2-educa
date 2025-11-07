/**
 * Advanced Device Detection Hook
 * Detects device capabilities and classifies into performance tiers
 */

import { useState, useEffect } from 'react';

// Device tier configuration
const TIER_CONFIG = {
  high: {
    minRam: 4,
    minCores: 4,
    cacheSize: 200,
    lazyMargin: '300px',
    animations: 'full'
  },
  mid: {
    minRam: 2,
    minCores: 2,
    cacheSize: 100,
    lazyMargin: '200px',
    animations: 'normal'
  },
  low: {
    minRam: 0,
    minCores: 1,
    cacheSize: 50,
    lazyMargin: '100px',
    animations: 'reduced'
  }
};

/**
 * Detect GPU tier via WebGL
 */
const detectGPU = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) return 'unknown';
    
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      
      // High-end GPU indicators
      if (/nvidia|amd|radeon|geforce/i.test(renderer)) return 'high';
      // Integrated graphics
      if (/intel|integrated/i.test(renderer)) return 'mid';
      // Mobile GPUs
      if (/mali|adreno|powervr/i.test(renderer)) return 'mobile';
    }
    
    return 'unknown';
  } catch (error) {
    return 'unknown';
  }
};

/**
 * Detect connection quality
 */
const detectConnection = () => {
  if ('connection' in navigator) {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    return {
      effectiveType: conn.effectiveType || 'unknown',
      downlink: conn.downlink || 0,
      rtt: conn.rtt || 0,
      saveData: conn.saveData || false
    };
  }
  return {
    effectiveType: 'unknown',
    downlink: 0,
    rtt: 0,
    saveData: false
  };
};

/**
 * Detect device type
 */
const detectDeviceType = () => {
  const ua = navigator.userAgent;
  const width = window.innerWidth;
  
  // Check touch capability
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Mobile
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    return 'mobile';
  }
  
  // Tablet
  if (/iPad|Android/i.test(ua) && width >= 768) {
    return 'tablet';
  }
  
  // Desktop with touch
  if (hasTouch && width >= 1024) {
    return 'desktop-touch';
  }
  
  return 'desktop';
};

/**
 * Calculate device tier based on specs
 */
const calculateTier = (specs) => {
  const { ram, cores, deviceType, gpu } = specs;
  
  // Desktop - very biased towards high tier
  if (deviceType === 'desktop' || deviceType === 'desktop-touch') {
    // Any desktop with 8+ cores or 8+GB RAM is high-end
    if (ram >= 8 || cores >= 8) return 'high';
    // 4+ cores and 4+GB is still high for desktop
    if (ram >= 4 && cores >= 4) return 'high';
    // Only old desktops are mid
    if (ram >= 2 && cores >= 2) return 'mid';
    return 'low';
  }
  
  // Mobile/tablet classification (more strict)
  if (ram >= 6 && cores >= 6) return 'high';
  if (ram >= 4 && cores >= 4) return 'high';
  if (ram >= 2 && cores >= 2) return 'mid';
  
  // GPU fallback
  if (gpu === 'high') return 'high';
  if (gpu === 'mobile' && ram < 2) return 'low';
  
  return 'low';
};

/**
 * Get or create device profile
 */
export const getDeviceProfile = () => {
  try {
    const stored = localStorage.getItem('deviceProfile');
    if (stored) {
      const profile = JSON.parse(stored);
      // Check if profile is less than 7 days old
      const age = Date.now() - profile.timestamp;
      if (age < 7 * 24 * 60 * 60 * 1000) {
        return profile;
      }
    }
  } catch (error) {
    console.warn('Failed to load device profile from localStorage:', error);
  }
  
  return null;
};

/**
 * Create new device profile
 */
export const createDeviceProfile = () => {
  const deviceType = detectDeviceType();
  const ram = navigator.deviceMemory || 4; // Default to 4GB if unknown
  const cores = navigator.hardwareConcurrency || 2; // Default to 2 cores
  const gpu = detectGPU();
  const connection = detectConnection();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const specs = { ram, cores, deviceType, gpu };
  const tier = calculateTier(specs);
  
  const profile = {
    type: deviceType,
    tier: tier,
    ram: ram,
    cores: cores,
    gpu: gpu,
    connection: connection.effectiveType,
    downlink: connection.downlink,
    saveData: connection.saveData,
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: window.devicePixelRatio || 1,
      orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
    },
    capabilities: {
      touch: 'ontouchstart' in window,
      webgl: gpu !== 'unknown',
      serviceWorker: 'serviceWorker' in navigator,
      indexedDB: 'indexedDB' in window
    },
    timestamp: Date.now(),
    preferences: {
      reducedMotion: reducedMotion,
      dataMode: connection.saveData ? 'save' : 'normal'
    },
    config: TIER_CONFIG[tier]
  };
  
  // Save to localStorage
  try {
    localStorage.setItem('deviceProfile', JSON.stringify(profile));
  } catch (error) {
    console.warn('Failed to save device profile to localStorage:', error);
  }
  
  return profile;
};

/**
 * Hook to use device detection
 */
export const useDeviceDetection = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Try to load existing profile
    let deviceProfile = getDeviceProfile();
    
    // Create new profile if none exists or expired
    if (!deviceProfile) {
      deviceProfile = createDeviceProfile();
    }
    
    setProfile(deviceProfile);
    setIsLoading(false);
    
    // Log in dev mode
    if (import.meta.env.DEV) {
      console.log('📱 Device Profile:', deviceProfile);
    }
  }, []);
  
  return { profile, isLoading };
};

/**
 * Update device profile preferences
 */
export const updateDevicePreferences = (preferences) => {
  try {
    const stored = localStorage.getItem('deviceProfile');
    if (stored) {
      const profile = JSON.parse(stored);
      profile.preferences = { ...profile.preferences, ...preferences };
      profile.timestamp = Date.now();
      localStorage.setItem('deviceProfile', JSON.stringify(profile));
      return profile;
    }
  } catch (error) {
    console.warn('Failed to update device preferences:', error);
  }
  return null;
};

export default useDeviceDetection;

