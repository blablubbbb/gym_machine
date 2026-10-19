/* Gym Machine service worker: keeps the whole app on the phone so it opens and works offline.
   Bump CACHE when any file changes so phones pick up the new version. */
var CACHE = "gym-machine-1.3.0";
var FILES = [
  "./", "index.html", "style.css", "app.js", "manifest.webmanifest",
  "vendor/jsQR.js", "vendor/qrcode-generator.js",
  "fonts/barlow-400.woff", "fonts/barlow-600.woff",
  "fonts/barlow-condensed-600.woff", "fonts/barlow-condensed-700.woff",
  "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("message", function (e) { if (e.data === "skipWaiting") self.skipWaiting(); });

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
      return hit || fetch(e.request).catch(function () {
        if (e.request.mode === "navigate") return caches.match("index.html");
      });
    })
  );
});
