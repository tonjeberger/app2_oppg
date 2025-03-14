const cacheID = "notes";
const contentToCache = [
  "/index.html",
  "/app.mjs",
  "img/icons/small.png",
  "img/icons/large.png",
  "css/style.css",
];

self.addEventListener("install", (evt) => {
    console.log("[ServiceWorker] Install");
    evt.waitUntil((async () => {
        const cache = await caches.open(cacheID);
        console.log("[ServiceWorker] Caching all: app shell and content");
        await cache.addAll(contentToCache);
    })());
})

self.addEventListener("fetch", (evt) => {// alle nettverkskall går gjennom fetch
    if (evt.request.url.includes("/notes")) {
        return;
      }
  
    if(!(
    evt.request.url.startsWith("http:") ||
    evt.request.url.startsWith("https:")
  ) || evt.request.method !== "GET")
  {return;

  };
  evt.respondWith((async () => {
    const r = await caches.match(evt.request);
    console.log(`[Service Worker] Fetching resource: ${evt.request.url}`);
    if (r) {return r};
    const response = await fetch(evt.request);
    const cache = await caches.open(cacheID);
    console.log(`[Service Worker] Caching new resource: ${evt.request.url}`);
    cache.put(evt.request, response.clone());
    return response;
  })());
});