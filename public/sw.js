const cacheID = "scienceV1";
const contentToCache = [
  "/index.html",
  "/app.mjs",
  "img/icons/small.png",
  "img/icons/large.png",
  "css/style.css",
];// vi trenger ikke å bare cache filer, vi kan cache info fra API og legge inn feks hvor mange ganger vi har vært på siden, eller hvor ofte infoen skal oppdateres
// dette er listen over ting vi vil installere i cachen

self.addEventListener("install", (evt) => {
    console.log("[ServiceWorker] Install");
    evt.waitUntil((async () => {
        const cache = await caches.open(cacheID);
        console.log("[ServiceWorker] Caching all: app shell and content");
        await cache.addAll(contentToCache);
    })());
})

self.addEventListener("fetch", (evt) => {// alle nettverkskall går gjennom fetch
  if(!(
    evt.request.url.startsWith("http:") ||
    evt.request.url.startsWith("https:")
  ))
  {return;

  };
  evt.respondWith((async () => {
    const r = await caches.match(evt.request);
    console.log(`[Service Worker] Fetching resource: ${evt.request.url}`);
    if (r) {return r};
    const response = await fetch(evt.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${evt.request.url}`);
    cache.put(evt.request, response.clone());
    return response;
  })());
});