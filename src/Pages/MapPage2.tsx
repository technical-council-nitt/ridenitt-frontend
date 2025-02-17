import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapPage2: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // States for pickup & drop locations
  const [pickupLocation, setPickupLocation] = useState("Select Pickup Location");
  const [dropLocation, setDropLocation] = useState("Select Drop Location");

  // Dropdown visibility states
  const [isPickupDropdownOpen, setIsPickupDropdownOpen] = useState(false);
  const [isDropDropdownOpen, setIsDropDropdownOpen] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  return (
    <div className="relative h-screen w-full">
      {/* Map Section */}
      {location ? (
        <MapContainer
          center={location}
          zoom={15}
          className="h-full w-full z-0"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={location} icon={customIcon} />
          <Circle
            center={location}
            radius={200}
            pathOptions={{ color: "green", fillOpacity: 0.3 }}
          />
        </MapContainer>
      ) : (
        <p className="text-center mt-20">Loading Map...</p>
      )}

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-white border-t-2 border-[#08B783] rounded-t-2xl shadow-lg pb-4">
        
        {/* Select Pickup Location */}
        <div className="relative z-50 mb-2"> 
          <button
            onClick={() => {
              setIsPickupDropdownOpen(!isPickupDropdownOpen);
              setIsDropDropdownOpen(false); // Close drop dropdown
            }}
            className={`w-full flex justify-between items-center bg-[#D8F3E7] text-gray-700 border-2 border-[#8AD4B5] px-4 py-2 focus:outline-none transition-all ${
              isPickupDropdownOpen ? "rounded-t-2xl" : "rounded-2xl"
            }`}
          >
            {pickupLocation}
            <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isPickupDropdownOpen && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-50">
              <ul className="text-gray-700">
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setPickupLocation("Current location");
                      setIsPickupDropdownOpen(false);
                    }}
                  >
                    Current location
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setPickupLocation("Aquamarine-B");
                      setIsPickupDropdownOpen(false);
                    }}
                  >
                    Aquamarine-B
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Select Drop Location */}
        <div className="relative z-40 mb-2">
          <button
            onClick={() => {
              setIsDropDropdownOpen(!isDropDropdownOpen);
              setIsPickupDropdownOpen(false); // Close pickup dropdown
            }}
            className={`w-full flex justify-between items-center bg-[#D8F3E7] text-gray-700 border-2 border-[#8AD4B5] px-4 py-2 focus:outline-none transition-all ${
              isDropDropdownOpen ? "rounded-t-2xl" : "rounded-2xl"
            }`}
          >
            {dropLocation}
            <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropDropdownOpen && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg z-50">
              <ul className="text-gray-700">
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setDropLocation("Current location");
                      setIsDropDropdownOpen(false);
                    }}
                  >
                    Current location
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setDropLocation("Aquamarine-B");
                      setIsDropDropdownOpen(false);
                    }}
                  >
                    Aquamarine-B
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Confirm Button */}
        <button className="w-full py-3 bg-[#008955] text-white font-semibold rounded-2xl  mb-12">
          Confirm Location
        </button>
        <div className="mb-4"></div>
      </div>
    </div>
  );
};

export default MapPage2;
