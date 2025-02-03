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

  const [tempStartTime, setTempStartTime] = useState<string>(''); // for temp start time input
  const [tempEndTime, setTempEndTime] = useState<string>(''); // for temp end time input

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
      // Check if end time is after start time
      const start = new Date(`2025-02-02T${tempStartTime}`);
      const end = new Date(`2025-02-02T${tempEndTime}`);

      if (end <= start) {
        alert('End time should be after start time.');
        return;
      }

      setStartTime(tempStartTime);
      setEndTime(tempEndTime);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#05E9921F] px-4">
      {/* Search Bar */}
      <div className="relative w-full max-w-[303px] h-[35px] mt-5 mb-5">
        <input
          type="text"
          placeholder="Search"
          className="w-full h-[35px] bg-white border border-black border-solid rounded-full pl-[31px] pr-[22px]"
        />
      </div>

      {/* Card Container */}
      <div id="map"></div>

      <div className="bg-white p-3 rounded-lg shadow-lg w-full max-w-[335px] h-[550px] overflow-auto">
        {/* Form Fields */}
        <div className="mt-5">
          {/* Point of departure */}
          <input
            type="text"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="w-full h-[45px] bg-[#E1FCF2] border rounded-lg pl-4 text-sm"
            placeholder="Point of departure"
          />

          {/* Travel destination */}
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full h-[45px] bg-[#05E9921F] border rounded-lg mt-4 pl-4 text-sm"
            placeholder="Travel destination"
          />

          {/* Travel date and time */}
          <div className="flex justify-between gap-2 mt-4">
            <input
              type="date"
              className="w-[160px] h-[45px] bg-[#91908E] border rounded-lg pl-4 text-sm"
            />
            <div
              onClick={() => setIsModalOpen(true)}
              className="w-[140px] h-[45px] bg-[#91908E] border rounded-lg pl-4 flex items-center justify-center cursor-pointer text-sm"
            >
              {startTime && endTime ? (
                <div>
                  <div className="text-xs">{startTime}</div>
                  <div className="text-xs">{endTime}</div>
                </div>
              ) : (
                'Select Time Range'
              )}
            </div>
          </div>

          {/* Share count */}
          <div className="mt-4 w-full h-[45px] bg-[#05E9921F] border rounded-lg flex justify-center items-center">
            <input
              type="number"
              value={passengerCount}
              onChange={(e) => setPassengerCount(e.target.value)}
              className="w-[120px] h-[30px] text-center bg-transparent border-none text-sm"
              placeholder="Share count"
            />
          </div>

          {/* Vehicle Selection */}
          <div className="flex justify-between mt-4">
            <div
              onClick={() => setVehicle('car')}
              className={`w-[70px] h-[70px] border-2 flex justify-center items-center ${vehicle === 'car' ? 'bg-[#008955] text-white' : 'border-black'} rounded-lg`}
            >
              <span className="text-sm">Car</span>
            </div>
            <div
              onClick={() => setVehicle('auto')}
              className={`w-[70px] h-[70px] border-2 flex justify-center items-center ${vehicle === 'auto' ? 'bg-[#008955] text-white' : 'border-black'} rounded-lg`}
            >
              <span className="text-sm">Auto</span>
            </div>
            <div
              onClick={() => setVehicle('taxi')}
              className={`w-[70px] h-[75px] border-2 flex justify-center items-center ${vehicle === 'taxi' ? 'bg-[#008955] text-white' : 'border-black'} rounded-lg`}
            >
              <span className="text-sm">Taxi</span>
            </div>
          </div>

          {/* Gender Preference */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Gender Preference</h3>
            <select
              value={genderPreference}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="w-full h-[45px] mt-2 bg-white border rounded-lg text-sm"
            >
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full max-w-[255px] h-[45px] bg-[#008955] text-white rounded-lg mt-5 mx-auto flex justify-center items-center"
          >
            <span className="text-sm">Post your ride!</span>
          </button>
        </div>
      </div>

      {/* Time Range Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-xl mb-4">Select Time Range</h2>

          {/* Start Time */}
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              value={tempStartTime ? tempStartTime.split(':')[0] : ''}
              onChange={(e) => setTempStartTime(`${e.target.value}:${tempStartTime?.split(':')[1] || '00'}`)}
              className="w-[50px] p-2 border rounded-lg text-sm"
              placeholder="HH"
            />
            <input
              type="number"
              value={tempStartTime ? tempStartTime.split(':')[1] : ''}
              onChange={(e) => setTempStartTime(`${tempStartTime?.split(':')[0] || '00'}:${e.target.value}`)}
              className="w-[50px] p-2 border rounded-lg text-sm"
              placeholder="MM"
            />
            <select
              value={tempStartTime ? tempStartTime.split(' ')[1] : 'AM'}
              onChange={(e) => setTempStartTime(`${tempStartTime?.split(':')[0] || '00'}:${tempStartTime?.split(':')[1] || '00'} ${e.target.value}`)}
              className="p-2 border rounded-lg text-sm"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          {/* End Time */}
          <div className="flex gap-2 mb-4">
            <input
              type="number"
              value={tempEndTime ? tempEndTime.split(':')[0] : ''}
              onChange={(e) => setTempEndTime(`${e.target.value}:${tempEndTime?.split(':')[1] || '00'}`)}
              className="w-[50px] p-2 border rounded-lg text-sm"
              placeholder="HH"
            />
            <input
              type="number"
              value={tempEndTime ? tempEndTime.split(':')[1] : ''}
              onChange={(e) => setTempEndTime(`${tempEndTime?.split(':')[0] || '00'}:${e.target.value}`)}
              className="w-[50px] p-2 border rounded-lg text-sm"
              placeholder="MM"
            />
            <select
              value={tempEndTime ? tempEndTime.split(' ')[1] : 'AM'}
              onChange={(e) => setTempEndTime(`${tempEndTime?.split(':')[0] || '00'}:${tempEndTime?.split(':')[1] || '00'} ${e.target.value}`)}
              className="p-2 border rounded-lg text-sm"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <button
            onClick={handleTimeRangeSubmit}
            className="bg-[#008955] text-white p-2 rounded-lg text-sm"
          >
            Continue
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LocationForm;
