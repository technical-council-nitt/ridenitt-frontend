export default function SentRequest({
  request
}: {
  request: any
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
          {request.receiverRide.vehicleType} | {request.receiverRide.capacity} people sharing
        </span>
        <br />
      </div>
      <div className={`mt-2 text-neutral-600 font-semibold text-sm ${request.status === 'ACCEPTED' ? 'text-green-700' : 'text-red-700'}`}>
        {request.status}
      </div>
    </li>
  )
}
