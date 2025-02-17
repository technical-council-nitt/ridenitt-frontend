import { toast } from 'react-toastify'
import axios from 'axios'
import { useCurrentRide } from '../../../Hooks/useCurrentRide'
import { age } from '../../../Utils/datetime'

export default function ReceivedRequest({
  request,
  refreshRequests
}: {
  request: Invite,
  refreshRequests: () => void
}) {
  const { refreshCurrentRide } = useCurrentRide()
  const ride = request.receiverRide
  const st = new Date(ride.earliestDeparture)
  const ed = new Date(ride.latestDeparture)

  const handleAccept = () => {
    axios.post(`/api/invites/${request.id}/accept`)
      .then(() => {
        toast.success('Request accepted')
        refreshRequests()
        refreshCurrentRide()
      })
      .catch(err => {
        console.error(err)
        toast.error(err.response.data?.error ?? 'Failed to accept request')
      })
  }

  const handleDecline = () => {
    const reason = window.prompt('Enter reason for declining')

    if (!reason) return
    if (reason.length < 10) {
      return toast.error('Reason must be atleast 10 characters')
    }

    axios.post(`/api/invites/${request.id}/decline`, {
      reason
    })
      .then(() => {
        toast.success('Request declined')
        refreshRequests()
      })
      .catch(err => {
        console.error(err)
        toast.error(err.response.data?.error ?? 'Failed to decline request')
      })
  }

  return (
    <>
      <li className='p-2 border-2 border-green-700 rounded-xl'>
        <div className='flex gap-2 justify-between items-start'>
          <div>
            <span>
              Sender:
              {' '}
              <strong>{request.sender.name}</strong>
            </span>
            <br />
            <span className='font-semibold'>
              {request.receiverRide.stops[0].name} to {request.receiverRide.stops[1].name}
            </span>
            <br />
            <span className="text font-Quicksand text-sm">
              {st.toLocaleString('default', { month: 'short', day: '2-digit', year: 'numeric' })} | {st.getHours()}:{st.getMinutes().toString().padStart(2, '0')} - {ed.getHours()}:{ed.getMinutes().toString().padStart(2, '0')}
            </span>
            <br />
            <span className='text-neutral-600'>
              {request.receiverRide.vehicleType} | {request.receiverRide.participants.length} people sharing
            </span>
          </div>
          <div className='flex justify-between flex-col items-end gap-4'>
            <div className={`mt-2 font-semibold text-sm ${request.status === 'ACCEPTED' ? 'text-green-700' : request.status === 'PENDING' ? 'text-amber-700' : 'text-red-700'}`}>
              {request.status}
            </div>

            {request.status === 'PENDING' ? (
              <div className='mt-2'>
                <button className='p-1 border-2 border-green-600 text-green-600 text-sm rounded-lg font-semibold' onClick={handleAccept}>
                  Accept
                </button>
                <button className='p-1 border-2 border-red-600 text-red-600 text-sm rounded-lg font-semibold' onClick={handleDecline}>
                  Decline
                </button>
              </div>
            ) : request.status === 'ACCEPTED' ? (
              <button className='mt-2 p-1 border-2 border-red-600 text-red-600 text-sm rounded-lg font-semibold' onClick={handleDecline}>
                Remove
              </button>
            ) : null}

            <span>
              {age(Date.now() - new Date(request.createdAt).getTime())}
            </span>
          </div>
        </div>
      </li>
    </>
  )
}
