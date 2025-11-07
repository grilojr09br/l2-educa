/**
 * MathJax Lazy Preloader
 * Loads MathJax only when user navigates to pages with formulas
 */

let mathJaxLoading = false;
let mathJaxLoaded = false;

/**
 * Check if MathJax is already loaded
 */
export const isMathJaxLoaded = () => {
  return mathJaxLoaded || (window.MathJax && window.MathJax.typesetPromise);
};

/**
 * Preload MathJax script
 * Only loads the script, doesn't process any formulas
 */
export const preloadMathJax = () => {
  // Already loaded or loading
  if (isMathJaxLoaded() || mathJaxLoading) {
    return Promise.resolve(true);
  }

  mathJaxLoading = true;

  return new Promise((resolve) => {
    // Check if script tag already exists
    const existingScript = document.querySelector('script[src*="mathjax"]');
    if (existingScript) {
      mathJaxLoaded = true;
      mathJaxLoading = false;
      resolve(true);
      return;
    }

    console.log('📐 Preloading MathJax...');

    // MathJax will be loaded from index.html, but we can prepare configuration
    // Just wait for it to be available
    const checkInterval = setInterval(() => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        clearInterval(checkInterval);
        mathJaxLoaded = true;
        mathJaxLoading = false;
        console.log('✅ MathJax ready');
        resolve(true);
      }
    }, 100);

    // Timeout after 10 seconds
    setTimeout(() => {
      clearInterval(checkInterval);
      mathJaxLoading = false;
      console.warn('⚠️ MathJax preload timeout');
      resolve(false);
    }, 10000);
  });
};

/**
 * Check if route requires MathJax
 */
export const routeNeedsMathJax = (pathname) => {
  const mathRoutes = [
    '/math',
    '/physics',
    '/numeros-complexos',
    '/polinomios',
    '/geometria-analitica',
    '/exercicios'
  ];

  return mathRoutes.some((route) => pathname.includes(route));
};

/**
 * Auto preload based on route
 */
export const autoPreloadMathJax = (pathname) => {
  if (routeNeedsMathJax(pathname) && !isMathJaxLoaded() && !mathJaxLoading) {
    preloadMathJax();
  }
};

export default {
  preloadMathJax,
  isMathJaxLoaded,
  routeNeedsMathJax,
  autoPreloadMathJax
};

