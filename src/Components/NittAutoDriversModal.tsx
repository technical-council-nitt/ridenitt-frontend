import React from "react";
import driverData from "../data/nitt_auto_drivers.json";

interface Driver {
  name: string;
  mobile: string | string[];
}

const NittAutoDriversModal: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl max-h-[80vh] overflow-y-auto p-6"
        style={{ width: '80vw', marginLeft: '10vw', marginRight: '10vw', maxWidth: 'none' }}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-green-700">NITT Auto Drivers</h2>
        <ul className="space-y-3">
          {driverData.map((driver: Driver, idx: number) => (
            <li key={idx} className="border-b pb-2">
              <div className="font-semibold text-base">{driver.name}</div>
              <div className="text-sm text-gray-700">
                {Array.isArray(driver.mobile)
                  ? driver.mobile.map((m, i) => <div key={i}>{m}</div>)
                  : driver.mobile}
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-6 px-4 py-2 bg-green-600 text-white rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default NittAutoDriversModal;
