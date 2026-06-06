const CACHE_NAME = "ridenitt-cache-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  // Add more assets or routes as needed
];

self.addEventListener("push", function (event) {
  let data = {};

  if (event.data) {
    data = event.data.json();
  }

  const title = data.title || "Ride NITT";
  const options = {
    body: data.body || "You have a new notification",
    icon: data.icon || "/logo192.png",
    badge: data.badge || "/logo192.png",
    tag: data.tag || "ride-nitt-notification",
    requireInteraction: data.requireInteraction ?? false,
    data: { url: data.url || "/" },
    vibrate: data.vibrate || [200, 100, 200],
    actions: [
      {
        action: "open",
        title: "Open",
        icon: "/logo192.png",
      },
      {
        action: "close",
        title: "Close",
        icon: "/logo192.png",
      },
    ],
  };

  // Only add sound if provided (uses system notification sound by default)
  if (data.sound) {
    options.sound = data.sound;
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  if (event.action === "close") {
    return;
  }

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

// Handle notification close action
self.addEventListener("notificationclose", function (event) {
  console.log("Notification closed:", event.notification.tag);
});

// Install event: cache app shell
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Fetch event: serve cached content when offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached response if found, else fetch from network
      return (
        response ||
        fetch(event.request).catch(() =>
          // Optionally, return a fallback page for navigation requests
          event.request.mode === "navigate"
            ? caches.match("/index.html")
            : undefined
        )
      );
    })
  );
});