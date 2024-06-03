const addResourcesToCache = async (resources) => {
    console.log("adding resources to cache");
    const cache = await caches.open("Version1");
    await cache.addAll(resources);
  };
  
  self.addEventListener("install", (event) => {
    event.waitUntil(
      addResourcesToCache([
        "/",
        "/manifest.json",
        "/index.html",
        "/main.css",
        "/app.js"
      ]),
    );
  });  

  const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      return responseFromCache;
    }
    return fetch(request);
  };
  
  /* every network request will be intercepted by the service worker
  which will respond with what matches in the cache */
  self.addEventListener("fetch", (event) => {
    event.respondWith(cacheFirst(event.request));
  });