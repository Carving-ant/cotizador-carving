self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('cotizador-v1').then(function(cache) {
      return cache.addAll([
        './',
        './index.html',
        './manifest.json',
        './1carving.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
