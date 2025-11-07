/**
 * Formula Cache with IndexedDB
 * Persistent storage for processed MathJax formulas
 * LRU cache with session-only persistence
 */

import { errorHandler } from './errorHandler';

const DB_NAME = 'L2EducaDB';
const DB_VERSION = 3; // Incremented to fix indexes and clear old cache
const STORE_NAME = 'processedFormulas';
const MAX_ENTRIES = 100; // Reduced for per-page caching
const EXPIRY_DAYS = 0; // Session-only (clears on browser close)

class FormulaCache {
  constructor() {
    this.db = null;
    this.memoryCache = new Map(); // Fallback for browsers without IndexedDB
    this.currentPage = null; // Track current page
    this.initPromise = this.init();
    this.setupSessionCleanup();
  }

  /**
   * Setup session cleanup
   */
  setupSessionCleanup() {
    try {
      // Clear cache on new browser session
      const sessionId = sessionStorage.getItem('l2educa_session');
      if (!sessionId) {
        sessionStorage.setItem('l2educa_session', Date.now().toString());
        this.clear().catch((err) => {
          errorHandler.handleCacheError(err, 'setupSessionCleanup');
        });
      }
      
      // Store current page
      this.currentPage = sessionStorage.getItem('l2educa_current_page');
    } catch (error) {
      errorHandler.handleCacheError(error, 'setupSessionCleanup');
    }
  }

  /**
   * Set current page and clear cache if page changed
   */
  async setCurrentPage(pagePath) {
    try {
      // If page changed, clear cache
      if (this.currentPage && this.currentPage !== pagePath) {
        await this.clear();
        this.memoryCache.clear();
        
        if (import.meta.env.DEV) {
          console.log(`🗑️ Cache cleared for page change: ${this.currentPage} → ${pagePath}`);
        }
      }
      
      this.currentPage = pagePath;
      sessionStorage.setItem('l2educa_current_page', pagePath);
      
      if (import.meta.env.DEV) {
        console.log(`📄 Current page set: ${pagePath}`);
      }
    } catch (error) {
      errorHandler.handleCacheError(error, 'setCurrentPage');
      // Non-blocking error - continue execution
    }
  }

