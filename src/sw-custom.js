const whitelist = ['https://m.habr']
const CACHE_LIFETIME = 3600 * 1000

self.addEventListener('fetch', (event) => {
  return event.respondWith(
    (async () => {
      const isOffline = !navigator.onLine

      // Do not cache requests that are not in whitelist
      if (!whitelist.some((e) => event.request.url.startsWith(e)))
        return fetch(event.request)

      // Try to get the response from a cache
      const cachedResponse = await caches.match(event.request)

      // Return it if we found one and we don't have connection
      if (cachedResponse && isOffline) return cachedResponse

      // If we didn't find a match in the cache, use the network
      const response = await fetch(event.request)

      if (response.status < 400) {
        try {
          const responseClone = response.clone()
          const cacheStore = await caches.open('v1')
          cacheStore
            .put(event.request, responseClone)
            .catch((e) =>
              console.warn('Cannot put a request to the cache:', e.message)
            )
        } catch (e) {
          console.warn('Cannot put a request to the cache:', e.message)
        }
      }

      return response
    })()
  )
})
