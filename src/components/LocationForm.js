import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const LocationForm = ({ rideDetails, onSubmit }) => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [genderPreference, setGenderPreference] = useState('any');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [passengerCount, setPassengerCount] = useState(''); // New state for passenger count
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationType, setLocationType] = useState('');
  const [mapLocation, setMapLocation] = useState(null);

  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 13.0827, lng: 80.2707 }, // Default to Chennai
        zoom: 10,
      });

      const marker = new window.google.maps.Marker({
        position: map.getCenter(),
        map: map,
      });

      window.google.maps.event.addListener(map, "click", (event) => {
        marker.setPosition(event.latLng);
        setMapLocation({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
      });
    }
  }, [isModalOpen]);

  const handleSelect = (setter) => (e) => setter(e.target.value);

  const handleSubmit = () => {
    console.log('Submitting form...');
    console.log('Departure:', departure);
    console.log('Destination:', destination);
    console.log('Vehicle:', vehicle);
    console.log('Gender Preference:', genderPreference);
    console.log('Date:', date);
    console.log('Start Time:', startTime);
    console.log('End Time:', endTime);
    console.log('Passenger Count:', passengerCount); // Log passenger count

    onSubmit({
      departure,
      destination,
      vehicle,
      genderPreference,
      date,
      startTime,
      endTime,
      passengerCount, // Include passenger count in submission
    });
  };

  const openMapModal = (type) => {
    setLocationType(type);
    setIsModalOpen(true);
  };

  const handleLocationSelect = () => {
    if (mapLocation) {
      if (locationType === 'departure') {
        setDeparture(mapLocation);
      } else if (locationType === 'destination') {
        setDestination(mapLocation);
      }
      setIsModalOpen(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-green-50 bg-opacity-30 px-4"
      style={{
        backgroundImage: 'url(https://cdn.prod.website-files.com/6768f29a6d5da42209173f20/6768f29b6d5da422091774b0_Rectangle%20(20).svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-3 rounded-lg shadow-lg w-[375px] h-[667px] overflow-auto">
        <h2 className="text-xs font-semibold text-green-600 text-center mb-3">Your Ride, Your Way</h2>

        {/* Departure and Destination Selects */}
        <div className="space-y-2 mb-3">
          <select
            className="w-full p-2 bg-green-100 rounded-lg text-xs"
            value={departure}
            onChange={handleSelect(setDeparture)}
          >
            <option value="">Select Departure</option>
            <option value="NIT Trichy">NIT Trichy</option>
            <option value="Chathiram Bus Stand">Chathiram Bus Stand</option>
            <option value="Central Railway Station">Central Railway Station</option>
            <option value="Trichy Airport">Trichy Airport</option>
            <option value="Custom" onClick={() => openMapModal('departure')}>
              Custom
            </option>
          </select>

          <select
            className="w-full p-2 bg-green-100 rounded-lg text-xs"
            value={destination}
            onChange={handleSelect(setDestination)}
          >
            <option value="">Select Destination</option>
            <option value="NIT Trichy">NIT Trichy</option>
            <option value="Chathiram Bus Stand">Chathiram Bus Stand</option>
            <option value="Central Railway Station">Central Railway Station</option>
            <option value="Trichy Airport">Trichy Airport</option>
            <option value="Custom" onClick={() => openMapModal('destination')}>
              Custom
            </option>
          </select>
        </div>

        {/* Number of Passengers */}
        <div className="mb-3">
          <h3 className="text-xs font-semibold text-green-600 mb-1">Number of Passengers</h3>
          <input
            type="number"
            value={passengerCount}
            onChange={handleSelect(setPassengerCount)}
            className="w-full p-2 bg-green-100 rounded-lg text-xs"
            placeholder="Enter number of passengers"
          />
        </div>

        {/* Ride Date */}
        <div className="mb-3">
          <h3 className="text-xs font-semibold text-green-600 mb-1">Ride Date</h3>
          <input
            type="date"
            value={date}
            onChange={handleSelect(setDate)}
            className="w-full p-2 bg-green-100 rounded-lg text-xs"
          />
        </div>

        {/* Ride Start Time Range */}
        <div className="mb-3">
          <h3 className="text-xs font-semibold text-green-600 mb-1">Ride Start Time Range</h3>
          <input
            type="time"
            value={startTime}
            onChange={handleSelect(setStartTime)}
            className="w-full p-2 bg-green-100 rounded-lg text-xs"
          />
        </div>

        {/* Ride End Time Range */}
        <div className="mb-3">
          <h3 className="text-xs font-semibold text-green-600 mb-1">Ride End Time Range</h3>
          <input
            type="time"
            value={endTime}
            onChange={handleSelect(setEndTime)}
            className="w-full p-2 bg-green-100 rounded-lg text-xs"
          />
        </div>

        {/* Vehicle Selection */}
        <div className="flex space-x-2 mb-3">
          <button
            onClick={() => setVehicle('car')}
            className={`w-1/3 p-2 ${vehicle === 'car' ? 'bg-green-600' : 'bg-gray-300'} rounded-lg text-xs`}
          >
            Car
          </button>
          <button
            onClick={() => setVehicle('auto')}
            className={`w-1/3 p-2 ${vehicle === 'auto' ? 'bg-green-600' : 'bg-gray-300'} rounded-lg text-xs`}
          >
            Auto
          </button>
          <button
            onClick={() => setVehicle('bike')}
            className={`w-1/3 p-2 ${vehicle === 'bike' ? 'bg-green-600' : 'bg-gray-300'} rounded-lg text-xs`}
          >
            Bike
          </button>
        </div>

        {/* Gender Preference */}
        <div className="mb-3">
          <select
            value={genderPreference}
            onChange={handleSelect(setGenderPreference)}
            className="w-full p-2 bg-green-100 rounded-lg text-xs"
          >
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600"
        >
          Confirm
        </button>
      </div>

      {/* Google Maps Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <div id="map" style={{ width: '100%', height: '250px' }}></div>
        <button onClick={handleLocationSelect} className="mt-3 bg-green-500 text-white p-2 rounded-lg">
          Select Location
        </button>
      </Modal>
    </div>
  );
};

export default LocationForm;
