/**
 * Route Validation System - Layered Verification for AI Navigation
 * Ensures AI chatbot only generates valid navigation links
 * Single source of truth for all valid routes in the application
 */

import { SUBJECTS_CONFIG } from '../config/subjectsConfig';

/**
 * Extract all valid routes from the application
 * This should match EXACTLY with routes defined in App.jsx
 * @returns {Set<string>} Set of all valid paths
 */
export const getAllValidRoutes = () => {
  const validRoutes = new Set();
  
  // ============================================
  // AUTHENTICATION & SYSTEM ROUTES
  // ============================================
  validRoutes.add('/');
  validRoutes.add('/login');
  validRoutes.add('/register');
  validRoutes.add('/forgot-password');
  validRoutes.add('/reset-password');
  validRoutes.add('/verify-email');
  validRoutes.add('/profile');
  
  // ============================================
  // SUBJECT PAGES (Main pages for each subject)
  // ============================================
  Object.values(SUBJECTS_CONFIG).forEach(subject => {
    if (subject && subject.path) {
      validRoutes.add(subject.path);
    }
  });
  
  // ============================================
  // TOPIC PAGES (All content pages)
  // ============================================
  Object.values(SUBJECTS_CONFIG).forEach(subject => {
    if (subject && subject.topics && Array.isArray(subject.topics)) {
      subject.topics.forEach(topic => {
        if (topic && topic.path) {
          validRoutes.add(topic.path);
        }
      });
    }
  });
  
  return validRoutes;
};

/**
 * Check if a path is valid
 * @param {string} path - Path to validate
 * @returns {boolean} True if path is valid
 */
export const isValidRoute = (path) => {
  if (!path || typeof path !== 'string') {
    console.warn('⚠️ Invalid path type:', typeof path);
    return false;
  }
  
  // Normalize path (remove trailing slash, handle hash router)
  const normalizedPath = path.replace(/\/$/, '') || '/';
  
  const validRoutes = getAllValidRoutes();
  const isValid = validRoutes.has(normalizedPath);
  
  if (!isValid) {
    console.error(`❌ INVALID ROUTE DETECTED: "${path}"`);
    console.log('📋 Valid routes:', Array.from(validRoutes).sort());
  }
  
  return isValid;
};

/**
 * Get detailed information about why a path is invalid
 * @param {string} path - Path to check
 * @returns {Object} Validation result with details
 */
export const validateRouteDetailed = (path) => {
  if (!path || typeof path !== 'string') {
    return {
      isValid: false,
      error: 'Path must be a non-empty string',
      path: path,
    };
  }
  
  const normalizedPath = path.replace(/\/$/, '') || '/';
  const validRoutes = getAllValidRoutes();
  const isValid = validRoutes.has(normalizedPath);
  
  if (isValid) {
    return {
      isValid: true,
      path: normalizedPath,
    };
  }
  
  // Try to find similar routes (suggestions)
  const similarRoutes = Array.from(validRoutes).filter(route => {
    const similarity = calculateSimilarity(normalizedPath, route);
    return similarity > 0.5;
  });
  
  return {
    isValid: false,
    path: normalizedPath,
    error: 'Route does not exist in the application',
    suggestions: similarRoutes.slice(0, 3),
    allValidRoutes: Array.from(validRoutes).sort(),
  };
};

/**
 * Calculate similarity between two strings (simple Levenshtein-based)
 * @param {string} str1 
 * @param {string} str2 
 * @returns {number} Similarity score (0-1)
 */
const calculateSimilarity = (str1, str2) => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
};

/**
 * Calculate Levenshtein distance between two strings
 */
const levenshteinDistance = (str1, str2) => {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
};

/**
 * Generate a comprehensive map of all routes for AI consumption
 * @returns {Object} Structured route map
 */
export const generateRouteMapForAI = () => {
  const routeMap = {
    system: [
      { path: '/', label: 'Terminal (Página Inicial)', type: 'home' },
      { path: '/profile', label: 'Perfil do Usuário', type: 'system' },
    ],
    subjects: {},
  };
  
  Object.entries(SUBJECTS_CONFIG).forEach(([key, subject]) => {
    if (!subject) return;
    
    routeMap.subjects[key] = {
      name: subject.name,
      path: subject.path,
      topics: [],
    };
    
    if (subject.topics && Array.isArray(subject.topics)) {
      subject.topics.forEach(topic => {
        if (topic && topic.path) {
          routeMap.subjects[key].topics.push({
            id: topic.id,
            title: topic.title || topic.name,
            path: topic.path,
          });
        }
      });
    }
  });
  
  return routeMap;
};

/**
 * Format route map as text for AI prompt
 * @returns {string} Formatted route map
 */
export const formatRouteMapForPrompt = () => {
  const routeMap = generateRouteMapForAI();
  let output = '## 🗺️ MAPA COMPLETO DE ROTAS VÁLIDAS\n\n';
  
  output += '### Rotas do Sistema:\n';
  routeMap.system.forEach(route => {
    output += `  - ${route.label}: \`${route.path}\`\n`;
  });
  
  output += '\n### Matérias e Tópicos:\n';
  Object.entries(routeMap.subjects).forEach(([key, subject]) => {
    output += `\n#### ${subject.name} → \`${subject.path}\`\n`;
    
    if (subject.topics.length > 0) {
      output += 'Tópicos:\n';
      subject.topics.forEach(topic => {
        output += `  - ${topic.title} (ID: \`${topic.id}\`) → \`${topic.path}\`\n`;
      });
    } else {
      output += '  ⚠️ Sem tópicos disponíveis\n';
    }
  });
  
  return output;
};

/**
 * Get all valid paths as a simple array (for quick checks)
 * @returns {string[]} Array of all valid paths
 */
export const getValidPathsArray = () => {
  return Array.from(getAllValidRoutes()).sort();
};

/**
 * Check if a NAVIGATE token is valid before rendering
 * @param {string} tokenContent - Content of NAVIGATE token (e.g., "Label|/path|icon")
 * @returns {Object} Validation result
 */
export const validateNavigateToken = (tokenContent) => {
  if (!tokenContent || typeof tokenContent !== 'string') {
    return {
      isValid: false,
      error: 'Token content is empty or invalid',
    };
  }
  
  const parts = tokenContent.split('|');
  if (parts.length < 2) {
    return {
      isValid: false,
      error: 'NAVIGATE token must have format: Label|/path|icon',
    };
  }
  
  const [label, path, icon] = parts;
  const validation = validateRouteDetailed(path);
  
  return {
    ...validation,
    label,
    icon,
  };
};

export default {
  isValidRoute,
  validateRouteDetailed,
  getAllValidRoutes,
  generateRouteMapForAI,
  formatRouteMapForPrompt,
  getValidPathsArray,
  validateNavigateToken,
};