  /**
   * Initialize IndexedDB
   */
  async init() {
    if (!('indexedDB' in window)) {
      console.warn('IndexedDB not available, using memory cache only');
      return false;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        const error = request.error;
        console.error('Failed to open IndexedDB:', error);
        errorHandler.handleCacheError(error, 'init');
        reject(error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        this.cleanExpiredEntries();
        resolve(true);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Delete old store if exists to recreate with proper indexes
        if (db.objectStoreNames.contains(STORE_NAME)) {
          db.deleteObjectStore(STORE_NAME);
        }

        // Create store with all required indexes
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('lastAccess', 'lastAccess', { unique: false }); // FIXED: Added missing index
        store.createIndex('hitCount', 'hitCount', { unique: false });
      };
    });
  }

  /**
   * Generate hash for formula
   */
  hash(str, display) {
    let hash = 0;
    const key = `${display ? 'D' : 'I'}_${str}`;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }

  /**
   * Get formula from cache
   */
  async get(latex, display) {
    const id = this.hash(latex, display);

    // Try memory cache first
    if (this.memoryCache.has(id)) {
      return this.memoryCache.get(id);
    }

    // Try IndexedDB
    if (!this.db) {
      await this.initPromise.catch(() => {});
    }

    if (!this.db) return null;

    return new Promise((resolve) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => {
        const entry = request.result;

        if (!entry) {
          resolve(null);
          return;
        }

        // Check if expired
        const age = Date.now() - entry.timestamp;
        const maxAge = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

        if (age > maxAge) {
          store.delete(id);
          resolve(null);
          return;
        }

        // Update hit count
        entry.hitCount++;
        entry.lastAccess = Date.now();
        store.put(entry);

        // Add to memory cache
        this.memoryCache.set(id, entry);

        resolve(entry);
      };

      request.onerror = () => {
        const error = request.error;
        console.error('Failed to get from IndexedDB:', error);
        errorHandler.handleCacheError(error, 'get');
        resolve(null);
      };
    });
  }

  /**
   * Store formula in cache
   */
  async set(latex, display, htmlContent) {
    const id = this.hash(latex, display);
    const entry = {
      id,
      latex,
      html: htmlContent,
      display,
      timestamp: Date.now(),
      lastAccess: Date.now(),
      hitCount: 1
    };

    // Store in memory cache
    this.memoryCache.set(id, entry);

    // Store in IndexedDB
    if (!this.db) {
      await this.initPromise.catch(() => {});
    }

    if (!this.db) return;

    return new Promise((resolve) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      // Check if we need to remove old entries
      const countRequest = store.count();
      countRequest.onsuccess = async () => {
        if (countRequest.result >= MAX_ENTRIES) {
          await this.removeOldestEntry(store);
        }

        const putRequest = store.put(entry);
        putRequest.onsuccess = () => resolve(true);
        putRequest.onerror = () => {
          const error = putRequest.error;
          console.error('Failed to store in IndexedDB:', error);
          errorHandler.handleCacheError(error, 'set');
          resolve(false);
        };
      };
    });
  }

  /**
   * Remove oldest entries based on LRU (removes 10 at a time)
   */
  async removeOldestEntry(store) {
    return new Promise((resolve) => {
      const index = store.index('lastAccess');
      const request = index.openCursor(null, 'next'); // Oldest first
      
      let toDelete = [];
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor && toDelete.length < 10) { // Delete 10 oldest
          toDelete.push(cursor.primaryKey);
          cursor.continue();
        } else {
          // Delete collected entries
          toDelete.forEach(key => store.delete(key));
          
          if (import.meta.env.DEV && toDelete.length > 0) {
            console.log(`🗑️ Removed ${toDelete.length} oldest cache entries`);
          }
          
          resolve();
        }
      };
      
      request.onerror = () => {
        console.error('Failed to remove oldest entries:', request.error);
        resolve();
      };
    });
  }

  /**
   * Clean expired entries
   */
  async cleanExpiredEntries() {
    if (!this.db) return;

    const maxAge = EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    const cutoff = Date.now() - maxAge;

    return new Promise((resolve) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const index = store.index('timestamp');
      const request = index.openCursor(IDBKeyRange.upperBound(cutoff));

      let deletedCount = 0;

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          store.delete(cursor.primaryKey);
          deletedCount++;
          cursor.continue();
        } else {
          if (deletedCount > 0 && import.meta.env.DEV) {
            console.log(`🗑️ Cleaned ${deletedCount} expired formula(s) from cache`);
          }
          resolve(deletedCount);
        }
      };

      request.onerror = () => {
        console.error('Failed to clean expired entries:', request.error);
        resolve(0);
      };
    });
  }

  /**
   * Get cache statistics
   */
  async getStats() {
    if (!this.db) {
      return {
        available: false,
        entries: 0,
        size: 0
      };
    }

    return new Promise((resolve) => {
      const transaction = this.db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const countRequest = store.count();

      countRequest.onsuccess = async () => {
        const entries = countRequest.result;
        
        // Estimate size
        const estimate = await navigator.storage?.estimate?.();
        const size = estimate?.usage || 0;

        resolve({
          available: true,
          entries,
          maxEntries: MAX_ENTRIES,
          size,
          formattedSize: this.formatBytes(size)
        });
      };

      countRequest.onerror = () => {
        resolve({
          available: false,
          entries: 0,
          size: 0
        });
      };
    });
  }

  /**
   * Format bytes to human readable
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Clear all cache
   */
  async clear() {
    this.memoryCache.clear();

    if (!this.db) return;

    return new Promise((resolve) => {
      const transaction = this.db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => {
        if (import.meta.env.DEV) {
          console.log('🗑️ Formula cache cleared completely');
        }
        resolve(true);
      };
      request.onerror = () => resolve(false);
    });
  }

  /**
   * Log cache statistics (dev mode only)
   */
  async logStats() {
    if (!import.meta.env.DEV) return;
    
    const stats = await this.getStats();
    console.log('📊 Formula Cache Stats:', {
      page: this.currentPage,
      entries: stats.entries,
      maxEntries: stats.maxEntries,
      size: stats.formattedSize,
      utilization: `${Math.round((stats.entries / stats.maxEntries) * 100)}%`
    });
  }
}

// Singleton instance
export const formulaCache = new FormulaCache();

export default formulaCache;

