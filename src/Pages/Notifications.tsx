import React from 'react'
import { useAuth } from '../Hooks/useAuth'
import axios from 'axios'
import { age } from '../Utils/datetime'

export default function Notifications() {
  const { user } = useAuth()
  const [notifications, setNotifications] = React.useState<{ id: string, message: string, createdAt: string }[]>([])
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!user) {
      return
    }

    setLoading(true)

    axios.get('/api/notifications')
      .then(response => setNotifications(response.data.data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [user])

  return (
    <div className='p-4 bg-neutral-100 min-h-screen'>
      <h1 className='text-2xl text-green-600 font-semibold mb-4'>
        Notifications
      </h1>

      <ul>
        {loading ? <li>Loading...</li> : notifications.length === 0 && <li>No notifications</li>}

        {notifications.map(notification => (
          <li key={notification.id} className='bg-white p-4 mb-2 shadow-lg rounded-2xl'>
            {notification.message}

            <div className='text-right text-sm text-neutral-600'>
              {age(Date.now() - new Date(notification.createdAt).getTime())}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
