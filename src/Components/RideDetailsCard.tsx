import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { displayTimeRange } from "../Utils/datetime";

const RideDetailsCard = ({ ride, refreshRide }: {
  ride: Ride,
  refreshRide: () => void,
}) => {
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const st = new Date(ride.earliestDeparture)
  const ed = new Date(ride.latestDeparture)

  const handleSend = () => {
    setLoading(true)
    axios.post('/api/invites', {
      rideId: ride.id
    })
      .then(() => {
        toast.success('Request sent successfully!');
        refreshRide()
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to send request. Please try again later.');
      })
      .finally(() => setLoading(false))
  }

  return (
    <li key={ride.id} className="p-4 border-[2px] border-[#08B783] bg-[#C1EDE08C] w-[auto] rounded-[10px]">
      <div className={`fixed inset-0 grid place-items-center bg-black/25 z-[2] ${showModal ? 'block' : 'hidden'}`} onClick={() => setShowModal(false)}>
        <div className="p-4 m-4 bg-white rounded-lg" onClick={(e) => e.stopPropagation()}>
          <p>
            Please leave your current ride to send a request
          </p>

          <button className="w-fit ml-auto block bg-[#008955] text-white p-2 rounded-[10px] mt-4" onClick={() => setShowModal(false)}>
            Close
          </button>
        </div>
      </div>
      <div className="font-Quicksand font-[700]">
        {ride.stops[0].name} to {ride.stops[1].name}
      </div>
      <div className="flex items-center justify-start gap-4">
        <img src={`/Images/${ride.vehicleType.toUpperCase()}.png`} className="w-full max-w-16 aspect-square"></img>
        <div className="min-w-44 max-sm:text-sm">
          <div className="mt-2 text font-Quicksand text-neutral-700 font-[700]">
            {displayTimeRange(st, ed, new Date())}
            <br />
            {ride.vehicleType[0] + ride.vehicleType.substring(1).toLowerCase()} | {ride.participants.length} People sharing
          </div>
          <div className="mt-2 flex items-center gap-2">
            <img src="profile.svg" className=""></img>
            <div className="text-neutral-700 font-[600]">Posted by {ride.owner.name}</div>
          </div>
        </div>
      </div>
      <div className="mt-2 border-2 border-[#008955] rounded-[10px]">
        {ride.myInvite ? (
          <button disabled className="p-2 text-[#008955] w-full font-Quicksand font-[600]">
            {ride.myInvite.status}
          </button>
        ) : (
          <button disabled={loading} onClick={handleSend} className="p-2 disabled:opacity-50 w-full text-center font-Quicksand font-[600]">
            Send Request
          </button>
        )}
      </div>
    </li>
  );
};

export default RideDetailsCard;
