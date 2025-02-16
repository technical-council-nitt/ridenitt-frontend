import { useEffect, useState } from 'react'
import { useAuth } from '../Hooks/useAuth'
import Redirect from '../Components/Redirect'
import axios from 'axios'
import { toast } from 'react-toastify'
import Header from '../Components/Header'
import { displayTimeRange } from '../Utils/datetime'

const RideCard = ({ ride }: { ride: Ride }) => {
  const st = new Date(ride.earliestDeparture)
  const ed = new Date(ride.latestDeparture)
  const d = new Date()

  return (
    <li className='p-2 flex justify-between gap-4 bg-white border-2 border-solid border-green-700 rounded-xl'>
      <div>
        <span className='font-semibold'>
          {ride.owner.name}
        </span>
        <br />
        <span className='text-neutral-600'>
          {ride.vehicleType[0] + ride.vehicleType.substring(1).toLowerCase()} | {ride.participants.length} people
        </span>
      </div>
      <div className=''>
        <span className="text-sm text-neutral-600 font-Quicksand">
          {displayTimeRange(st, ed, d)}
        </span>
      </div>
    </li>
  )
}

export default function MyRides() {
  const { user } = useAuth()

  const [tab, setTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming')
  const [upcomingRides, setUpcomingRides] = useState<Ride[]>([])
  const [completedRides, setCompletedRides] = useState<Ride[]>([])
  const [cancelledRides, setCancelledRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    axios.get('/api/rides')
      .then(res => {
        const data = res.data.data

        const up = [], cp = [], ca = []

        for (let ride of data) {
          if (ride.status === 'PENDING') {
            up.push(ride)
          } else if (ride.status === 'COMPLETED') {
            cp.push(ride)
          } else if (ride.status === 'CANCELLED') {
            ca.push(ride)
          }
        }

        setUpcomingRides(up)
        setCompletedRides(cp)
        setCancelledRides(ca)
      })
      .catch(err => {
        console.log(err)
        toast.error('Failed to fetch rides')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [user])

  if (!user) {
    return (
      <Redirect to="/start" />
    )
  }

  return (
    <div className='px-4 py-8 pb-20'>
      <Header />

      <h1 className='mt-4 text-2xl font-semibold text-green-800'>
        My Rides
      </h1>
      <h2 className='font-semibold'>
        Your Ride Records, Simplified
      </h2>

      <div className='my-4 grid grid-cols-3 rounded-xl bg-green-50 border border-solid border-green-700'>
        <button className={`p-2 rounded-xl ${tab === 'upcoming' ? 'bg-green-700 text-white' : ''}`} onClick={() => setTab('upcoming')}>Upcoming</button>
        <button className={`p-2 rounded-xl ${tab === 'completed' ? 'bg-green-700 text-white' : ''}`} onClick={() => setTab('completed')}>Completed</button>
        <button className={`p-2 rounded-xl ${tab === 'cancelled' ? 'bg-green-700 text-white' : ''}`} onClick={() => setTab('cancelled')}>Cancelled</button>
      </div>

      {loading ? (
        <div className=''>
          <p>
            Loading rides...
          </p>
        </div>
      ) : ((tab === 'upcoming' && upcomingRides.length === 0)
        || (tab === 'completed' && completedRides.length === 0)
        || (tab === 'cancelled' && cancelledRides.length === 0)) && (
        <div className='text-center'>
          <p>
            No rides found in this category
          </p>
        </div>
      )}

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
    </div>
  )
}
