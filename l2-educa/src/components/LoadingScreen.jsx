import React, { useEffect, useState } from 'react';
import { createDeviceProfile, getDeviceProfile } from '../utils/useDeviceDetection';
import './LoadingScreen.css';

// Loading tasks with weights and messages
const LOADING_TASKS = [
  { id: 'device', weight: 15, message: 'Detectando dispositivo...', duration: 200 },
  { id: 'resources', weight: 25, message: 'Carregando recursos essenciais...', duration: 400 },
  { id: 'fonts', weight: 20, message: 'Preparando fontes e ícones...', duration: 300 },
  { id: 'optimize', weight: 20, message: 'Otimizando para seu dispositivo...', duration: 300 },
  { id: 'finalize', weight: 20, message: 'Quase pronto...', duration: 200 }
];

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [deviceProfile, setDeviceProfile] = useState(null);
  const [startTime] = useState(Date.now());

  // Execute loading tasks sequentially
  useEffect(() => {
    let mounted = true;
    
    const executeAllTasks = async () => {
      let localDeviceProfile = null;
      
      for (let taskIndex = 0; taskIndex < LOADING_TASKS.length; taskIndex++) {
        if (!mounted) return;
        
        const task = LOADING_TASKS[taskIndex];
        const previousWeight = LOADING_TASKS.slice(0, taskIndex).reduce((sum, t) => sum + t.weight, 0);
        
        setCurrentTask(taskIndex);
        
        // Execute task logic
        try {
          if (task.id === 'device') {
            // Detect or load device profile
            let profile = getDeviceProfile();
            if (!profile) {
              profile = createDeviceProfile();
            }
            localDeviceProfile = profile;
            setDeviceProfile(profile);
            
            if (import.meta.env.DEV) {
              console.log('📱 Device detected:', profile.type, '|', profile.tier, '|', profile.ram + 'GB', '|', profile.cores + ' cores');
            }
          } else if (task.id === 'fonts') {
            // Check if fonts are loaded
            if (document.fonts) {
              try {
                await Promise.race([
                  document.fonts.ready,
                  new Promise(resolve => setTimeout(resolve, 1000)) // Timeout after 1s
                ]);
              } catch (e) {
                // Ignore font loading errors
              }
            }
          } else if (task.id === 'optimize') {
            // Apply device-specific optimizations
            if (localDeviceProfile) {
              document.body.classList.add(`device-${localDeviceProfile.tier}`);
              document.body.classList.add(`device-${localDeviceProfile.type}`);
            }
          }
        } catch (error) {
          console.warn(`Task ${task.id} failed:`, error);
        }
        
        // Animate progress for this task
        const steps = 20;
        const increment = task.weight / steps;
        const stepDuration = task.duration / steps;
        
        for (let i = 0; i <= steps; i++) {
          if (!mounted) return;
          await new Promise(resolve => setTimeout(resolve, stepDuration));
          const newProgress = Math.min(previousWeight + (increment * i), previousWeight + task.weight);
          setProgress(Math.round(newProgress));
        }
      }
    };
    
    executeAllTasks();
    
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const elapsed = Date.now() - startTime;
      const minDuration = 1000; // Minimum 1 second
      const remainingTime = Math.max(0, minDuration - elapsed);
      
      setTimeout(() => {
        if (import.meta.env.DEV) {
          console.log(`✅ Loading complete in ${Math.round((Date.now() - startTime) / 1000)}s`);
        }
        
        setIsHidden(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800); // Wait for fade out animation
      }, remainingTime);
    }
  }, [progress, onComplete, startTime]);

  const letters = ['L', '2', ' ', 'E', 'D', 'U', 'C', 'A'];
  const currentMessage = LOADING_TASKS[currentTask]?.message || 'Carregando...';

  return (
    <div className={`loading-overlay ${isHidden ? 'hidden' : ''}`}>
      <div className="loading-content">
        <div className="loading-logo-wrapper">
          <div className="rotating-gradient-ring"></div>
          <div className="logo-text-container">
            {letters.map((letter, index) => (
              <span 
                key={index} 
                className="logo-letter"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
        <div className="loading-bar-container">
          <div 
            className="loading-bar-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="loading-text">{currentMessage}</div>
      </div>
    </div>
  );
};

export default LoadingScreen;

