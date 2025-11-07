/**
 * Custom Token Parsing System for AI Chatbot
 * Handles dynamic button generation and navigation within chat responses
 */

import { SUBJECTS_CONFIG } from '../config/subjectsConfig';

/**
 * Parse and render custom tokens in AI responses
 * Supported tokens:
 * - [[NAVIGATE:Label|/path|icon]] - Navigation button to specific page
 * - [[TOPIC:topicId]] - Topic suggestion card
 * - [[FOLLOW_UP:text]] - Follow-up question suggestion
 * - [[FORMULA:concept]] - Reference to formula/concept
 */

// Extract all tokens from text
export const extractTokens = (text) => {
  if (!text || typeof text !== 'string') return [];
  
  const tokens = [];
  const tokenRegex = /\[\[([A-Z_]+):([^\]]+)\]\]/g;
  let match;
  
  while ((match = tokenRegex.exec(text)) !== null) {
    tokens.push({
      type: match[1],
      content: match[2],
      fullMatch: match[0],
      index: match.index
    });
  }
  
  return tokens;
};

// Fix malformed tokens (spaces between brackets, etc.)
export const fixMalformedTokens = (text) => {
  if (!text) return "";
  
  let fixed = text
    // Fix tokens with spaces: [ [ TOKEN ] ] → [[TOKEN]]
    .replace(/\[\s*\[\s*([A-Z_]+)\s*:\s*([^\]]+?)\s*\]\s*\]/g, "[[$1:$2]]")
    // Fix single brackets that should be double
    .replace(/\[([A-Z_]+):([^\]]+)\]/g, "[[$1:$2]]")
    // Fix incomplete closing brackets: [[TOKEN:content] → [[TOKEN:content]]
    .replace(/\[\[([A-Z_]+):([^\]]+)\](?!\])/g, "[[$1:$2]]")
    // Fix incomplete opening brackets: [TOKEN:content]] → [[TOKEN:content]]
    .replace(/(?<!\[)\[([A-Z_]+):([^\]]+)\]\]/g, "[[$1:$2]]")
    // Fix tokens with missing closing brackets at end of text
    .replace(/\[\[([A-Z_]+):([^\]]+?)$/g, "[[$1:$2]]");
  
  return fixed;
};

// Parse NAVIGATE token: [[NAVIGATE:Label|/path|icon]]
export const parseNavigateToken = (content) => {
  const parts = content.split('|').map(s => s.trim());
  return {
    label: parts[0] || 'Navegar',
    path: parts[1] || '/',
    icon: parts[2] || 'arrow_forward'
  };
};

// Parse TOPIC token: [[TOPIC:topicId]]
export const parseTopicToken = (content) => {
  const topicId = content.trim();
  
  // Search for topic across all subjects
  for (const subjectKey in SUBJECTS_CONFIG) {
    const subject = SUBJECTS_CONFIG[subjectKey];
    if (subject.topics && Array.isArray(subject.topics)) {
      const topic = subject.topics.find(t => t.id === topicId);
      if (topic) {
        return {
          id: topicId,
          title: topic.title || topic.name,
          path: topic.path,
          icon: topic.icon || subject.icon,
          difficulty: topic.difficulty,
          duration: topic.duration,
          gradient: topic.gradient || subject.gradient,
          subjectName: subject.name
        };
      }
    }
  }
  
  return null;
};

// Parse FOLLOW_UP token: [[FOLLOW_UP:question text]]
export const parseFollowUpToken = (content) => {
  return {
    text: content.trim()
  };
};

/**
 * Validate follow-up text for quality and first-person usage
 * @param {string} text - Follow-up text to validate
 * @returns {Object} { valid: boolean, reason: string }
 */
export const validateFollowUp = (text) => {
  if (!text || typeof text !== 'string') {
    return { valid: false, reason: 'Empty or invalid text' };
  }
  
  const trimmed = text.trim();
  
  // Check minimum length
  if (trimmed.length < 15) {
    return { valid: false, reason: `Too short (${trimmed.length} chars, minimum 15)` };
  }
  
  // Check maximum length
  if (trimmed.length > 100) {
    return { valid: false, reason: `Too long (${trimmed.length} chars, maximum 100)` };
  }
  
  // Check for placeholder text
  const placeholders = ['pergunta', 'texto', 'aqui', 'placeholder', '...'];
  if (placeholders.some(p => trimmed.toLowerCase() === p)) {
    return { valid: false, reason: 'Placeholder text detected' };
  }
  
  // Check for second person (você, quer, deseja, etc.)
  const secondPersonPatterns = [
    /\bvocê\b/i,
    /\bquer\b/i,
    /\bdeseja\b/i,
    /\bgostaria\b/i,
    /\bpor onde você\b/i,
    /\bonde você\b/i
  ];
  
  for (const pattern of secondPersonPatterns) {
    if (pattern.test(trimmed)) {
      return { 
        valid: false, 
        reason: `Second person detected (use first person instead): "${trimmed.match(pattern)[0]}"` 
      };
    }
  }
  
  // Check for first person indicators (good signs)
  const firstPersonPatterns = [
    /\bquero\b/i,
    /\bpreciso\b/i,
    /\bme mostre\b/i,
    /\bcomo posso\b/i,
    /\bme explique\b/i,
    /\bme ajude\b/i
  ];
  
  const hasFirstPerson = firstPersonPatterns.some(p => p.test(trimmed));
  
  if (!hasFirstPerson) {
    return { 
      valid: false, 
      reason: 'No first-person language detected (use "Quero", "Me mostre", "Como posso", etc.)' 
    };
  }
  
  return { valid: true, reason: 'Valid' };
};

