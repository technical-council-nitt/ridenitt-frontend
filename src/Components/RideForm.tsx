import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const generateTimeOptions = () => {
  const timeOptions: string[] = [];
  const hours = 12; // 12-hour format
  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]; // 5 minute intervals

  for (let h = 0; h < hours; h++) {
    const period = h < 12 ? 'AM' : 'PM'; // Determine AM/PM
    const hour = h === 0 ? 12 : h <= 12 ? h : h - 12; // 12-hour format logic
    minutes.forEach(min => {
      const timeString = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')} ${period}`;
      timeOptions.push(timeString);
    });
  }

  return timeOptions;
};

const RideForm: React.FC = () => {
  const [rideDate, setRideDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const navigate = useNavigate();
  
  const today = new Date().toISOString().split('T')[0]; // Get today's date

  // Handle Date Change
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRideDate(e.target.value);
  };

  // Handle Form Submission
  const handleConfirm = () => {
    if (rideDate && startTime && endTime) {
      const startHour = parseInt(startTime.split(":")[0]);
      const endHour = parseInt(endTime.split(":")[0]);
      
      if (startHour >= endHour) {
        alert("End time must be after start time.");
        return;
      }
      navigate('/locationform');
    } else {
      alert('Please fill in all fields.');
    }
  };

  // Generate time options for dropdown
  const timeOptions = generateTimeOptions();

  return (
    <div className="relative w-full max-w-[375px] h-[667px] px-[18px] mx-auto">
      {/* Ride Date */}
      <div className="mt-[40px]">
        <label className="block text-[#91908E] text-[14px] font-quicksand font-semibold">
          Ride Date
        </label>
        <input
          type="date"
          className="w-full h-[40px] bg-[#E1FCF2] border border-black rounded-[20px] pl-[15px] outline-none mt-2"
          value={rideDate}
          onChange={handleDateChange}
          min={today}
        />
      </div>

      {/* Ride Start Time Range */}
      <div className="mt-[40px]">
        <label className="block text-[#91908E] text-[14px] font-quicksand font-semibold">
          Ride Start Time Range
        </label>
        <select
          className="w-full h-[40px] bg-[#E1FCF2] border border-black rounded-[20px] pl-[15px] outline-none mt-2"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        >
          <option value="">Select Start Time</option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Ride End Time Range */}
      <div className="mt-[40px]">
        <label className="block text-[#91908E] text-[14px] font-quicksand font-semibold">
          Ride End Time Range
        </label>
        <select
          className="w-full h-[40px] bg-[#E1FCF2] border border-black rounded-[20px] pl-[15px] outline-none mt-2"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        >
          <option value="">Select End Time</option>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      {/* Confirm Button */}
      <button
        className="w-full h-[43px] mt-[40px] bg-[#008955] text-white rounded-[20px_0_0_0] text-[16px] font-quicksand font-bold shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
        onClick={handleConfirm}
      >
        Confirm Ride
      </button>
    </div>
  );
};

export default RideForm;
 