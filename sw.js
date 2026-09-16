const CACHE = "a2-v1";
self.addEventListener("install", e => { self.skipWaiting(); });
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isCdn = /www\.gstatic\.com|fonts\.(googleapis|gstatic)\.com/.test(url.host);
  if (!sameOrigin && !isCdn) return;
  // network first, cache fallback (keeps the page fresh, still opens offline)
  e.respondWith(
    fetch(req).then(res => {
      if (res && res.ok) { const c = res.clone(); caches.open(CACHE).then(cache => cache.put(req, c)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: sameOrigin }))
  );
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(cs => {
    if (cs.length) return cs[0].focus();
    return self.clients.openWindow("./");
  }));
});
