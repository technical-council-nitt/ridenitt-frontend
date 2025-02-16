import { displayTimeRange } from "../../../Utils/datetime"

export default function RideDetailsModal({
  open,
  onClose,
  currentUserId,
  ride
}: {
  open: boolean,
  onClose: () => void,
  currentUserId?: string,
  ride: Ride
}) {

  if (!open) return null

  return (
    <div onClick={onClose} className='fixed inset-0 bg-black/25 grid place-items-center backdrop-blur-sm'>
      <div onClick={e => e.stopPropagation()} className='p-4 bg-white border border-black border-solid rounded-lg'>
        <div className="flex gap-4 text-sm">
          <div>
            <span className="font-semibold">
              From {ride.stops[0].name}
            </span>
            <br />
            <span className="font-semibold">
              To {ride.stops[1].name}
            </span>
            <br />

            <span className="text-xs text-neutral-600">
              {ride.vehicleType} | {ride.participants.length} people sharing
            </span>
          </div>
          <div>
            <span className="text-neutral-600 text-xs">
              {displayTimeRange(new Date(ride.earliestDeparture), new Date(ride.latestDeparture), new Date())}
            </span>
          </div>
        </div>
        <div className="mt-2">
          <span>
            Ride Partners
          </span>
          <ul>
            {ride.participants.map(participant => (
              <div className="flex justify-between">
                <span>
                  <strong>{participant.name}</strong>
                  <span className="text-xs">
                    {currentUserId === participant.id && currentUserId === ride.owner.id ? (" (Owner, You)")
                      : participant.id === ride.owner.id ? (" (Owner)")
                        : currentUserId === participant.id ? (" (You)") : ""}
                  </span>

                  <span className="block -mt-1 text-xs">
                    {participant.gender}
                  </span>
                </span>

                <span>
                  {participant.phoneNumber ?? '+91 9xxxxxxxxx'}
                </span>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
