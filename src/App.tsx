import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AvailableRidesComponent from "./Pages/Availablerides"
import ProfileComponent from './Pages/Profile'
import Start from "./Pages/Start";
import Login from "./Pages/Login";
import Start1 from "./Pages/Start1";
import Start2 from "./Pages/Start2";
import Signup from "./Pages/Signup";
import SetPassword from "./Pages/SetPassword";
import TwoFactorAuthentication from "./Pages/TwoFactorAuthentication";
import NotFound from "./Pages/NotFound";
import MapPage2 from "./Pages/MapPage2";
import Requests from "./Pages/Requests/Index";
import MyRides from "./Pages/MyRides";
import { ToastContainer } from "react-toastify";
import { AuthProvider, useAuth } from "./Hooks/useAuth";
import Navigation from "./Components/Navigation";
import ResetPassword from "./Pages/ResetPassword";
import LocationForm from "./Components/PostRideForm";
import { CurrentRideProvider, useCurrentRide } from "./Hooks/useCurrentRide";
import Notifications from "./Pages/Notifications";
import UpdatePhoneNumber from "./Pages/UpdatePhoneNumber";
import FaqAccordion from "./Pages/Faq";

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
  const { authLoading } = useAuth()

  const { loading: currentRideLoading } = useCurrentRide()

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
        <Route path="/update-phone-number" element={<UpdatePhoneNumber />} />

        {/* Authenticated Routes */}
        <Route element={<Layout />}>

          <Route index element={<AvailableRidesComponent />} />

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
