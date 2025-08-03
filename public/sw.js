self.addEventListener("push", (event) => {
  const data = event.data.json();
  const { title, body, icon } = data;

  self.registration.showNotification(title, {
    body,
    icon: icon || "/pwa-192x192.png",
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/"));
});
