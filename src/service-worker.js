import { clientsClaim, skipWaiting, setCacheNameDetails } from 'workbox-core'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
} from 'workbox-strategies'

self.__precacheManifest = [].concat(self.__precacheManifest || [])

let hasRelativeServiceWorker = false
const relativeServiceWorker = '/service-worker.js'

self.__precacheManifest.forEach((el) => {
  if (el.url === relativeServiceWorker) hasRelativeServiceWorker = true
})

if (!hasRelativeServiceWorker) {
  self.__precacheManifest.push({
    url: relativeServiceWorker,
    revision: null,
  })
}

setCacheNameDetails({
  prefix: 'habra-app',
  suffix: 'v2',
  precache: 'precache',
  runtime: 'runtime',
  googleAnalytics: 'ga',
})

clientsClaim()
skipWaiting()

precacheAndRoute(self.__precacheManifest, {
  directoryIndex: null,
})

const newResponse = (res, headerFn) => {
  const cloneHeaders = () => {
    const headers = new Headers()
    // eslint-disable-next-line no-restricted-syntax
    for (const kv of res.headers.entries()) {
      headers.append(kv[0], kv[1])
    }
    return headers
  }

  const headers = headerFn ? headerFn(cloneHeaders()) : res.headers

  return new Promise((resolve) =>
    res.blob().then((blob) => {
      resolve(
        new Response(blob, {
          status: res.status,
          statusText: res.statusText,
          headers,
        })
      )
    })
  )
}

const cacheHeaderPlugin = [
  {
    cacheWillUpdate: ({ response }) =>
      newResponse(response.clone(), (headers) => {
        headers.set('x-sw-cache', new Date().getTime())
        return headers
      }),
  },
]

registerRoute(
  /^https?:\/\/.*\/kek\/(v1|v2)\/.*/,
  new NetworkFirst({
    networkTimeoutSeconds: 10,
    cacheName: 'api-cache',
    plugins: [
      ...cacheHeaderPlugin,
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 24 * 60 * 60 * 30, // one month
        maxEntries: 100,
      }),
    ],
  })
)

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
)

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)
