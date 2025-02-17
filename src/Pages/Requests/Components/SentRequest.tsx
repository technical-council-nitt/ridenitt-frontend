import { age } from "../../../Utils/datetime"

export default function SentRequest({
  request
}: {
  request: Invite
}) {
  const ride = request.receiverRide
  const st = new Date(ride.earliestDeparture)
  const ed = new Date(ride.latestDeparture)

  return (
    <li className='p-2 flex gap-2 justify-between items-start border-2 border-green-700 rounded-xl'>
      <div>
        <span className='font-semibold'>
          {ride.stops[0].name} to {ride.stops[1].name}
        </span>
        <br />
        <span>
          Owner:
          {' '}
          <strong>{ride.owner.name}</strong>
        </span>
        <br />
        <span className="text font-Quicksand text-sm">
          {st.toLocaleString('default', { month: 'short', day: '2-digit', year: 'numeric' })} | {st.getHours()}:{st.getMinutes().toString().padStart(2, '0')} - {ed.getHours()}:{ed.getMinutes().toString().padStart(2, '0')}
        </span>
        <br />
        <span className='text-neutral-600'>
          {request.receiverRide.vehicleType} | {request.receiverRide.participants.length} people sharing
        </span>
        <br />
      </div>

      <div className="flex flex-col items-end justify-between gap-4">
        <div className={`mt-2 font-semibold text-sm ${request.status === 'ACCEPTED' ? 'text-green-700' : request.status === 'PENDING' ? 'text-amber-700' : 'text-red-700'}`}>
          {request.status}
        </div>

        <span>
          {age(Date.now() - new Date(request.createdAt).getTime())}
        </span>
      </div>
    </li>
  )
}
