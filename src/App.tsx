// Add the "use client" directive for client-side rendering
"use client";

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LocationForm from "./components/LocationForm";


const App: React.FC = () => {
  const [rideDetails, setRideDetails] = useState<{
    rideDate: string;
    startTime: string;
    endTime: string;
  }>({
    rideDate: "",
    startTime: "",
    endTime: "",
  });

  const handleLocationSubmit = (data: {
    departure: string;
    destination: string;
    vehicle: string;
    genderPreference: string;
    date: string;
    startTime: string;
    endTime: string;
    passengerCount: string;
  }) => {
    console.log("Ride details:", data);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LocationForm rideDetails={rideDetails} onSubmit={handleLocationSubmit} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
