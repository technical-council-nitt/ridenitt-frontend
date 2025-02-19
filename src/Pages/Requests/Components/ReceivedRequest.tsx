import { toast } from 'react-toastify'
import axios from 'axios'
import { displayTimeRange } from '../../../Utils/datetime'
import RideDetailsModal from './RideDetailsModal'
import { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

export default function ReceivedRequest({
  request,
  refreshRequests
}: {
  request: ClusteredInvites,
  refreshRequests: () => void
}) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const ride = request.invites[0]!.receiverRide
  const st = new Date(ride.earliestDeparture)
  const ed = new Date(ride.latestDeparture)

  const handleAccept = (inviteId: string) => {
    axios.post(`/api/invites/${inviteId}/accept`)
      .then(() => {
        toast.success('Request accepted')
        refreshRequests()
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

  const handleCancel = () => {
    const reason = prompt("Please enter the reason for cancelling the ride")

    if (!reason) return
    if (reason.length < 10) {
      return toast.error("Reason must be atleast 10 characters")
    }

    setLoading(true)

    axios.delete("/api/rides/current", {
      data: {
        reason
      }
    })
      .then(() => {
        refreshRequests()
        toast.success("Ride cancelled successfully")
      })
      .catch(err => {
        console.error(err)
        toast.error(err.response.data?.error ?? "Failed to cancel ride")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <li className='p-2 border-2 border-green-700 rounded-xl'>
        <RideDetailsModal open={false} onClose={() => setDetailsOpen(false)} ride={ride} />

        <div className='flex gap-4 justify-between items-start'>
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
            <button onClick={() => setDetailsOpen(p => !p)} className='mt-2 text-sm flex items-center gap-2'>
              {request.invites.length} request{request.invites.length > 1 ? 's' : 'mt-1'} received
              {detailsOpen ? (
                <FaAngleDown />
              ) : (
                <FaAngleUp />
              )}
            </button>
          </div>
          <div className='flex justify-start flex-col items-end gap-2'>
            <span className='text-neutral-600 text-sm'>
              {displayTimeRange(st, ed, new Date())}
            </span>

            {ride.status === 'PENDING' ? (
              <button onClick={handleCancel} disabled={loading} className='disabled:opacity-50 p-1 text-sm border-2 border-red-600 bg-red-600 text-white rounded-lg font-semibold'>
                Cancel Ride
              </button>
            ) : (
              <span className={`text-sm ${ride.status === 'COMPLETED' ? 'text-green-600' : 'text-red-600'}`}>
                {ride.status[0] + ride.status.substring(1).toLowerCase()}
              </span>
            )}
          </div>
        </div>
        <ul className={`${detailsOpen ? "max-h-96" : "max-h-0"} mt-2 duration-200 overflow-auto`}>
          {request.invites.map(invite => (
            <div key={invite.id} className='flex justify-between items-center gap-4'>
              <div className=''>
                <strong>{invite.sender.name}</strong>
                <span className='block text-sm text-neutral-700'>
                  {invite.sender.phoneNumber}
                </span>
              </div>

              {invite.status === 'PENDING' ? (
                <div className='mt-2 text-xs'>
                  <button className='mr-2 w-20 p-1 border-2 border-green-600 bg-green-600 text-white rounded-lg font-semibold' onClick={() => handleAccept(invite.id)}>
                    Accept
                  </button>
                  <button className='w-20 p-1 border-2 border-red-600 bg-red-100 text-neutral-800 rounded-lg font-semibold' onClick={() => handleDecline(invite.id)}>
                    Decline
                  </button>
                </div>
              ) : invite.status === 'ACCEPTED' ? (
                <button className='mt-2 w-20 text-xs p-1 border-2 border-red-600 bg-red-100 text-neutral-800 rounded-lg font-semibold' onClick={() => handleDecline(invite.id)}>
                  Remove
                </button>
              ) : (
                <button disabled className='mt-2 text-xs opacity-50 w-20 p-1 border-2 border-neutral-600 bg-neutral-100 text-neutral-800 rounded-lg font-semibold' onClick={() => handleDecline(invite.id)}>
                  {invite.declineReason?.startsWith("Left:") ? "Left" : "Declined"}
                </button>
              )}
            </div>
          ))}
        </ul>
      </li>
    </>
  )
}