// Parse FORMULA token: [[FORMULA:concept]]
export const parseFormulaToken = (content) => {
  return {
    concept: content.trim()
  };
};

// Strip all tokens from text for plain display
export const stripTokens = (text) => {
  if (!text) return "";
  
  // Remove all token variations (greedy matching to catch nested brackets)
  let cleaned = text
    // Remove properly formatted tokens
    .replace(/\[\[NAVIGATE:[^\]]*\]\]/g, "")
    .replace(/\[\[TOPIC:[^\]]*\]\]/g, "")
    .replace(/\[\[FOLLOW_UP:[^\]]*\]\]/g, "")
    .replace(/\[\[FORMULA:[^\]]*\]\]/g, "")
    // Remove any remaining malformed tokens
    .replace(/\[\s*\[\s*[A-Z_]+\s*:.*?\]\s*\]/g, "")
    .replace(/\[[A-Z_]+:.*?\]/g, "")
    // Clean up empty brackets and whitespace artifacts
    .replace(/\[\s*\]/g, "")
    .replace(/\]\s*\]/g, "") // Remove double closing brackets
    .replace(/\[\s*\[/g, "") // Remove double opening brackets
    .replace(/\s+$/gm, "");
  
  // Final pass: remove any stray single brackets at end of line or standalone
  cleaned = cleaned
    .replace(/\]\s*$/gm, "") // Remove ] at end of line
    .replace(/^\s*\[/gm, "") // Remove [ at start of line
    .replace(/\s+\]\s+/g, " ") // Remove ] surrounded by spaces
    .replace(/\s+\[\s+/g, " ") // Remove [ surrounded by spaces
    .trim();
  
  return cleaned;
};

// Get topic suggestions based on current subject
export const getTopicSuggestionsForSubject = (subjectId, limit = 3) => {
  const subject = SUBJECTS_CONFIG[subjectId];
  if (!subject || !subject.topics || subject.topics.length === 0) {
    return [];
  }
  
  return subject.topics
    .slice(0, limit)
    .map(topic => ({
      id: topic.id,
      title: topic.title || topic.name,
      path: topic.path,
      gradient: topic.gradient || subject.gradient,
      icon: topic.icon || subject.icon
    }));
};

// Get related topics from different subjects (for cross-subject recommendations)
export const getRelatedTopics = (currentTopicId, limit = 3) => {
  const allTopics = [];
  
  for (const subjectKey in SUBJECTS_CONFIG) {
    const subject = SUBJECTS_CONFIG[subjectKey];
    if (subject.topics && Array.isArray(subject.topics)) {
      subject.topics.forEach(topic => {
        if (topic.id !== currentTopicId) {
          allTopics.push({
            id: topic.id,
            title: topic.title || topic.name,
            path: topic.path,
            gradient: topic.gradient || subject.gradient,
            icon: topic.icon || subject.icon,
            subjectName: subject.name
          });
        }
      });
    }
  }
  
  // Shuffle and return limited results
  return allTopics
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
};

// Validate token syntax
export const validateToken = (token) => {
  if (!token || !token.type || !token.content) return false;
  
  switch (token.type) {
    case 'NAVIGATE':
      const navParts = token.content.split('|');
      return navParts.length >= 2 && navParts[1].startsWith('/');
    
    case 'TOPIC':
      return token.content.trim().length > 0;
    
    case 'FOLLOW_UP':
      return token.content.trim().length > 0;
    
    case 'FORMULA':
      return token.content.trim().length > 0;
    
    default:
      return false;
  }
};

export default {
  extractTokens,
  fixMalformedTokens,
  parseNavigateToken,
  parseTopicToken,
  parseFollowUpToken,
  parseFormulaToken,
  stripTokens,
  getTopicSuggestionsForSubject,
  getRelatedTopics,
  validateToken,
  validateFollowUp
};

