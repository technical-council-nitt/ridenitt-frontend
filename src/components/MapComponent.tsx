import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        alert("Unable to retrieve your location: " + error.message);
      }
    );
  }, []);

  return (
    <MapContainer center={location || { lat: 10.7905, lng: 78.7047 }} zoom={13} className="h-screen w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {location && (
        <Marker position={location}>
          <Popup>You are here!</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapComponent;
