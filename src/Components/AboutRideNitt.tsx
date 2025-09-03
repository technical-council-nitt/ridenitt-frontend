import React from "react";

const AboutRideNitt: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl max-h-[80vh] overflow-y-auto p-6"
        style={{ width: '80vw', marginLeft: '10vw', marginRight: '10vw', maxWidth: 'none' }}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-green-700">About RideNITT</h2>
        <p>content</p>
        <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AboutRideNitt;
