import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const DateTimeForm = ({ onConfirm }) => {
  const [rideDate, setRideDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const navigate = useNavigate();  // useNavigate hook to navigate programmatically

  const handleDateChange = (e) => setRideDate(e.target.value);

  const handleConfirm = () => {
    // Only proceed if all fields are filled
    if (rideDate && startTime && endTime) {
      onConfirm({ rideDate, startTime, endTime });

      // Navigate to the LocationForm route after confirmation
      navigate('/locationform');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 bg-opacity-30 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs max-h-[80vh]">
        <h2 className="text-lg font-semibold text-green-600 text-center mb-6">Select Ride Date & Time</h2>

        {/* Ride Date */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-green-600 mb-2">Ride Date</h3>
          <input
            type="date"
            value={rideDate}
            onChange={handleDateChange}
            className="w-full p-3 bg-green-100 rounded-lg text-sm"
            min={new Date().toISOString().split('T')[0]} // Disallow past dates
          />
        </div>

        {/* Ride Start Time Range */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-green-600 mb-2">Ride Start Time Range</h3>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-3 bg-green-100 rounded-lg text-sm"
          />
        </div>

        {/* Ride End Time Range */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-green-600 mb-2">Ride End Time Range</h3>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-3 bg-green-100 rounded-lg text-sm"
          />
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full py-3 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DateTimeForm;
