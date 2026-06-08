import React from 'react'
import { useAuth } from '../Hooks/useAuth'
import axios from 'axios'
import { age } from '../Utils/datetime'
import { FaRegEnvelope } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Header from '../Components/Header'
import { subscribeToPush, deleteExpiredSubscription, checkSubscriptionStatus } from "../services/push.services";

export default function Notifications() {
  const [pushEnabled, setPushEnabled] = React.useState(false);
  const [pushLoading, setPushLoading] = React.useState(false);
  const { user } = useAuth()
  const [notifications, setNotifications] = React.useState<{ id: string, message: string, createdAt: string }[]>([])
  const [loading, setLoading] = React.useState(false)

  // Check subscription status on mount
  React.useEffect(() => {
    const checkStatus = async () => {
      const isSubscribed = await checkSubscriptionStatus();
      setPushEnabled(isSubscribed);
    };
    checkStatus();
  }, []);

  const enablePushNotifications = async () => {
    try {
      setPushLoading(true);

      // 1️⃣ Subscribe in browser
      const subscription = await subscribeToPush();

      // 2️⃣ Send subscription to backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/notifications`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(subscription),
      });

      if (!response.ok) {
        throw new Error(`Failed to save subscription: ${response.status}`);
      }

      setPushEnabled(true);
      toast.success("Push notifications enabled ✅");
    } catch (err) {
      console.error("❌ Push notification error:", err);
      // If subscription failed to save, clean it up from browser
      await deleteExpiredSubscription();
      setPushEnabled(false);
      toast.error("Failed to enable push notifications");
    } finally {
      setPushLoading(false);
    }
  };

  const disablePushNotifications = async () => {
    try {
      setPushLoading(true);

      await deleteExpiredSubscription();

      setPushEnabled(false);
      toast.success("Push notifications disabled ✅");
    } catch (err) {
      console.error("❌ Disable push notification error:", err);
      toast.error("Failed to disable push notifications");
    } finally {
      setPushLoading(false);
    }
  };

  React.useEffect(() => {
    if (!user) {
      return
    }

    setLoading(true)

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/notifications`,
      { withCredentials: true }
    )
      .then(response => setNotifications(response.data.data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [user])

  return (
    <div className='p-4 bg-neutral-100 min-h-screen'>
      <Header />
      <div className='flex justify-between items-center mb-6'>
        <h1 className='mt-4 text-2xl text-green-600 font-semibold'>
          Notifications
        </h1>
        <div>
          <button
            onClick={pushEnabled ? disablePushNotifications : enablePushNotifications}
            disabled={pushLoading}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
              pushEnabled
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0"
              />
            </svg>
            {pushEnabled ? "Disable" : "Enable"}
          </button>
        </div>
      </div>

      <ul>
        {loading ? (
          <li className='text-center py-8 text-gray-600'>Loading...</li>
        ) : notifications.length === 0 ? (
          <li className='text-center py-8 text-gray-600'>No notifications</li>
        ) : (
          notifications.map(notification => (
            <li key={notification.id} className='bg-white p-4 mb-2 shadow rounded-lg'>
              <div className='flex items-start gap-3'>
                <FaRegEnvelope className='text-neutral-600 mt-1 flex-shrink-0' />
                <div className='flex-1'>
                  <p className='text-gray-800'>{notification.message}</p>
                  <p className='text-right text-sm text-neutral-500 mt-2'>
                    {age(Date.now() - new Date(notification.createdAt).getTime())} ago
                  </p>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
