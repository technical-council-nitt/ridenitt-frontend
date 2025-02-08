// Add the "use client" directive for client-side rendering
"use client";

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LocationForm from "./components/LocationForm"
import AvailableRidesComponent from "./Pages/Availablerides"
import ProfileComponent from './Pages/profile'
import Start from "./Pages/Start";
import Login from "./Pages/Login";
import Start1 from "./Pages/Start1";
import Start2 from "./Pages/Start2";
import Signup from "./Pages/Signup";
import TwoFactorAuthentication from "./Pages/TwoFactorAuthentication";
import SetPassword from "./Pages/SetPassword";
import NotFound from "./Pages/NotFound"; // Create a 404 Page


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

const router = createBrowserRouter([
  { path: "/", element: <AvailableRidesComponent /> },
  { path: "/locationForm", element: <LocationForm  rideDetails={rideDetails} onSubmit={handleLocationSubmit} /> },
  { path: "/profile", element: <ProfileComponent /> },
  { path: "/start", element: <Start /> },
  { path: "/start1", element: <Start1 /> },
  { path: "/start2", element: <Start2 /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/twofactorauthentication", element: <TwoFactorAuthentication /> },
  { path: "/setpassword", element: <SetPassword /> },
  { path: "*", element: <NotFound /> }, // Catch-all for undefined routes
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
