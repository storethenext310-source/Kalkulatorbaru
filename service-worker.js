const CACHE_NAME = "dirman-calculator-v3";

const APP_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];


/* INSTALL */

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});


/* ACTIVATE */

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(names =>
        Promise.all(
          names
            .filter(name => name !== CACHE_NAME)
            .map(name => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});


/* FETCH — NETWORK FIRST */

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(

    fetch(event.request)

      .then(response => {

        const responseClone =
          response.clone();

        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(
              event.request,
              responseClone
            );
          });

        return response;

      })

      .catch(() => {
        return caches.match(
          event.request
        );
      })

  );

});