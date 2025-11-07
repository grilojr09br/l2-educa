/**
 * Service Worker for L2 EDUCA
 * PWA with advanced caching strategies
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `l2-educa-${CACHE_VERSION}`;

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only'
};

// Assets to precache during installation
const PRECACHE_ASSETS = [
  '/l2/',
  '/l2/index.html',
  '/l2/favicon.svg',
  '/l2/apple-touch-icon.png'
];

// Cache strategy rules
const CACHE_RULES = [
  {
    pattern: /\.(woff2?|ttf)$/,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    maxAge: 365 * 24 * 60 * 60 // 1 year
  },
  {
    pattern: /\.(png|jpg|jpeg|svg|gif|webp)$/,
    strategy: CACHE_STRATEGIES.CACHE_FIRST,
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  {
    pattern: /\.(css|js)$/,
    strategy: CACHE_STRATEGIES.STALE_WHILE_REVALIDATE,
    maxAge: 7 * 24 * 60 * 60 // 7 days
  },
  {
    pattern: /\/api\//,
    strategy: CACHE_STRATEGIES.NETWORK_FIRST,
    maxAge: 5 * 60 // 5 minutes
  }
];

/**
 * Install event - precache critical assets
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Precaching assets');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => {
      console.log('[SW] Installation complete');
      return self.skipWaiting();
    })
  );
});

/**
 * Activate event - clean old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      console.log('[SW] Activation complete');
      return self.clients.claim();
    })
  );
});

/**
 * Fetch event - apply cache strategies
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome extensions and other schemes
  if (!url.protocol.startsWith('http')) return;

  // Find matching cache rule
  const rule = CACHE_RULES.find((r) => r.pattern.test(url.pathname + url.search));
  const strategy = rule?.strategy || CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;

  // Apply strategy
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      event.respondWith(cacheFirst(request, rule?.maxAge));
      break;
    case CACHE_STRATEGIES.NETWORK_FIRST:
      event.respondWith(networkFirst(request, rule?.maxAge));
      break;
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      event.respondWith(staleWhileRevalidate(request, rule?.maxAge));
      break;
    case CACHE_STRATEGIES.NETWORK_ONLY:
      // Don't cache
      break;
    default:
      event.respondWith(staleWhileRevalidate(request, rule?.maxAge));
  }
});

/**
 * Cache First Strategy
 */
async function cacheFirst(request, maxAge) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  if (cached) {
    // Check if cached response is still fresh
    if (maxAge) {
      const cachedDate = new Date(cached.headers.get('date'));
      const now = new Date();
      const age = (now - cachedDate) / 1000;

      if (age < maxAge) {
        return cached;
      }
    } else {
      return cached;
    }
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Return cached even if stale as fallback
    if (cached) return cached;
    throw error;
  }
}

/**
 * Network First Strategy
 */
async function networkFirst(request, maxAge) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    throw error;
  }
}

/**
 * Stale While Revalidate Strategy
 */
async function staleWhileRevalidate(request, maxAge) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);

  // Fetch in background to update cache
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => {});

  // Return cached immediately if available
  if (cached) {
    return cached;
  }

  // Otherwise wait for network
  return fetchPromise;
}

/**
 * Message event - handle commands from main thread
 */
self.addEventListener('message', (event) => {
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

console.log('[SW] Service worker loaded');

