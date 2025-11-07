/**
 * Security utilities for authentication
 */

const RATE_LIMIT_KEY = 'l2educa_rate_limit';
const LAST_ACTIVITY_KEY = 'l2educa_last_activity';
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Rate limiting for login attempts
 * Max 5 attempts per 10 minutes
 */
export const checkRateLimit = (identifier = 'global') => {
  const key = `${RATE_LIMIT_KEY}_${identifier}`;
  const data = localStorage.getItem(key);
  
  if (!data) {
    return { allowed: true, remainingAttempts: 5, resetTime: null };
  }

  try {
    const { attempts, timestamp } = JSON.parse(data);
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000;

    // Reset if 10 minutes have passed
    if (now - timestamp > tenMinutes) {
      localStorage.removeItem(key);
      return { allowed: true, remainingAttempts: 5, resetTime: null };
    }

    // Check if blocked
    if (attempts >= 5) {
      const resetTime = timestamp + tenMinutes;
      const minutesLeft = Math.ceil((resetTime - now) / 60000);
      return { 
        allowed: false, 
        remainingAttempts: 0, 
        resetTime,
        minutesLeft 
      };
    }

    return { 
      allowed: true, 
      remainingAttempts: 5 - attempts, 
      resetTime: null 
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    localStorage.removeItem(key);
    return { allowed: true, remainingAttempts: 5, resetTime: null };
  }
};

/**
 * Record a failed login attempt
 */
export const recordFailedAttempt = (identifier = 'global') => {
  const key = `${RATE_LIMIT_KEY}_${identifier}`;
  const data = localStorage.getItem(key);
  
  try {
    if (!data) {
      localStorage.setItem(key, JSON.stringify({
        attempts: 1,
        timestamp: Date.now()
      }));
      return;
    }

    const { attempts, timestamp } = JSON.parse(data);
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000;

    // Reset if 10 minutes have passed
    if (now - timestamp > tenMinutes) {
      localStorage.setItem(key, JSON.stringify({
        attempts: 1,
        timestamp: now
      }));
      return;
    }

    // Increment attempts
    localStorage.setItem(key, JSON.stringify({
      attempts: attempts + 1,
      timestamp
    }));
  } catch (error) {
    console.error('Record failed attempt error:', error);
  }
};

/**
 * Clear rate limit data (on successful login)
 */
export const clearRateLimit = (identifier = 'global') => {
  const key = `${RATE_LIMIT_KEY}_${identifier}`;
  localStorage.removeItem(key);
};

/**
 * Update last activity timestamp
 */
export const updateLastActivity = () => {
  localStorage.setItem(LAST_ACTIVITY_KEY, Date.now().toString());
};

/**
 * Check if session has timed out due to inactivity
 */
export const checkSessionTimeout = () => {
  const lastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
  
  if (!lastActivity) {
    updateLastActivity();
    return false;
  }

  const now = Date.now();
  const lastActivityTime = parseInt(lastActivity, 10);
  
  return (now - lastActivityTime) > SESSION_TIMEOUT;
};

/**
 * Clear session timeout data
 */
export const clearSessionTimeout = () => {
  localStorage.removeItem(LAST_ACTIVITY_KEY);
};

/**
 * Sanitize user input (basic XSS prevention)
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Setup activity listener for session timeout
 */
export const setupActivityListener = (callback) => {
  const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
  
  const handleActivity = () => {
    updateLastActivity();
  };

  events.forEach(event => {
    document.addEventListener(event, handleActivity, { passive: true });
  });

  // Check for timeout every minute
  const interval = setInterval(() => {
    if (checkSessionTimeout()) {
      callback();
    }
  }, 60000); // Check every minute

  // Cleanup function
  return () => {
    events.forEach(event => {
      document.removeEventListener(event, handleActivity);
    });
    clearInterval(interval);
  };
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Calculate password strength
 */
export const calculatePasswordStrength = (password) => {
  if (!password) return { score: 0, label: 'Muito fraca', color: '#ef4444' };

  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  // Character variety
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  
  // Sequential or repeated characters (negative)
  if (/(.)\1{2,}/.test(password)) score -= 1;
  if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password)) score -= 1;

  score = Math.max(0, Math.min(10, score));

  if (score <= 3) return { score, label: 'Fraca', color: '#ef4444' };
  if (score <= 6) return { score, label: 'Média', color: '#f59e0b' };
  if (score <= 8) return { score, label: 'Forte', color: '#10b981' };
  return { score, label: 'Muito forte', color: '#059669' };
};


