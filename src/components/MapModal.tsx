import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const MapModal = ({ isOpen, onRequestClose, onLocationSelect }: {
  isOpen: boolean,
  onRequestClose: any,
  onLocationSelect: any
}) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (window.google && isOpen) {
      const mapOptions = {
        center: { lat: 13.0827, lng: 80.2707 }, // Default to Chennai
        zoom: 12,
      };
      const mapInstance = new window.google.maps.Map(document.getElementById('map'), mapOptions);
      const newMarker = new window.google.maps.Marker({
        position: mapOptions.center,
        map: mapInstance,
      });

      // Store map and marker in state
      setMap(mapInstance);
      setMarker(newMarker);

      window.google.maps.event.addListener(mapInstance, 'click', (event) => {
        newMarker.setPosition(event.latLng);
        setSelectedLocation({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        });
      });
    }
  }, [isOpen]);

  const handleSelectLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
      onRequestClose();
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
