
// Add the "use client" directive for client-side rendering
"use client";

import { useState } from "react";

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
import Requests from "./Pages/Requests/Index";
import MyRides from "./Pages/MyRides";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Hooks/useAuth";
import Navigation from "./Components/Navigation";
import ResetPassword from "./Pages/ResetPassword";


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

  { path: "/", element: <><AvailableRidesComponent /> <Navigation /></> },
  { path: "/requests", element: <><Requests /> <Navigation /></>},
  { path: "/profile", element: <><ProfileComponent /> <Navigation /></> },
  { path: 'my-rides', element: <><MyRides /> <Navigation /></> },


  { path: "/locationForm", element: <LocationForm  rideDetails={rideDetails} onSubmit={handleLocationSubmit} /> },
  { path: "/profile", element: <ProfileComponent /> },

  { path: "/start", element: <Start /> },
  { path: "/start1", element: <Start1 /> },
  { path: "/start2", element: <Start2 /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/2fa", element: <TwoFactorAuthentication /> },
  { path: "/setpassword", element: <SetPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "*", element: <NotFound /> }, // Catch-all for undefined routes
]);

function App() {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </>
  );

}

export default App;
