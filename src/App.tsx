import React from "react";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider, useAuth } from "./Hooks/useAuth";
import { CurrentRideProvider, useCurrentRide } from "./Hooks/useCurrentRide";
import Navigation from "./components/Navigation";

import AvailableRidesComponent from "./Pages/Availablerides";
import FaqAccordion from "./Pages/Faq";
import ProfileComponent from "./Pages/profile";
import Start from "./Pages/Start";
import Login from "./Pages/Login";
import Start1 from "./Pages/Start1";
import Start2 from "./Pages/Start2";
import Signup from "./Pages/Signup";
import SetPassword from "./Pages/SetPassword";
import ResetPassword from "./Pages/ResetPassword";
import TwoFactorAuthentication from "./Pages/TwoFactorAuthentication";
import NotFound from "./Pages/NotFound";
import MapPage2 from "./Pages/MapPage2";
import Requests from "./Pages/Requests/Index";
import MyRides from "./Pages/MyRides";
import CurrentRide from "./Pages/CurrentRide";
import Notifications from "./Pages/Notifications";
import LocationForm from "./components/PostRideForm";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CurrentRideProvider>
        <CustomRouter />
        <ToastContainer />
      </CurrentRideProvider>
    </AuthProvider>
  );
};

const CustomRouter = () => {
  const { user, authLoading } = useAuth();
  const { loading: currentRideLoading } = useCurrentRide();

  if (authLoading || currentRideLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/start" element={<Start />} />
        <Route path="/start1" element={<Start1 />} />
        <Route path="/start2" element={<Start2 />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/2fa" element={<TwoFactorAuthentication />} />
        <Route path="/setpassword" element={<SetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Authenticated Routes */}
        <Route element={<Layout />}>
          <Route index element={<CurrentRide />} />
          <Route path="/create-ride" element={<LocationForm />} />
          <Route path="/suggestions" element={<AvailableRidesComponent />} />
          <Route path="/faq" element={<FaqAccordion />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/my-rides" element={<MyRides />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const Layout = () => {
  return (
    <div>
      <Outlet />
      <Navigation />
    </div>
  );
};

export default App;
