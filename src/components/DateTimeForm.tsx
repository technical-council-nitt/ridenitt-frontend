import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface LocationFormProps {
  rideDetails: {
    rideDate: string;
    startTime: string;
    endTime: string;
  };
  onSubmit: (data: {
    departure: string;
    destination: string;
    vehicle: string;
    genderPreference: string;
    date: string;
    startTime: string;
    endTime: string;
    passengerCount: string;
  }) => void;
}

interface MapLocation {
  lat: number;
  lng: number;
}

const LocationForm: React.FC<LocationFormProps> = ({ rideDetails, onSubmit }) => {
  const [departure, setDeparture] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [vehicle, setVehicle] = useState<string>('');
  const [genderPreference, setGenderPreference] = useState<string>('any');
  const [date] = useState<string>(rideDetails.rideDate);
  const [startTime, setStartTime] = useState<string>(rideDetails.startTime);
  const [endTime, setEndTime] = useState<string>(rideDetails.endTime);
  const [passengerCount, setPassengerCount] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [locationType, setLocationType] = useState<string>('');
  const [mapLocation, setMapLocation] = useState<MapLocation | null>(null);

  const [tempStartTime, setTempStartTime] = useState<string>('');
  const [tempEndTime, setTempEndTime] = useState<string>('');

  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 13.0827, lng: 80.2707 },
        zoom: 10,
      });
    }
  }, []);

  const handleLocationSelect = () => {
    if (mapLocation) {
      if (locationType === 'departure') {
        setDeparture(JSON.stringify(mapLocation));
      } else if (locationType === 'destination') {
        setDestination(JSON.stringify(mapLocation));
      }
      setIsModalOpen(false);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      departure,
      destination,
      vehicle,
      genderPreference,
      date,
      startTime,
      endTime,
      passengerCount,
    });
  };

  const handleTimeRangeSubmit = () => {
    if (tempStartTime && tempEndTime) {
      const startParts = tempStartTime.split(':');
      const endParts = tempEndTime.split(':');
      
      let startHour = parseInt(startParts[0]);
      let endHour = parseInt(endParts[0]);

      // AM/PM handling
      const startAMPM = startParts[1].includes('AM') ? 'AM' : 'PM';
      const endAMPM = endParts[1].includes('AM') ? 'AM' : 'PM';
      
      // Convert start time and end time to 24-hour format
      if (startAMPM === 'PM' && startHour !== 12) startHour += 12;
      if (startAMPM === 'AM' && startHour === 12) startHour = 0;
      if (endAMPM === 'PM' && endHour !== 12) endHour += 12;
      if (endAMPM === 'AM' && endHour === 12) endHour = 0;
      
      const startDate = new Date(`2025-02-02T${startHour}:${startParts[1].split(' ')[0]}:00`);
      const endDate = new Date(`2025-02-02T${endHour}:${endParts[1].split(' ')[0]}:00`);
      
      if (endDate <= startDate) {
        alert("End time should be after start time.");
        return;
      }

      setStartTime(tempStartTime);
      setEndTime(tempEndTime);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 bg-opacity-30 px-4">
      <div id="map"></div>
      
      <div className="bg-white p-3 rounded-lg shadow-lg w-[375px] h-[750px] overflow-auto">
        {/* Search Bar */}
        <div className="relative w-[303px] h-[35px] mt-[66px] ml-[18px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-[35px] bg-white border border-black rounded-l-full pl-[31px] pr-[22px] opacity-0"
          />
          <span className="absolute top-[72.17px] left-[284.17px] opacity-0 bg-[#B3B3B3] w-[22.63px] h-[20.7px]" />
        </div>

        {/* Form Fields */}
        <div className="mt-10">
          {/* Point of departure */}
          <input
            type="text"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="w-[335px] h-[50px] bg-[#E1FCF2] border rounded-lg pl-4"
            placeholder="Point of departure"
          />

          {/* Travel destination */}
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-[335px] h-[50px] bg-[#05E9921F] border rounded-lg mt-4 pl-4"
            placeholder="Travel destination"
          />

          {/* Travel date and time */}
          <div className="flex justify-between gap-4 mt-4">
            <input
              type="date"
              className="w-[169px] h-[50px] bg-[#91908E] border rounded-lg pl-4"
            />
            <div
              onClick={() => setIsModalOpen(true)}
              className="w-[141px] h-[50px] bg-[#91908E] border rounded-lg pl-4 flex items-center justify-center cursor-pointer"
            >
              {startTime ? startTime : 'Select Time Range'}
            </div>
          </div>

          {/* Share count */}
          <div className="mt-4 w-[335px] h-[49px] bg-[#05E9921F] border rounded-lg flex justify-center items-center">
            <input
              type="number"
              value={passengerCount}
              onChange={(e) => setPassengerCount(e.target.value)}
              className="w-[142.73px] h-[23.52px] text-center bg-transparent border-none"
              placeholder="Share count"
            />
          </div>

          {/* Vehicle Selection */}
          <div className="flex justify-between mt-4">
            <div
              onClick={() => setVehicle('car')}
              className={`w-[80px] h-[80px] border-2 flex justify-center items-center ${vehicle === 'car' ? 'border-green-500' : 'border-black'}`}
            >
              <span>Car</span>
            </div>
            <div
              onClick={() => setVehicle('auto')}
              className={`w-[80px] h-[80px] border-2 flex justify-center items-center ${vehicle === 'auto' ? 'border-green-500' : 'border-black'}`}
            >
              <span>Auto</span>
            </div>
            <div
              onClick={() => setVehicle('taxi')}
              className={`w-[80px] h-[87px] border-2 flex justify-center items-center ${vehicle === 'taxi' ? 'border-green-500' : 'border-black'}`}
            >
              <span>Taxi</span>
            </div>
          </div>

          {/* Gender Preference */}
          <select
            value={genderPreference}
            onChange={(e) => setGenderPreference(e.target.value)}
            className="w-[335px] h-[50px] mt-4 bg-white border rounded-lg"
          >
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-[255px] h-[50px] bg-green-500 text-white rounded-lg mt-6 mx-auto"
          >
            Post your ride!
          </button>
        </div>
      </div>

      {/* Time Range Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl mb-4">Select Time Range</h2>

          {/* Start Time */}
          <div className="flex gap-4 mb-4">
            <input
              type="number"
              value={tempStartTime ? tempStartTime.split(':')[0] : ''}
              onChange={(e) => setTempStartTime(`${e.target.value}:${tempStartTime?.split(':')[1] || '00'}`)}
              className="w-[60px] p-2 border rounded-lg"
              placeholder="HH"
            />
            <input
              type="number"
              value={tempStartTime ? tempStartTime.split(':')[1] : ''}
              onChange={(e) => setTempStartTime(`${tempStartTime?.split(':')[0] || '00'}:${e.target.value}`)}
              className="w-[60px] p-2 border rounded-lg"
              placeholder="MM"
            />
            <select
              value={tempStartTime ? tempStartTime.split(' ')[1] : 'AM'}
              onChange={(e) => setTempStartTime(`${tempStartTime?.split(':')[0] || '00'}:${tempStartTime?.split(':')[1] || '00'} ${e.target.value}`)}
              className="p-2 border rounded-lg"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          {/* End Time */}
          <div className="flex gap-4 mb-4">
            <input
              type="number"
              value={tempEndTime ? tempEndTime.split(':')[0] : ''}
              onChange={(e) => setTempEndTime(`${e.target.value}:${tempEndTime?.split(':')[1] || '00'}`)}
              className="w-[60px] p-2 border rounded-lg"
              placeholder="HH"
            />
            <input
              type="number"
              value={tempEndTime ? tempEndTime.split(':')[1] : ''}
              onChange={(e) => setTempEndTime(`${tempEndTime?.split(':')[0] || '00'}:${e.target.value}`)}
              className="w-[60px] p-2 border rounded-lg"
              placeholder="MM"
            />
            <select
              value={tempEndTime ? tempEndTime.split(' ')[1] : 'AM'}
              onChange={(e) => setTempEndTime(`${tempEndTime?.split(':')[0] || '00'}:${tempEndTime?.split(':')[1] || '00'} ${e.target.value}`)}
              className="p-2 border rounded-lg"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <button
            onClick={handleTimeRangeSubmit}
            className="bg-green-500 text-white p-2 rounded-lg"
          >
            Continue
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LocationForm;
