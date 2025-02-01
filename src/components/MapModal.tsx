import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

// Declare the Google Maps global object for TypeScript to recognize it
declare global {
  interface Window {
    google: typeof google;
  }
}

Modal.setAppElement('#root');

// Define the Location interface for the selected map location
interface Location {
  lat: number;
  lng: number;
}

// Define the props interface for the MapModal component
interface MapModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onLocationSelect: (location: Location) => void;
}

// MapModal component implementation
const MapModal: React.FC<MapModalProps> = ({ isOpen, onRequestClose, onLocationSelect }) => {
  // State for storing map, marker, and the selected location
  const [map, setMap] = useState<google.maps.Map | null>(null); 
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Effect to initialize the map when modal is open
  useEffect(() => {
    if (window.google && isOpen) {
      // Map options
      const mapOptions: google.maps.MapOptions = {
        center: { lat: 13.0827, lng: 80.2707 }, // Default to Chennai
        zoom: 12,
      };

      // Initialize the map instance
      const mapInstance = new window.google.maps.Map(
        document.getElementById('map') as HTMLElement, 
        mapOptions
      );

      // Initialize the marker instance
      const newMarker = new window.google.maps.Marker({
        position: mapOptions.center,
        map: mapInstance,
      });

      // Store map and marker in state
      setMap(mapInstance);
      setMarker(newMarker);

      // Handle click event on the map
      window.google.maps.event.addListener(mapInstance, 'click', (event: google.maps.MapMouseEvent) => {
        const latLng = event.latLng;
        if (latLng) {
          newMarker.setPosition(latLng);
          setSelectedLocation({
            lat: latLng.lat(),
            lng: latLng.lng(),
          });
        }
      });
    }
  }, [isOpen]); // Re-run the effect when `isOpen` changes

  // Handle location selection and pass the data back to the parent component
  const handleSelectLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation); // Pass selected location back to the parent
      onRequestClose(); // Close the modal
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <button
        onClick={handleSelectLocation}
        className="mt-4 bg-green-500 text-white p-2 rounded-lg"
      >
        Select Location
      </button>
    </Modal>
  );
};

export default MapModal;
