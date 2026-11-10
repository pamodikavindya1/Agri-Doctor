// පරණ service worker එක (පරණ site එක cache කරගෙන සිටින) ඉවත් කරන ස්වයං-විනාශ වන worker එකකි.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try { const keys = await caches.keys(); await Promise.all(keys.map(k => caches.delete(k))); } catch (e) {}
    try { await self.registration.unregister(); } catch (e) {}
    try {
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(c => c.navigate(c.url));
    } catch (e) {}
  })());
});
// fetch handler නැත: සියලු request network එකෙන්ම යයි
