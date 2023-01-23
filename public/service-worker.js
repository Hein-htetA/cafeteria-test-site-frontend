//console.log("Service Worker Loaded...");

self.addEventListener("push", async function (event) {
  const windowClients = await clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });

  let visibilityState = false;
  //console.log("window clients", windowClients);

  for (let i = 0; i < windowClients.length; i++) {
    //console.log("in for loop");
    const windowClient = windowClients[i];
    //console.log(windowClient);
    if (windowClient.visibilityState) {
      visibilityState = true;
      break;
    }
  }

  if (visibilityState) return;
  const options = {
    body: "You have 1 new order waiting.",
    icon: "/android-chrome-192x192.png",
    badge: "/apple-touch-icon.png",
    timestamp: Date.parse("01 Jan 2000 00:00:00"),
    data: {
      count: 1,
    },
    tag: "x",
    renotify: true,
  };
  const title = "New Order!";
  const notifications = await self.registration.getNotifications();
  const currentNotification = notifications[0];
  if (currentNotification) {
    const currentCount = currentNotification.data.count;
    options.data.count = currentCount + 1;
    options.body = "You have " + options.data.count + " new order waiting!";
  }
  const promiseChain = await self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();

  // Do something as the result of the notification click
  const urlToOpen = new URL("/", self.location.origin).href;
  const promiseChain = clients.openWindow(urlToOpen);

  event.waitUntil(promiseChain);
});
