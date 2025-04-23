import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
//@ts-ignore
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Select from "./Select";

const places = [
  "NIT Trichy",
  "Trichy Junction",
  "Chatram Bus Stand",
  "Central Bus Stand",
  "Trichy Airport",
  "Shivani Engineering College",
"Cauvery college for Women",
"Nehru Memorial College",
"K. Ramakrishnan college of Technology",
"Sureya College of Engineering",
"Pavendar Bharathidasan college",
"Jayaram College of Engineering",
"M.A.M. School of Engineering"
]

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapPage2 = ({
  pickupLocation,
  setPickupLocation,
  dropLocation,
  setDropLocation,
  onConfirm
}: {
  pickupLocation: string;
  setPickupLocation: (location: string) => void;
  dropLocation: string;
  setDropLocation: (location: string) => void;
  onConfirm: () => void;
}) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const defaultLocation = { lat: 10.76338535, lng: 78.81502919117466 };

  useEffect(() => {

    if (!navigator.geolocation) {
    	console.error("Geolocation not supported");
    	setLocation(defaultLocation);
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
        console.error("Error getting location:", error);
      }
    );
  }, []);

  return (
    <div className="relative h-screen w-full">
      {/* Map Section */}
      <MapContainer
        center={location || defaultLocation}
        zoom={15}
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={location || defaultLocation} icon={customIcon} />
        <Circle
          center={location || defaultLocation}
          radius={200}
          pathOptions={{ color: "green", fillOpacity: 0.3 }}
        />
      </MapContainer>

      {/* Bottom Section */}
      <div className="absolute flex flex-col gap-2 bottom-[70px] left-0 w-full p-6 bg-white border-t-2 border-[#08B783] rounded-t-2xl">
        {/* Select Pickup Location */}
        <Select
          value={pickupLocation}
          items={places}
          onChange={setPickupLocation}
          Label={({ children }: { children: React.ReactNode }) => (
            <div className="flex items-center gap-3">
              <img width={24} height={24} src="/Images/pickup.png" alt="Pickup Icon" className="w-6 h-6" />
              {children || "Select Pickup"}
            </div>
          )}
        />

        {/* Select Drop Location */}
        <Select
          value={dropLocation}
          items={places}
          onChange={setDropLocation}
          Label={({ children }: { children: React.ReactNode }) => (
            <div className="flex items-center gap-3">
              <img width={24} height={24} src="/Images/drop.png" alt="Drop Icon" className="w-6 h-6" />
              {children || "Select Drop"}
            </div>
          )}
        />

        {/* Confirm Button */}
        <button onClick={onConfirm} disabled={!pickupLocation || !dropLocation} className="disabled:opacity-50 w-full mt-4 py-3 bg-[#008955] text-white font-semibold rounded-2xl">
          Confirm Location
        </button>
      </div>
    </div>
  );
};

export default MapPage2;
