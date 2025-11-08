/**
 * Stream Optimizer Utility
 * Improves AI response streaming performance and fluidity
 */

/**
 * Throttle function to limit update frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Minimum time between calls (ms)
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  let lastResult;
  
  return function(...args) {
    if (!inThrottle) {
      lastResult = func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
    return lastResult;
  };
};

/**
 * Debounce function for final updates
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time (ms)
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

/**
 * Smart chunk accumulator
 * Accumulates small chunks to reduce re-renders
 */
export class ChunkAccumulator {
  constructor(options = {}) {
    this.buffer = '';
    this.minChunkSize = options.minChunkSize || 10; // Minimum characters before update
    this.maxWaitTime = options.maxWaitTime || 50; // Maximum ms to wait
    this.lastFlush = Date.now();
    this.onFlush = options.onFlush || (() => {});
  }
  
  /**
   * Add chunk to buffer
   * @param {string} chunk - Text chunk to add
   * @returns {boolean} True if flushed
   */
  add(chunk) {
    this.buffer += chunk;
    const timeSinceFlush = Date.now() - this.lastFlush;
    
    // Flush if buffer is big enough OR too much time passed
    if (this.buffer.length >= this.minChunkSize || timeSinceFlush >= this.maxWaitTime) {
      this.flush();
      return true;
    }
    
    return false;
  }
  
  /**
   * Force flush buffer
   */
  flush() {
    if (this.buffer.length > 0) {
      this.onFlush(this.buffer);
      this.buffer = '';
      this.lastFlush = Date.now();
    }
  }
  
  /**
   * Get current buffer without flushing
   */
  peek() {
    return this.buffer;
  }
  
  /**
   * Clear buffer without flushing
   */
  clear() {
    this.buffer = '';
  }
}

/**
 * Smooth text animator
 * Adds character-by-character animation effect
 */
export class TextAnimator {
  constructor(options = {}) {
    this.currentText = '';
    this.targetText = '';
    this.isAnimating = false;
    this.speed = options.speed || 20; // Characters per second
    this.onUpdate = options.onUpdate || (() => {});
    this.animationFrame = null;
  }
  
  /**
   * Set new target text
   * @param {string} text - Target text to animate to
   */
  setTarget(text) {
    this.targetText = text;
    
    if (!this.isAnimating) {
      this.startAnimation();
    }
  }
  
  /**
   * Start animation loop
   */
  startAnimation() {
    this.isAnimating = true;
    const animate = () => {
      if (this.currentText.length < this.targetText.length) {
        // Calculate how many characters to add based on speed
        const charsToAdd = Math.max(1, Math.floor(this.speed / 60));
        const nextLength = Math.min(
          this.currentText.length + charsToAdd,
          this.targetText.length
        );
        
        this.currentText = this.targetText.substring(0, nextLength);
        this.onUpdate(this.currentText);
        
        this.animationFrame = requestAnimationFrame(animate);
      } else {
        this.isAnimating = false;
        this.currentText = this.targetText;
        this.onUpdate(this.currentText);
      }
    };
    
    animate();
  }
  
  /**
   * Instantly set text without animation
   * @param {string} text - Text to set
   */
  setImmediate(text) {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.currentText = text;
    this.targetText = text;
    this.isAnimating = false;
    this.onUpdate(text);
  }
  
  /**
   * Stop animation
   */
  stop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.isAnimating = false;
  }
}

/**
 * Performance monitor
 * Tracks and optimizes streaming performance
 */
export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      chunks: 0,
      renders: 0,
      totalChars: 0,
      startTime: null,
      endTime: null,
    };
  }
  
  /**
   * Start monitoring
   */
  start() {
    this.metrics = {
      chunks: 0,
      renders: 0,
      totalChars: 0,
      startTime: Date.now(),
      endTime: null,
    };
  }
  
  /**
   * Record a chunk received
   * @param {number} chunkSize - Size of chunk in characters
   */
  recordChunk(chunkSize) {
    this.metrics.chunks++;
    this.metrics.totalChars += chunkSize;
  }
  
  /**
   * Record a render
   */
  recordRender() {
    this.metrics.renders++;
  }
  
  /**
   * End monitoring and get report
   * @returns {Object} Performance metrics
   */
  end() {
    this.metrics.endTime = Date.now();
    const duration = (this.metrics.endTime - this.metrics.startTime) / 1000;
    
    return {
      ...this.metrics,
      duration,
      charsPerSecond: Math.round(this.metrics.totalChars / duration),
      renderEfficiency: Math.round(this.metrics.chunks / this.metrics.renders * 100),
    };
  }
  
  /**
   * Log performance report
   */
  logReport() {
    const report = this.end();
    console.log('📊 Streaming Performance Report:');
    console.log(`   Duration: ${report.duration.toFixed(2)}s`);
    console.log(`   Total Characters: ${report.totalChars}`);
    console.log(`   Chunks Received: ${report.chunks}`);
    console.log(`   Renders Triggered: ${report.renders}`);
    console.log(`   Speed: ${report.charsPerSecond} chars/s`);
    console.log(`   Efficiency: ${report.renderEfficiency}% (chunks per render)`);
  }
}

/**
 * Create optimized stream updater
 * @param {Function} setState - React setState function
 * @param {Object} options - Configuration options
 * @returns {Object} Updater functions
 */
export const createStreamUpdater = (setState, options = {}) => {
  const accumulator = new ChunkAccumulator({
    minChunkSize: options.minChunkSize || 15,
    maxWaitTime: options.maxWaitTime || 60,
    onFlush: (text) => {
      setState(prevState => ({
        ...prevState,
        streamingText: prevState.streamingText + text,
      }));
    }
  });
  
  const monitor = new PerformanceMonitor();
  
  return {
    start: () => {
      monitor.start();
      setState({ streamingText: '', isStreaming: true });
    },
    
    addChunk: (chunk) => {
      monitor.recordChunk(chunk.length);
      const flushed = accumulator.add(chunk);
      if (flushed) {
        monitor.recordRender();
      }
    },
    
    finish: (finalText) => {
      accumulator.flush();
      setState({ 
        streamingText: finalText, 
        isStreaming: false 
      });
      
      if (options.logPerformance) {
        monitor.logReport();
      }
    },
    
    forceFlush: () => {
      accumulator.flush();
    }
  };
};

/**
 * Clean AI response text
 * Removes control tokens and artifacts
 * @param {string} text - Raw text from AI
 * @returns {string} Cleaned text
 */
export const cleanAIResponse = (text) => {
  if (!text || typeof text !== 'string') return '';
  
  return text
    // Remove control tokens
    .replace(/\[\]</g, '')
    .replace(/\|\s*begin_of_sentence\s*\|\s*>/g, '')
    .replace(/<\|.*?\|>/g, '')
    .replace(/\[INST\].*?\[\/INST\]/g, '')
    .replace(/<<SYS>>.*?<</g, '')
    .replace(/\[\s*\]$/g, '')
    // Remove think tags and reasoning artifacts
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/<\/think>/gi, '')
    .replace(/<think>/gi, '')
    .replace(/\[think\][\s\S]*?\[\/think\]/gi, '')
    // Remove @ prefix from URLs
    .replace(/@(https?:\/\/)/g, '$1')
    .replace(/@\//g, '/')
    .trim();
};

export default {
  throttle,
  debounce,
  ChunkAccumulator,
  TextAnimator,
  PerformanceMonitor,
  createStreamUpdater,
  cleanAIResponse,
};

