export const subscribeToPush = async () => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered");

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.log("Notification permission denied");
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "YOUR_PUBLIC_VAPID_KEY",
      });

      await fetch("YOUR_SERVER_ENDPOINT/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Push subscription successful");
    } catch (error) {
      console.error("Push subscription failed:", error);
    }
  }
};
