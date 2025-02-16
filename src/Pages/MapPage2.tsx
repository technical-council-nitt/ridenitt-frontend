import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import pickupIcon from "../Images/pickup.png";
import dropIcon from "../Images/drop.png";

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapPage2: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  
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
      <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t-2 border-[#08B783] rounded-t-2xl overflow-hidden">
        {/* Select Pickup Location */}
        <div className="relative flex items-center border-2 border-[#8AD4B5] rounded-2xl bg-[#E2F5ED] p-3">
          <img src={pickupIcon} alt="Pickup Icon" className="w-6 h-6 mr-3" />
          <select 
            className="w-full bg-transparent outline-none"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
          >
            <option value="">Current location</option>
            <option value="Aquamarine-B">Aquamarine-B</option>
          </select>
        </div>

        {/* Select Drop Location */}
        <div className="relative flex items-center border-2 border-[#8AD4B5] rounded-2xl bg-[#E2F5ED] p-3 mt-2">
          <img src={dropIcon} alt="Drop Icon" className="w-6 h-6 mr-3" />
          <select 
            className="w-full bg-transparent outline-none"
            value={dropLocation}
            onChange={(e) => setDropLocation(e.target.value)}
          >
            <option value="">Current location</option>
            <option value="Aquamarine-B">Aquamarine-B</option>
          </select>
        </div>

        {/* Confirm Button */}
        <button className="w-full mt-4 py-3 bg-[#008955] text-white font-semibold rounded-2xl">
          Confirm Location
        </button>
      </div>
    </div>
  );
};

export default MapPage2;
