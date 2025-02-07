import React, { useState } from 'react'
import Navigation from '../Components/Navigation'

const RideCard = ({ ride }: { ride: any }) => (
  <li className='p-2 flex justify-between gap-4 bg-white border-2 border-solid border-green-700 rounded-xl'>
    <div>
      <span className='font-semibold'>
        {ride.name}
      </span>
      <br />
      <span className='text-neutral-600'>
        Car | 4 people sharing
      </span>
    </div>
    <div className='font-semibold text-neutral-600'>
      Today at 12:00 PM
    </div>
  </li>
)

export default function MyRides() {
  const [tab, setTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming')
  const [upcomingRides, setUpcomingRides] = useState(new Array(3).fill({ name: 'Nate' }))
  const [completedRides, setCompletedRides] = useState(new Array(3).fill({ name: 'Nate' }))
  const [cancelledRides, setCancelledRides] = useState(new Array(3).fill({ name: 'Nate' }))

  return (
    <div className='p-2 pb-20'>
      <h1 className='text-2xl font-semibold text-green-700'>
        My Rides
      </h1>
      <h2>
        Your Ride Records, Simplified
      </h2>

      <div className='my-4 grid grid-cols-3 rounded-xl bg-green-50 border border-solid border-green-700'>
        <button className={`p-2 rounded-xl ${tab === 'upcoming' ? 'bg-green-700 text-white' : ''}`} onClick={() => setTab('upcoming')}>Upcoming</button>
        <button className={`p-2 rounded-xl ${tab === 'completed' ? 'bg-green-700 text-white' : ''}`} onClick={() => setTab('completed')}>Completed</button>
        <button className={`p-2 rounded-xl ${tab === 'cancelled' ? 'bg-green-700 text-white' : ''}`} onClick={() => setTab('cancelled')}>Cancelled</button>
      </div>

      {tab === 'upcoming' && (
        <ul className='flex flex-col gap-2'>
          {upcomingRides.map((ride, index) => (
            <RideCard key={index} ride={ride} />
          ))}
        </ul>
      )}

      {tab === 'completed' && (
        <ul className='flex flex-col gap-2'>
          {completedRides.map((ride, index) => (
            <RideCard key={index} ride={ride} />
          ))}
        </ul>
      )}

      {tab === 'cancelled' && (
        <ul className='flex flex-col gap-2'>
          {cancelledRides.map((ride, index) => (
            <RideCard key={index} ride={ride} />
          ))}
        </ul>
      )}

      <Navigation />
    </div>
  )
}
