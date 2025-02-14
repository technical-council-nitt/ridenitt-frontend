import { useCurrentRide } from '../Hooks/useCurrentRide';
import Redirect from '../Components/Redirect';
import { useAuth } from '../Hooks/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CurrentRide() {
  const { user } = useAuth()
  const { currentRide, refreshCurrentRide } = useCurrentRide();

  if (!user) {
    return (
      <Redirect to="/login" />
    )
  }

  if (!currentRide) {
    return (
      <Redirect to="/suggestions" />
    )
  }

  const handleCancelRide = () => {
    const reason = prompt("Please enter the reason for cancelling the ride")

    axios.delete("/api/rides/current", {
      data: {
        reason
      }
    })
      .then(() => {
        toast.success("Ride cancelled successfully")
        refreshCurrentRide()
      })
      .catch(err => {
        console.error(err)
        toast.error(err.response.data?.error ?? 'Failed to cancel the ride')
      })
  }
  
  const handleConfirmRide = () => {
    axios.post("/api/rides/current/confirm")
      .then(() => {
        toast.success("Ride confirmed successfully")
        refreshCurrentRide()
      })
      .catch(err => {
        console.error(err)
        toast.error(err.response.data?.error ?? 'Failed to confirm the ride')
      })
  }

  const handleLeaveRide = () => {
    axios.delete("/api/rides/current/leave")
      .then(() => {
        toast.success("Left the ride successfully")
        refreshCurrentRide()
      })
      .catch(err => {
        console.error(err)
        toast.error(err.response.data?.error ?? 'Failed to leave the ride')
      })
  }

  return (
    <div className='p-4'>
      <h1 className='mb-4 font-semibold text-2xl text-green-600'>
        Your current Ride
      </h1>

      <p>
        <strong>Owner:</strong> {currentRide.owner.name}
      </p>

      <p>
        <strong>Participants:</strong>
        <br/>
        {currentRide.participants.map(p => `${p.name} (${p.phoneNumber})`).reduce((acc, p) => {acc.push(p, <br/>); return acc}, [] as any)}
      </p>

      <p>
        <strong>Vehicle:</strong> {currentRide.vehicleType}
      </p>

      <p>
        <strong>Capacity:</strong> {currentRide.capacity}
      </p>

      <p>
        <strong>Status:</strong> {currentRide.status}
      </p>

      <p>
        {currentRide.stops.map((stop, i) => (
          <div key={stop.name}>
            <p>
              Stop {i + 1}: {stop.name}
            </p>
          </div>
        ))}
      </p>

      {user?.id === currentRide.owner.id ? (
        <div className='mt-4 flex gap-2'>
          <button onClick={handleCancelRide} className='p-2 bg-red-600 text-white rounded-lg font-semibold'>
            Cancel Ride
          </button>

          <button onClick={handleConfirmRide} className='p-2 bg-green-600 text-white rounded-lg font-semibold'>
            Mark as Complete
          </button>
        </div>
      ) : (
        <button onClick={handleLeaveRide} className='mt-4 p-2 bg-red-600 text-white rounded-lg font-semibold'>
          Leave Ride
        </button>
      )}
    </div>
  )
}
