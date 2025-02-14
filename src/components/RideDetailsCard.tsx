import axios from "axios";
import { toast } from "react-toastify";

const RideDetailsCard = ({ ride, refreshRide }: {
  ride: Ride,
  refreshRide: () => void
}) => {
  const st = new Date(ride.earliestDeparture)
  const ed = new Date(ride.latestDeparture)

  const handleSend = () => {
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
  }

  return (
    // TODO: why everyhing is absolute? use flex instead
    <li key={ride.id} className="border-[2px] border-[#08B783] bg-[#C1EDE08C] h-[170px] w-[auto] rounded-[10px] relative">
      <div className="dest text-[5vw] font-Quicksand font-[700] text-[#5A5A5A] absolute top-[6%] left-[3%] h-[23px] w-[max]">
        {ride.stops[0].name} to {ride.stops[1].name}
      </div>
      <img src={`${ride.vehicleType.toLowerCase()}.svg`} className="h-[75px] absolute right-[5%]"></img>
      <div className="car absolute top-[75px] right-[40px] font-Quicksand font-[600]">{ride.vehicleType.toLowerCase()}</div>
      <div className="text absolute top-[20%] left-[10px] font-Quicksand text-[#B8B8B8] font-[700] text-[85%] mt-[3px]">
        {st.toLocaleString('default', { month: 'short', day: '2-digit', year: 'numeric' })} | {st.getHours()}:{st.getMinutes().toString().padStart(2, '0')} - {ed.getHours()}:{ed.getMinutes().toString().padStart(2, '0')}
        {' | '}
        {ride.participantsCount || ride.peopleCount} People sharing
      </div>
      <img src="profile.svg" className=" img_car absolute top-[37%] left-[3%]"></img>
      <div className="posted absolute top-[56px] left-[30px] text-[#414141] text-[16px] font-[600]">Posted by {ride.owner.name}</div>
      <div className="sendreq absolute bottom-[7%] left-[10px] border-2 h-[54px] w-[94%] border-[#008955] rounded-[10px]">
        {ride.myInvite ? (
          <button disabled>
            {ride.myInvite.status}
          </button>
        ) : (
          <button onClick={handleSend} className="absolute top-[25%] left-[37%] text-[#008955] font-Quicksand font-[600]">
            Send Request
          </button>
        )}
      </div>
    </li>
  );
};

export default RideDetailsCard;
