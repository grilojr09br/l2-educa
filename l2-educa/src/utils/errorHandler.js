/**
 * Global Error Handler Utility
 * Centralized error handling and logging
 */

class ErrorHandler {
  constructor() {
    this.errors = [];
    this.maxErrors = 50; // Keep last 50 errors
    this.setupGlobalHandlers();
  }

  /**
   * Setup global error handlers
   */
  setupGlobalHandlers() {
    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('🚨 Unhandled Promise Rejection:', event.reason);
      this.logError({
        type: 'promise',
        message: event.reason?.message || 'Unhandled promise rejection',
        stack: event.reason?.stack,
        timestamp: new Date().toISOString(),
      });
      event.preventDefault();
    });

    // Catch global errors
    window.addEventListener('error', (event) => {
      console.error('🚨 Global Error:', event.error);
      this.logError({
        type: 'global',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        timestamp: new Date().toISOString(),
      });
    });

    // Network errors
    window.addEventListener('online', () => {
      console.log('✅ Network: Back online');
      this.showNotification('Conexão restaurada', 'success');
    });

    window.addEventListener('offline', () => {
      console.warn('⚠️ Network: Offline');
      this.showNotification('Sem conexão com a internet', 'warning');
    });
  }

  /**
   * Log error to memory (and optionally to service)
   */
  logError(error) {
    this.errors.push(error);
    
    // Keep only last N errors
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // In development, log to console
    if (import.meta.env.DEV) {
      console.table(error);
    }

    // Optional: Send to error reporting service
    // this.sendToService(error);
  }

  /**
   * Get all logged errors
   */
  getErrors() {
    return this.errors;
  }

  /**
   * Clear error log
   */
  clearErrors() {
    this.errors = [];
  }

  /**
   * Handle MathJax errors
   */
  handleMathJaxError(error, formula) {
    console.error('❌ MathJax Error:', error, 'Formula:', formula);
    this.logError({
      type: 'mathjax',
      message: error.message,
      formula: formula?.substring(0, 100), // Truncate long formulas
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Handle cache errors
   */
  handleCacheError(error, operation) {
    console.error('❌ Cache Error:', operation, error);
    this.logError({
      type: 'cache',
      operation,
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Handle navigation errors
   */
  handleNavigationError(error, path) {
    console.error('❌ Navigation Error:', path, error);
    this.logError({
      type: 'navigation',
      path,
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Show user notification (simple implementation)
   */
  showNotification(message, type = 'info') {
    // Check if browser supports notifications
    if (!('Notification' in window)) {
      console.log(`📢 ${message}`);
      return;
    }

    // For now, just log - can be enhanced with toast library
    const icon = {
      success: '✅',
      warning: '⚠️',
      error: '❌',
      info: 'ℹ️',
    }[type] || 'ℹ️';

    console.log(`${icon} ${message}`);
    
    // Could integrate with a toast notification library here
    // e.g., react-toastify, sonner, etc.
  }

  /**
   * Get error statistics
   */
  getStats() {
    const types = {};
    this.errors.forEach(error => {
      types[error.type] = (types[error.type] || 0) + 1;
    });

    return {
      total: this.errors.length,
      byType: types,
      recent: this.errors.slice(-5),
    };
  }
}

// Singleton instance
export const errorHandler = new ErrorHandler();

export default errorHandler;

