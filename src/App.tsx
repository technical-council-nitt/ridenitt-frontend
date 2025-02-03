import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DateTimeForm from './components/DateTimeForm';
import LocationForm from './components/LocationForm';
import Header from './components/Header';

const App: React.FC = () => {
  const [rideDetails, setRideDetails] = useState<{
    rideDate: string;
    startTime: string;
    endTime: string;
  }>({
    rideDate: '',
    startTime: '',
    endTime: '',
  });
; 
  // const handleDateTimeConfirm = (data: { rideDate: string, startTime: string, endTime: string, departure: string, destination: string, vehicle: string, genderPreference: string, date: string, passengerCount : string,isModalOpen : string, locationType: string, mapLocation : string, tempStartTime: string, tempEndTime: string}) => {
  //   setRideDetails(data);``
  // };

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
    console.log('Ride details:', data);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LocationForm rideDetails={rideDetails} onSubmit={handleLocationSubmit} />} />
      </Routes>
    </BrowserRouter>
  );

  // return (
  //   <div>
  //     HI
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/" element={<DateTimeForm onConfirm={handleDateTimeConfirm} />} />
  //         <Route path="/locationform" element={<LocationForm rideDetails={rideDetails} onSubmit={handleLocationSubmit} />} />
  //       </Routes>
  //     </BrowserRouter>
  //   </div>
  // );
};

export default App;
