import { useState } from "react"
import { useCurrentRide } from "../../../Hooks/useCurrentRide"
import { displayTimeRange } from "../../../Utils/datetime"
import RideDetailsModal from "./RideDetailsModal"
import { useAuth } from "../../../Hooks/useAuth"

export default function SentRequest({
  request
}: {
  request: Invite
}) {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const { currentRide } = useCurrentRide()
  const { user } = useAuth()
  const ride = request.receiverRide
  const st = new Date(ride.earliestDeparture)
  const ed = new Date(ride.latestDeparture)

  const handleLeave = () => {

  }

  return (
    <li className='p-2 border-2 border-green-700 rounded-xl'>
      <RideDetailsModal currentUserId={user?.id} ride={ride} open={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} />
      <div className="flex gap-2 justify-between items-start">
        <div role="button" onClick={() => setDetailsModalOpen(true)}>
          <span>
            <strong>{ride.owner.name}</strong>
          </span>
          <br />
          <span className='text-neutral-600'>
            {ride.vehicleType} | {ride.participants.length} people sharing
          </span>
          <br />
          {/* {ride.id === currentRide?.id && (
            <span className='block mb-2 text-green-700'>
              Current Ride
            </span>
          )} */}
        </div>

        <div className="flex flex-col items-end gap-2">
          <span role="button" onClick={() => setDetailsModalOpen(true)} className='mb-2 block text-neutral-600 font-Quicksand text-sm'>
            {displayTimeRange(st, ed, new Date())}
          </span>

          {request.status === 'ACCEPTED' && currentRide?.id === request.receiverRideId ? (
            <button className='mt-2 w-20 text-xs p-1 border-2 border-red-600 bg-red-100 text-neutral-800 rounded-lg font-semibold' onClick={handleLeave}>
              Leave
            </button>
          ) : (
            <span className={`${request.status === 'PENDING' ? 'text-yellow-600' : request.status === 'ACCEPTED' ? 'text-green-600' : 'text-red-600'}`}>
              {request.status[0] + request.status.substring(1).toLowerCase()}
            </span>
          )}
        </div>
      </div>
    </li>
  )
}
