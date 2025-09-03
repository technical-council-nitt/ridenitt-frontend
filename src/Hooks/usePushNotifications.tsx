import { useEffect } from "react";
import axios from "axios";

const VAPID_PUBLIC_KEY = "BAnAeN62IYpOlGk9mmw7frh1fjmqluKD6gjW3ey2_mhP1NWU6A_BAFTaAIJ9Vmr0d0swYK_hAT0ZFQnWwtRYkjY"; // Replace with your actual public key

// Convert Base64 string to Uint8Array (BufferSource)
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray; // ✅ Now correctly Uint8Array (BufferSource)
}

// Define your user type
interface User {
  id?: string;
  email?: string;
  name?: string;
}

export default function usePushNotifications(user: User | null) {
  useEffect(() => {
    if (!user) return;
    if (!user?.id) return; 

    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.register("/sw.js").then(async (registration) => {

        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource, // 👈 cast fix
          });

          // Send subscription to backend
          await axios.post(
            "/api/notifications/subscribe",
            { subscription, userId: user.id },
            { withCredentials: true } 
          );
        }
      });
    }
  }, [user]);
}
