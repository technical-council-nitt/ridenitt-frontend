import { useEffect, useState } from 'react'
import ReceivedRequest from './Components/ReceivedRequest'
import SentRequest from './Components/SentRequest'
import { useCurrentRide } from '../../Hooks/useCurrentRide'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../../Hooks/useAuth'

export default function Requests() {
  const { user } = useAuth()
  const { currentRide } = useCurrentRide()
  const [requests, setRequests] = useState<Invite[]>([])
  const [loading, setLoading] = useState(true)

  const [tab, setTab] = useState<"sent" | "received">('sent')

  const fetchRequests = () => {
    setLoading(true)

    axios.get('/api/invites')
      .then(res => {
        setRequests(res.data.data)
      })
      .catch(err => {
        console.error(err)
        setRequests([])
        toast.error(err.response.data?.error ?? 'Failed to fetch invites')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!user) return

    if (currentRide?.owner.id === user?.id) {
      setTab('received')
    } else {
      setTab('sent')
    }

    fetchRequests()
  }, [user, currentRide])

  return (
    <div className='p-4 pb-40'>
      <h1 className='font-semibold text-2xl text-green-600'>
        Ride Requests
      </h1>
      <h2 className='text-lg'>
        Gateway to find your ride partner
      </h2>

      <div className='mt-4 w-full rounded-xl border border-green-700 border-solid grid grid-cols-1 place-items-stretch'>
        <button disabled className={`py-2 rounded-xl ${tab === 'sent' ? "bg-green-700 text-white" : "hidden"}`}>
          Posted Requests
        </button>
        <button disabled className={`py-2 rounded-xl ${tab === 'received' ? "bg-green-700 text-white" : "hidden"}`}>
          Your Requests
        </button>
      </div>

      {loading ? (
        <div className='mt-4'>
          <p className='text-center text-gray-500'>
            Loading requests...
          </p>
        </div>
      ) : requests.length === 0 && (
        <div className='mt-4'>
          <p className='text-center text-gray-500'>
            No requests found
          </p>
        </div>
      )}

      {tab === 'received' && (
        <ul className='mt-4 flex flex-col gap-2'>
          {requests.map((req, idx) => (
            <ReceivedRequest
              key={idx}
              request={req}
              refreshRequests={fetchRequests}
            />
          ))}
        </ul>
      )}

      {tab === 'sent' && <ul className='mt-4 flex flex-col gap-2'>
        {requests.map((req, idx) => (
          <SentRequest
            key={idx}
            request={req}
          />
        ))}
      </ul>}
    </div>
  )
}
