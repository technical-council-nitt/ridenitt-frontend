import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCurrentRide } from '../Hooks/useCurrentRide';

// Declare the Google Maps global object for TypeScript to recognize it
declare global {
  interface Window {
    google: typeof google;
  }
}

Modal.setAppElement('#root');

// Type for the form data
interface LocationFormData {
  departure: string;
  destination: string;
  vehicle: string;
  genderPreference: string;
  date: string;
  startTime: string;
  endTime: string;
  passengerCount: string;
}

const LocationForm: React.FC = () => {
  // State hooks
  const navigate = useNavigate()
  const { refreshCurrentRide } = useCurrentRide()
  const [departure, setDeparture] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [vehicle, setVehicle] = useState<string>('');
  const [genderPreference, setGenderPreference] = useState<string>('any');
  const [date, setDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [passengerCount, setPassengerCount] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [locationType, setLocationType] = useState<string>('');
  const [mapLocation, setMapLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize Google Maps when modal is open
  useEffect(() => {
    if (window.google && isModalOpen) {
      const map = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 13.0827, lng: 80.2707 }, // Default to Chennai
        zoom: 10,
      });

      const marker = new window.google.maps.Marker({
        position: map.getCenter(),
        map: map,
      });

      window.google.maps.event.addListener(map, 'click', (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          marker.setPosition(event.latLng);
          setMapLocation({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          });
        }
      });
    }
  }, [isModalOpen]);

  const handleSelect = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => setter(e.target.value);

  const handleSubmit = () => {
    setLoading(true);

    //TODO: Add validation

    axios.post("/api/rides", {
      stops: [departure, destination].map((stop) => ({
        name: stop,
        lat: 10.068,
        lon: 76.356, //TODO
      })),
      peopleCount: Number(passengerCount),
      capacity: 4, //TODO
      vehicleType: vehicle,
      earliestDeparture: new Date(`${date}T${startTime}:00`).getTime(),
      latestDeparture: new Date(`${date}T${endTime}:00`).getTime(),
    })
    .then(() => {
      toast.success('Ride created successfully!');
      refreshCurrentRide()
      navigate('/')
    })
    .catch((error) => {
      console.error(error);
      toast.error(error.response.data?.error ?? 'Failed to create ride. Please try again later.');
      setLoading(false);
    }).finally(() => {
      setLoading(false);
    })
  };

  const openMapModal = (type: string) => {
    setLocationType(type);
    setIsModalOpen(true);
  };

  const handleLocationSelect = () => {
    if (mapLocation) {
      if (locationType === 'departure') {
        setDeparture(`${mapLocation.lat}, ${mapLocation.lng}`);
      } else if (locationType === 'destination') {
        setDestination(`${mapLocation.lat}, ${mapLocation.lng}`);
      }
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 bg-opacity-30 px-4">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[375px] h-[667px] overflow-auto">
        <h2 className="text-xl font-semibold text-green-600 text-center mb-3">Your Ride, Your Way</h2>

        {/* Departure and Destination Selects */}
        <div className="space-y-2 mb-3">
          <select
            className="w-full p-2 bg-green-100 rounded-lg"
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
            className="w-full p-2 bg-green-100 rounded-lg"
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
          <h3 className="font-semibold text-green-600 mb-1">Number of Passengers</h3>
          <input
            type="number"
            value={passengerCount}
            onChange={handleSelect(setPassengerCount)}
            className="w-full p-2 bg-green-100 rounded-lg"
            placeholder="Enter number of passengers"
          />
        </div>

        {/* Ride Date */}
        <div className="mb-3">
          <h3 className="font-semibold text-green-600 mb-1">Ride Date</h3>
          <input
            type="date"
            value={date}
            onChange={handleSelect(setDate)}
            className="w-full p-2 bg-green-100 rounded-lg"
          />
        </div>

        {/* Ride Start Time Range */}
        <div className="mb-3">
          <h3 className="font-semibold text-green-600 mb-1">Ride Start Time Range</h3>
          <input
            type="time"
            value={startTime}
            onChange={handleSelect(setStartTime)}
            className="w-full p-2 bg-green-100 rounded-lg"
          />
        </div>

        {/* Ride End Time Range */}
        <div className="mb-3">
          <h3 className="font-semibold text-green-600 mb-1">Ride End Time Range</h3>
          <input
            type="time"
            value={endTime}
            onChange={handleSelect(setEndTime)}
            className="w-full p-2 bg-green-100 rounded-lg"
          />
        </div>

        {/* Vehicle Selection */}
        <div className="flex space-x-2 mb-3">
          <button
            onClick={() => setVehicle('car')}
            className={`w-1/3 p-2 ${vehicle === 'car' ? 'bg-green-600' : 'bg-gray-300'} rounded-lg`}
          >
            Car
          </button>
          <button
            onClick={() => setVehicle('auto')}
            className={`w-1/3 p-2 ${vehicle === 'auto' ? 'bg-green-600' : 'bg-gray-300'} rounded-lg`}
          >
            Auto
          </button>
          <button
            onClick={() => setVehicle('bike')}
            className={`w-1/3 p-2 ${vehicle === 'bike' ? 'bg-green-600' : 'bg-gray-300'} rounded-lg`}
          >
            Bike
          </button>
        </div>

        {/* Gender Preference */}
        <div className="mb-3">
          <label className="font-semibold text-green-600 mb-1">
            Preferred Gender
          </label>
          <select
            value={genderPreference}
            onChange={handleSelect(setGenderPreference)}
            className="w-full p-2 bg-green-100 rounded-lg"
          >
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Confirm Button */}
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full py-2 disabled:opacity-50 bg-green-500 text-white rounded-lg hover:bg-green-600"
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
