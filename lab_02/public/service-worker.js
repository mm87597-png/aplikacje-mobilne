self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = new URL(
    event.notification.data?.url || './',
    self.registration.scope
  ).href;

  event.waitUntil(self.clients.openWindow(url));
});

self.addEventListener('push', (event) => {
  const rawMessage = event.data ? event.data.text() : '';
  let message;

  try {
    message = rawMessage ? JSON.parse(rawMessage) : {};
  } catch {
    message = { body: rawMessage };
  }

  event.waitUntil(
    self.registration.showNotification(message.title || 'Web Push', {
      body: message.body || '',
      icon: new URL('android.png', self.registration.scope).href,
      data: { url: './' },
    })
  );
});