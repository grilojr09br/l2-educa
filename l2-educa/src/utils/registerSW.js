/**
 * Service Worker Registration
 * Registers and manages the service worker lifecycle
 */

export const registerServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Worker not supported in this browser');
    return false;
  }

  try {
    // Register service worker
    const registration = await navigator.serviceWorker.register('/l2/sw.js', {
      scope: '/l2/'
    });

    console.log('✅ Service Worker registered:', registration.scope);

    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New version available
          console.log('🔄 New version available! Refresh to update.');
          
          // Optionally notify user
          if (import.meta.env.DEV) {
            console.log('💡 In production, show update notification here');
          }
        }
      });
    });

    // Listen for messages from SW
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data.type === 'CACHE_UPDATED') {
        console.log('📦 Cache updated:', event.data.url);
      }
    });

    return registration;
  } catch (error) {
    console.error('❌ Service Worker registration failed:', error);
    return false;
  }
};

/**
 * Unregister service worker (for debugging)
 */
export const unregisterServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) return;

  const registrations = await navigator.serviceWorker.getRegistrations();
  for (const registration of registrations) {
    await registration.unregister();
  }
  
  console.log('Service Worker unregistered');
};

/**
 * Clear all caches
 */
export const clearServiceWorkerCache = async () => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));
    console.log('All caches cleared');
  }
};

export default registerServiceWorker;

