/* eslint-disable no-undef */
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response !== undefined) {
        return response
      } else {
        return fetch(event.request)
          .then(function (response) {
            const responseClone = response.clone()

            caches.open('v1').then(function (cache) {
              cache
                .put(event.request, responseClone)
                .catch((e) => console.warn('Cannot put a request:', e.message))
            })
            return response
          })
          .catch(function () {
            return null
          })
      }
    })
  )
})
