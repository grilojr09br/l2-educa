/**
 * Performance Monitoring Hook
 * Monitors FPS, battery status, and provides auto-optimization
 */

import { useState, useEffect, useRef } from 'react';

export const usePerformance = () => {
  const [fps, setFps] = useState(60);
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [isCharging, setIsCharging] = useState(null);
  const [performanceMode, setPerformanceMode] = useState('normal'); // 'normal' | 'low-power'
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafIdRef = useRef(null);

  // FPS Monitoring
  useEffect(() => {
    let isActive = true;

    const measureFPS = () => {
      if (!isActive) return;

      frameCountRef.current++;
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTimeRef.current;

      // Update FPS every second
      if (deltaTime >= 1000) {
        const currentFPS = Math.round((frameCountRef.current * 1000) / deltaTime);
        setFps(currentFPS);
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;

        // Auto-switch to low-power mode if FPS is consistently low
        if (currentFPS < 30) {
          console.warn(`⚠️ Low FPS detected (${currentFPS}), considering low-power mode`);
          setPerformanceMode('low-power');
        } else if (currentFPS > 50 && performanceMode === 'low-power') {
          // Switch back to normal if FPS recovers
          setPerformanceMode('normal');
        }
      }

      rafIdRef.current = requestAnimationFrame(measureFPS);
    };

    rafIdRef.current = requestAnimationFrame(measureFPS);

    return () => {
      isActive = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [performanceMode]);

  // Battery Monitoring (if available)
  useEffect(() => {
    const updateBatteryStatus = (battery) => {
      setBatteryLevel(Math.round(battery.level * 100));
      setIsCharging(battery.charging);

      // Auto-enable low-power mode if battery is low and not charging
      if (battery.level < 0.20 && !battery.charging) {
        console.warn('🔋 Low battery detected, enabling low-power mode');
        setPerformanceMode('low-power');
      }
    };

    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        updateBatteryStatus(battery);

        // Listen for battery changes
        battery.addEventListener('levelchange', () => updateBatteryStatus(battery));
        battery.addEventListener('chargingchange', () => updateBatteryStatus(battery));
      }).catch((error) => {
        console.log('Battery API not available:', error);
      });
    }
  }, []);

  // Manual toggle
  const togglePerformanceMode = () => {
    setPerformanceMode((prev) => prev === 'normal' ? 'low-power' : 'normal');
  };

  return {
    fps,
    batteryLevel,
    isCharging,
    performanceMode,
    togglePerformanceMode,
    isLowPowerMode: performanceMode === 'low-power'
  };
};

export default usePerformance;

