// // Cache name
// const CACHE_NAME = "pwa-caches";
// // Cache targets
// const urlsToCache = [
//   "./",
//   "./index.html",
//   "./indexLogin.html",
//   "./style.css",
//   "./styleLogin.css",
//   "./script.js",
//   "./scriptCommon.js",
//   "./scriptLogin.js",
//   "./sw.js",
//   "./manifest.json",
//   "./lib/sweetalert2.js",
//   "./lib/sweetalert2Dark.css",
//   "./img/backgroundBlack.jpg",
//   "./img/backgroundGreen.jpg",
//   "./img/backgroundPink.jpg",
//   "./img/OnlineForm.png",
// ];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response ? response : fetch(event.request);
//     })
//   );
// });
