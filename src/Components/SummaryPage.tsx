const SummaryPage = ({ rideDetails }: {
  rideDetails: any
}) => {
  if (!rideDetails) {
    return <div>No ride details available</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 bg-opacity-30 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold text-green-600 text-center mb-6">Ride Summary</h2>
        
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-green-600">Ride Date:</h3>
          <p>{rideDetails.rideDate}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-semibold text-green-600">Start Time:</h3>
          <p>{rideDetails.startTime}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-semibold text-green-600">End Time:</h3>
          <p>{rideDetails.endTime}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-semibold text-green-600">Departure Location:</h3>
          <p>{rideDetails.departure}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-semibold text-green-600">Destination Location:</h3>
          <p>{rideDetails.destination}</p>
        </div>

        <div className="text-center">
          <button
            onClick={() => alert('Ride details confirmed!')}
            className="py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Confirm Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
