import { toast } from 'react-toastify'
import axios from 'axios'
import { useCurrentRide } from '../../../Hooks/useCurrentRide'
import { displayTimeRange } from '../../../Utils/datetime'
import RideDetailsModal from './RideDetailsModal'
import { useState } from 'react'

export default function ReceivedRequest({
  request,
  refreshRequests
}: {
  request: ClusteredInvites,
  refreshRequests: () => void
}) {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const { currentRide } = useCurrentRide()
  const { refreshCurrentRide } = useCurrentRide()
  const ride = request.invites[0]!.receiverRide
  const st = new Date(ride.earliestDeparture)
  const ed = new Date(ride.latestDeparture)

  const handleAccept = (inviteId: string) => {
    axios.post(`/api/invites/${inviteId}/accept`)
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

  const handleDecline = (inviteId: string) => {
    const reason = window.prompt('Enter reason for declining')

    if (!reason) return
    if (reason.length < 10) {
      return toast.error('Reason must be atleast 10 characters')
    }

    axios.post(`/api/invites/${inviteId}/decline`, {
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
        <RideDetailsModal open={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} ride={ride} />

        <div role="button" onClick={() => setDetailsModalOpen(true)} className='flex gap-4s justify-between items-start'>
          <div>
            <span className='font-semibold'>
              From {ride.stops[0].name}
              <br />
              To {ride.stops[1].name}
            </span>
            <br />
            <span className='block text-neutral-600 text-sm'>
              {ride.vehicleType} | {ride.participants.length} people sharing
            </span>
            <span className='mt-2 block'>
              {request.invites.length} request{request.invites.length > 1 ? 's' : ''} received
            </span>
          </div>
          <div className='flex justify-start flex-col items-end gap-2'>
            <span className='text-neutral-600 text-sm'>
              {displayTimeRange(st, ed, new Date())}
            </span>

            {ride.id === currentRide?.id && (
              <span className='text-green-700'>
                Current Ride
              </span>
            )}
          </div>
        </div>
        <ul>
          {request.invites.map(invite => (
            <div className='flex justify-between items-center gap-4'>
              <span className='block'>
                <strong>{invite.sender.name}</strong>
              </span>

              {invite.status === 'PENDING' ? (
                <div className='mt-2'>
                  <button className='mr-2 p-1 border-2 border-green-600 bg-green-600 text-white text-sm rounded-lg font-semibold' onClick={() => handleAccept(invite.id)}>
                    Accept
                  </button>
                  <button className='p-1 border-2 border-red-600 bg-red-100 text-neutral-800 text-sm rounded-lg font-semibold' onClick={() => handleDecline(invite.id)}>
                    Decline
                  </button>
                </div>
              ) : invite.status === 'ACCEPTED' ? (
                <button className='mt-2 p-1 border-2 border-red-600 bg-red-100 text-neutral-800 text-sm rounded-lg font-semibold' onClick={() => handleDecline(invite.id)}>
                  Remove
                </button>
              ) : <span className='mt-2 text-red-700'>
                Declined
              </span>}
            </div>
          ))}
        </ul>
      </li>
    </>
  )
}
