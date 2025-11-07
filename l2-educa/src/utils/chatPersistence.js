/**
 * Chat Persistence Manager
 * Manages chat history per topic using sessionStorage
 * Each topic/page has its own isolated chat history
 */

const CHAT_PREFIX = 'l2educa_chat_';
const HOMEPAGE_KEY = 'homepage';

/**
 * Generate unique chat key based on pathname
 * @param {string} pathname - Current URL pathname
 * @returns {string} Unique storage key
 */
export const getChatKey = (pathname) => {
  if (!pathname || pathname === '/') {
    return `${CHAT_PREFIX}${HOMEPAGE_KEY}`;
  }
  
  // Normalize pathname: remove trailing slash, clean up
  const normalized = pathname.replace(/^\/+|\/+$/g, '').replace(/\//g, '_');
  return `${CHAT_PREFIX}${normalized}`;
};

/**
 * Save chat history for a specific pathname
 * @param {string} pathname - Current URL pathname
 * @param {Array} messages - Array of message objects
 */
export const saveChatHistory = (pathname, messages) => {
  try {
    const key = getChatKey(pathname);
    const data = {
      messages,
      timestamp: Date.now(),
      pathname
    };
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save chat history:', error);
  }
};

/**
 * Load chat history for a specific pathname
 * @param {string} pathname - Current URL pathname
 * @returns {Array|null} Array of messages or null if not found
 */
export const loadChatHistory = (pathname) => {
  try {
    const key = getChatKey(pathname);
    const stored = sessionStorage.getItem(key);
    
    if (!stored) {
      return null;
    }
    
    const data = JSON.parse(stored);
    
    // Validate data structure
    if (!data.messages || !Array.isArray(data.messages)) {
      return null;
    }
    
    return data.messages;
  } catch (error) {
    console.warn('Failed to load chat history:', error);
    return null;
  }
};

/**
 * Clear chat history for a specific pathname
 * @param {string} pathname - Current URL pathname
 */
export const clearChatHistory = (pathname) => {
  try {
    const key = getChatKey(pathname);
    sessionStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to clear chat history:', error);
  }
};

/**
 * Get all chat storage keys
 * @returns {Array<string>} Array of chat keys
 */
export const getAllChatKeys = () => {
  try {
    const keys = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith(CHAT_PREFIX)) {
        keys.push(key);
      }
    }
    return keys;
  } catch (error) {
    console.warn('Failed to get chat keys:', error);
    return [];
  }
};

/**
 * Clear all chat histories
 */
export const clearAllChats = () => {
  try {
    const keys = getAllChatKeys();
    keys.forEach(key => {
      sessionStorage.removeItem(key);
    });
    console.log(`🗑️ Cleared ${keys.length} chat histories`);
  } catch (error) {
    console.warn('Failed to clear all chats:', error);
  }
};

/**
 * Get chat statistics
 * @returns {Object} Statistics about stored chats
 */
export const getChatStats = () => {
  try {
    const keys = getAllChatKeys();
    const stats = {
      total: keys.length,
      chats: []
    };
    
    keys.forEach(key => {
      try {
        const stored = sessionStorage.getItem(key);
        if (stored) {
          const data = JSON.parse(stored);
          stats.chats.push({
            key,
            pathname: data.pathname,
            messageCount: data.messages?.length || 0,
            timestamp: data.timestamp
          });
        }
      } catch (e) {
        // Skip invalid entries
      }
    });
    
    return stats;
  } catch (error) {
    console.warn('Failed to get chat stats:', error);
    return { total: 0, chats: [] };
  }
};

/**
 * Check if chat history exists for a pathname
 * @param {string} pathname - Current URL pathname
 * @returns {boolean} True if history exists
 */
export const hasChatHistory = (pathname) => {
  try {
    const key = getChatKey(pathname);
    return sessionStorage.getItem(key) !== null;
  } catch (error) {
    return false;
  }
};

export default {
  getChatKey,
  saveChatHistory,
  loadChatHistory,
  clearChatHistory,
  clearAllChats,
  getAllChatKeys,
  getChatStats,
  hasChatHistory
};

