// Progress tracking system for topics
// Persists user progress in localStorage

const PROGRESS_KEY = 'l2educa_progress';

// Check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    console.warn('localStorage is not available:', error);
    return false;
  }
};

// Get all progress data
export const getAllProgress = () => {
  try {
    if (!isLocalStorageAvailable()) {
      console.warn('localStorage not available, returning empty progress');
      return {};
    }

    const stored = localStorage.getItem(PROGRESS_KEY);
    
    if (!stored) {
      return {};
    }

    const parsed = JSON.parse(stored);
    
    // Validate parsed data structure
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      console.error('Invalid progress data structure, resetting');
      return {};
    }

    return parsed;
  } catch (error) {
    console.error('Error reading progress:', error);
    // Try to clear corrupted data
    try {
      localStorage.removeItem(PROGRESS_KEY);
    } catch (e) {
      console.error('Cannot clear corrupted progress data:', e);
    }
    return {};
  }
};

// Save progress data
const saveProgress = (progressData) => {
  try {
    if (!isLocalStorageAvailable()) {
      console.warn('localStorage not available, cannot save progress');
      return false;
    }

    if (!progressData || typeof progressData !== 'object') {
      console.error('Invalid progress data, cannot save');
      return false;
    }

    const jsonString = JSON.stringify(progressData);
    localStorage.setItem(PROGRESS_KEY, jsonString);
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Consider clearing old data.');
    } else {
      console.error('Error saving progress:', error);
    }
    return false;
  }
};

// Mark topic as visited
export const markTopicVisited = (subjectId, topicId) => {
  try {
    if (!subjectId || !topicId || typeof subjectId !== 'string' || typeof topicId !== 'string') {
      console.error('Invalid subjectId or topicId:', { subjectId, topicId });
      return false;
    }

    const progress = getAllProgress();
    
    if (!progress[subjectId]) {
      progress[subjectId] = {};
    }
    
    if (!progress[subjectId][topicId]) {
      progress[subjectId][topicId] = {
        visited: true,
        lastVisited: Date.now(),
        completed: false,
      };
    } else {
      progress[subjectId][topicId].visited = true;
      progress[subjectId][topicId].lastVisited = Date.now();
    }
    
    return saveProgress(progress);
  } catch (error) {
    console.error('Error marking topic as visited:', error);
    return false;
  }
};

// Mark topic as completed
export const markTopicCompleted = (subjectId, topicId, completed = true) => {
  try {
    if (!subjectId || !topicId || typeof subjectId !== 'string' || typeof topicId !== 'string') {
      console.error('Invalid subjectId or topicId:', { subjectId, topicId });
      return false;
    }

    if (typeof completed !== 'boolean') {
      console.error('Invalid completed value, must be boolean:', completed);
      return false;
    }

    const progress = getAllProgress();
    
    if (!progress[subjectId]) {
      progress[subjectId] = {};
    }
    
    if (!progress[subjectId][topicId]) {
      progress[subjectId][topicId] = {
        visited: true,
        lastVisited: Date.now(),
        completed: completed,
        completedAt: completed ? Date.now() : null,
      };
    } else {
      progress[subjectId][topicId].completed = completed;
      progress[subjectId][topicId].completedAt = completed ? Date.now() : null;
    }
    
    return saveProgress(progress);
  } catch (error) {
    console.error('Error marking topic as completed:', error);
    return false;
  }
};

// Get topic progress
export const getTopicProgress = (subjectId, topicId) => {
  try {
    if (!subjectId || !topicId) {
      console.warn('Invalid subjectId or topicId:', { subjectId, topicId });
      return {
        visited: false,
        completed: false,
        lastVisited: null,
        completedAt: null,
      };
    }

    const progress = getAllProgress();
    const topicProgress = progress[subjectId]?.[topicId];

    // Validate topic progress structure
    if (topicProgress && typeof topicProgress === 'object') {
      return {
        visited: Boolean(topicProgress.visited),
        completed: Boolean(topicProgress.completed),
        lastVisited: topicProgress.lastVisited || null,
        completedAt: topicProgress.completedAt || null,
      };
    }

    return {
      visited: false,
      completed: false,
      lastVisited: null,
      completedAt: null,
    };
  } catch (error) {
    console.error('Error getting topic progress:', error);
    return {
      visited: false,
      completed: false,
      lastVisited: null,
      completedAt: null,
    };
  }
};

