import { useEffect, useState } from 'react'
import ReceivedRequest from './Components/ReceivedRequest'
import SentRequest from './Components/SentRequest'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../../Hooks/useAuth'
import Redirect from '../../Components/Redirect'
import Header from '../../Components/Header'

export default function Requests() {
  const { user } = useAuth()
  const [sentRequests, setSentRequests] = useState<Invite[]>([])
  const [receivedRequests, setReceivedRequests] = useState<ClusteredInvites[]>([])
  const [loading, setLoading] = useState(true)

  const [tab, setTab] = useState<"sent" | "received">('sent')

  const fetchRequests = () => {
    setLoading(true)

    axios.get('/api/invites')
      .then(res => {
        setSentRequests(res.data.data.sent || [])
        setReceivedRequests(res.data.data.received || [])
      })
      .catch(err => {
        console.error(err)
        setSentRequests([])
        setReceivedRequests([])
        toast.error(err.response.data?.error ?? 'Failed to fetch invites')
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  if (!user) {
    return (<Redirect to='/start' />)
  }

  return (
    <div className='p-4 pb-40'>
      <Header />

      <h1 className='mt-4 font-semibold text-2xl text-green-600'>
        Ride Requests
      </h1>
      <h2 className='text-lg'>
        Gateway to find your ride partner
      </h2>

      <div className='mt-4 w-full rounded-xl border border-green-700 border-solid grid grid-cols-2 place-items-stretch'>
        <button onClick={() => setTab('sent')} className={`py-2 rounded-xl ${tab === 'sent' ? "bg-green-700 text-white" : ""}`}>
          Sent Requests
        </button>
        <button onClick={() => setTab('received')} className={`py-2 rounded-xl ${tab === 'received' ? "bg-green-700 text-white" : ""}`}>
          Received Requests
        </button>
      </div>

      {loading ? (
        <div className='mt-4'>
          <p className='text-center text-gray-500'>
            Loading requests...
          </p>
        </div>
      ) : (tab === "sent" ? sentRequests.length === 0 : receivedRequests.length === 0) && (
        <div className='mt-4'>
          <p className='text-center text-gray-500'>
            No requests found
          </p>
        </div>
      )}

      {tab === 'received' && (
        <>
          {receivedRequests.length === 0 ? (
            <div className='mt-4 text-center text-gray-500'>
              No received requests found
            </div>
          ) : (
            <ul className='mt-4 flex flex-col gap-2'>
              {receivedRequests.map((req, idx) => (
                <ReceivedRequest
                  key={idx}
                  request={req}
                  refreshRequests={fetchRequests}
                />
              ))}
            </ul>
          )}
        </>
      )}

      {tab === 'sent' && (
        <ul className='mt-4 flex flex-col gap-2'>
          {sentRequests.map((req, idx) => (
            <SentRequest
              key={idx}
              request={req}
              refreshRequests={fetchRequests}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
