// src/components/RideDetailsCard.js
import React from 'react';

const RideDetailsCard = ({ rideDetails }: {
  rideDetails: any
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold text-green-600">Ride Details</h2>
      <div className="mt-4">
        <p><strong>Date:</strong> {rideDetails?.date}</p>
        <p><strong>Start Time:</strong> {rideDetails?.startTime}</p>
        <p><strong>End Time:</strong> {rideDetails?.endTime}</p>
        <p><strong>Departure:</strong> {rideDetails?.departure}</p>
        <p><strong>Destination:</strong> {rideDetails?.destination}</p>
      </div>
    </div>
  );
};

export default RideDetailsCard;
