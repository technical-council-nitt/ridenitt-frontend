import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { displayTimeRange } from "../Utils/datetime";

const RideDetailsCard = ({
  ride,
  refreshRide,
}: {
  ride: Ride;
  refreshRide: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (!ride || !ride.owner || !ride.stops || ride.stops.length < 2) {
    return (
      <li className="p-4 border-2 border-gray-300 bg-gray-100 rounded-xl text-center text-neutral-700 font-semibold">
        No rides available.
      </li>
    );
  }

  const st = new Date(ride.earliestDeparture);
  const ed = new Date(ride.latestDeparture);

  const handleSend = () => {
    setLoading(true);
    axios
      .post("/api/invites", { rideId: ride.id })
      .then(() => {
        toast.success("Request sent successfully!");
        refreshRide();
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  return (
    <li className="p-4 border-2 border-[#08B783] bg-[#C1EDE08C] rounded-xl">
      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-10 grid place-items-center bg-black/25"
          onClick={() => setShowModal(false)}
        >
          <div
            className="p-6 bg-white rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-neutral-800 font-medium">
              Please leave your current ride to send a request.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 ml-auto block bg-[#008955] text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Ride Info */}
      <h3 className="text-lg font-bold font-Quicksand">
        {ride.stops[0].name} → {ride.stops[1].name}
      </h3>

      <div className="flex items-start gap-4 mt-2">
        <img
          src={`/Images/${ride.vehicleType.toUpperCase()}.png`}
          alt={ride.vehicleType}
          className="w-16 h-16 object-contain"
        />

        <div className="min-w-44 text-neutral-700 font-Quicksand text-sm">
          <p className="font-semibold">
            {displayTimeRange(st, ed, new Date())}
          </p>
          <p className="capitalize font-medium mt-1">
            {ride.vehicleType.toLowerCase()} | {ride.participants.length}{" "}
            people sharing
          </p>

          <div className="flex items-center gap-2 mt-2">
            <img src="profile.svg" alt="profile" className="w-6 h-6" />
            <span className="font-semibold">Posted by {ride.owner.name}</span>
          </div>
        </div>
      </div>

      {/* Invite/Status Button */}
      <div className="mt-4">
        {ride.myInvite ? (
          <button
            disabled
            className="w-full p-2 border-2 border-[#008955] text-[#008955] font-semibold rounded-lg"
          >
            {ride.myInvite.status}
          </button>
        ) : (
          <button
            disabled={loading}
            onClick={handleSend}
            className="w-full p-2 border-2 border-[#008955] text-[#008955] font-semibold rounded-lg disabled:opacity-50"
          >
            Send Request
          </button>
        )}
      </div>
    </li>
  );
};

export default RideDetailsCard;
