import { useState } from 'react'
import Navigation from '../../Components/Navigation'
import Modal from './Components/Modal'
import ReceivedRequest from './Components/ReceivedRequest'
import SentRequest from './Components/SentRequest'

export default function Requests() {
  const [sentRequests, setSentRequests] = useState<any[]>(
    new Array(4).fill({
      name: 'Nate',
      vehicle: 'Car',
      capacity: 4,
      status: 'Cancelled',
      time: 'Today at 09:20 AM'
    })
  )
  const [receivedRequests, setReceivedRequests] = useState<any[]>(
    new Array(1).fill({
      name: 'Nate',
      vehicle: 'Car',
      capacity: 4,
      time: 'Today at 09:20 AM',
      requests: new Array(4).fill({
        name: 'Nate',
        status: 'Pending',
        time: 'Today at 09:20 AM'
      })
    })
  )

  const [tab, setTab] = useState<"sent" | "received">('sent')
  const [receivedRequestsModalOpen, setReceivedRequestsModalOpen] = useState(false)

  return (
    <div className='p-4 pb-40'>
      <h1 className='font-semibold text-2xl text-green-600'>
        Ride Requests
      </h1>
      <h2 className='text-lg'>
        Gateway to find your ride partner
      </h2>

      <div className='mt-4 w-full rounded-xl border border-green-700 border-solid grid grid-cols-2 place-items-stretch'>
        <button className={`py-2 rounded-xl ${tab === 'sent' ? "bg-green-700 text-white" : ""}`} onClick={() => setTab('sent')}>
          Posted Requests
        </button>
        <button className={`py-2 rounded-xl ${tab === 'received' ? "bg-green-700 text-white" : ""}`} onClick={() => setTab('received')}>
          Your Requests
        </button>
      </div>

      {receivedRequestsModalOpen && (
        <Modal
          isOpen={receivedRequestsModalOpen}
          onClose={() => setReceivedRequestsModalOpen(false)}
          requests={receivedRequests}
        />
      )}

      {tab === 'received' && (
        <ul className='mt-4 flex flex-col gap-2'>
          {receivedRequests.map((req, idx) => (
            <ReceivedRequest
              key={idx}
              request={req}
            />
          ))}
        </ul>
      )}

      {tab === 'sent' && <ul className='mt-4 flex flex-col gap-2'>
        {sentRequests.map((req, idx) => (
          <SentRequest
            key={idx}
            request={req}
          />
        ))}
      </ul>}
    </div>
  )
}
