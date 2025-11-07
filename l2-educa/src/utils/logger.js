/**
 * Development-only logger
 * Console logs are stripped from production builds
 */

const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args) => {
    if (isDev) console.log(...args);
  },
  
  info: (...args) => {
    if (isDev) console.info(...args);
  },
  
  warn: (...args) => {
    if (isDev) console.warn(...args);
  },
  
  error: (...args) => {
    if (isDev) console.error(...args);
  },
  
  debug: (...args) => {
    if (isDev) console.debug(...args);
  },
  
  table: (...args) => {
    if (isDev) console.table(...args);
  },
  
  group: (...args) => {
    if (isDev) console.group(...args);
  },
  
  groupEnd: () => {
    if (isDev) console.groupEnd();
  },
};

// Default export
export default logger;

