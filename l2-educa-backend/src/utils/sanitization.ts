/**
 * Sanitization utilities to prevent XSS and injection attacks
 */

/**
 * Remove HTML tags from string
 */
export const stripHtml = (input: string): string => {
  return input.replace(/<[^>]*>/g, '');
};

/**
 * Escape HTML special characters
 */
export const escapeHtml = (input: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return input.replace(/[&<>"'/]/g, (char) => map[char]);
};

/**
 * Sanitize string input by removing HTML and trimming
 */
export const sanitizeString = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }
  return stripHtml(input).trim();
};

/**
 * Sanitize email - lowercase and trim
 */
export const sanitizeEmail = (email: string): string => {
  if (typeof email !== 'string') {
    return '';
  }
  return email.toLowerCase().trim();
};

/**
 * Sanitize username - remove special chars except _ and -
 */
export const sanitizeUsername = (username: string): string => {
  if (typeof username !== 'string') {
    return '';
  }
  return username.replace(/[^a-zA-Z0-9_-]/g, '').trim();
};

/**
 * Sanitize object by applying sanitization to all string values
 */
export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  const sanitized: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized as T;
};

/**
 * Validate and sanitize URL
 */
export const sanitizeUrl = (url: string): string | null => {
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
};

/**
 * Prevent SQL injection by validating input doesn't contain SQL keywords
 * Note: This is a secondary defense. Primary defense is parameterized queries.
 */
export const detectSqlInjection = (input: string): boolean => {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|SCRIPT|JAVASCRIPT|UNION)\b)/i,
    /(--|\;|\*|\/\*|\*\/)/,
    /(\bOR\b.*=.*)/i,
    /(\bAND\b.*=.*)/i,
  ];
  
  return sqlPatterns.some((pattern) => pattern.test(input));
};

/**
 * Check if input contains potential XSS attempts
 */
export const detectXss = (input: string): boolean => {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // onclick, onload, etc.
    /<iframe/gi,
    /<object/gi,
    /<embed/gi,
  ];
  
  return xssPatterns.some((pattern) => pattern.test(input));
};