// Get subject progress stats
export const getSubjectProgress = (subjectId, totalTopics) => {
  try {
    if (!subjectId || typeof subjectId !== 'string') {
      console.warn('Invalid subjectId:', subjectId);
      return {
        visited: 0,
        completed: 0,
        total: 0,
        visitedPercentage: 0,
        completedPercentage: 0,
      };
    }

    const total = typeof totalTopics === 'number' && totalTopics >= 0 ? totalTopics : 0;
    const progress = getAllProgress();
    const subjectProgress = progress[subjectId] || {};
    
    let visited = 0;
    let completed = 0;
    
    for (const topicId in subjectProgress) {
      const topicData = subjectProgress[topicId];
      if (topicData && typeof topicData === 'object') {
        if (topicData.visited) visited++;
        if (topicData.completed) completed++;
      }
    }
    
    return {
      visited,
      completed,
      total,
      visitedPercentage: total > 0 ? Math.min(100, Math.round((visited / total) * 100)) : 0,
      completedPercentage: total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0,
    };
  } catch (error) {
    console.error('Error getting subject progress:', error);
    return {
      visited: 0,
      completed: 0,
      total: 0,
      visitedPercentage: 0,
      completedPercentage: 0,
    };
  }
};

// React hook for progress tracking
import { useState, useEffect, useCallback } from 'react';

export const useProgress = (subjectId, topicId) => {
  const [progress, setProgress] = useState(() => {
    try {
      return topicId ? getTopicProgress(subjectId, topicId) : null;
    } catch (error) {
      console.error('Error initializing progress state:', error);
      return null;
    }
  });
  
  useEffect(() => {
    try {
      if (topicId) {
        setProgress(getTopicProgress(subjectId, topicId));
      }
    } catch (error) {
      console.error('Error updating progress in useEffect:', error);
    }
  }, [subjectId, topicId]);
  
  const markVisited = useCallback(() => {
    try {
      if (subjectId && topicId) {
        const success = markTopicVisited(subjectId, topicId);
        if (success) {
          setProgress(getTopicProgress(subjectId, topicId));
        }
      } else {
        console.warn('Cannot mark as visited: missing subjectId or topicId');
      }
    } catch (error) {
      console.error('Error in markVisited:', error);
    }
  }, [subjectId, topicId]);
  
  const markCompleted = useCallback((completed = true) => {
    try {
      if (subjectId && topicId) {
        const success = markTopicCompleted(subjectId, topicId, completed);
        if (success) {
          setProgress(getTopicProgress(subjectId, topicId));
        }
      } else {
        console.warn('Cannot mark as completed: missing subjectId or topicId');
      }
    } catch (error) {
      console.error('Error in markCompleted:', error);
    }
  }, [subjectId, topicId]);
  
  return {
    progress,
    markVisited,
    markCompleted,
    isVisited: progress?.visited || false,
    isCompleted: progress?.completed || false,
  };
};

// React hook for subject progress stats
export const useSubjectProgress = (subjectId, totalTopics) => {
  const [stats, setStats] = useState(() => {
    try {
      return getSubjectProgress(subjectId, totalTopics);
    } catch (error) {
      console.error('Error initializing subject progress stats:', error);
      return {
        visited: 0,
        completed: 0,
        total: 0,
        visitedPercentage: 0,
        completedPercentage: 0,
      };
    }
  });
  
  useEffect(() => {
    try {
      // Update stats when component mounts or dependencies change
      setStats(getSubjectProgress(subjectId, totalTopics));
      
      // Listen for storage changes (cross-tab sync)
      const handleStorageChange = (e) => {
        try {
          if (e.key === PROGRESS_KEY) {
            setStats(getSubjectProgress(subjectId, totalTopics));
          }
        } catch (error) {
          console.error('Error handling storage change:', error);
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    } catch (error) {
      console.error('Error in useSubjectProgress useEffect:', error);
    }
  }, [subjectId, totalTopics]);
  
  return stats;
};

// Clear all progress (for reset/debugging)
export const clearAllProgress = () => {
  try {
    if (!isLocalStorageAvailable()) {
      console.warn('localStorage not available, cannot clear progress');
      return false;
    }
    
    localStorage.removeItem(PROGRESS_KEY);
    console.log('Progress data cleared successfully');
    return true;
  } catch (error) {
    console.error('Error clearing progress:', error);
    return false;
  }
};

export default {
  getAllProgress,
  markTopicVisited,
  markTopicCompleted,
  getTopicProgress,
  getSubjectProgress,
  useProgress,
  useSubjectProgress,
  clearAllProgress,
};

