import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AvailableRidesComponent from "./Pages/Availablerides";
import ProfileComponent from './Pages/profile';
import Start from "./Pages/Start";
import Login from "./Pages/Login";
import Start1 from "./Pages/Start1";
import Start2 from "./Pages/Start2";
import Signup from "./Pages/Signup";
import SetPassword from "./Pages/SetPassword";
import TwoFactorAuthentication from "./Pages/TwoFactorAuthentication";
import NotFound from "./Pages/NotFound";
import Requests from "./Pages/Requests/Index";
import MyRides from "./Pages/MyRides";
import { ToastContainer } from "react-toastify";
import { AuthProvider, useAuth } from "./Hooks/useAuth";
import Navigation from "./Components/Navigation";
import ResetPassword from "./Pages/ResetPassword";
import LocationForm from "./Components/LocationForm";
import { CurrentRideProvider, useCurrentRide } from "./Hooks/useCurrentRide";
import CurrentRide from "./Pages/CurrentRide";
import Notifications from "./Pages/Notifications";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CurrentRideProvider>
        <BrowserRouter>
          <CustomRouter />
          <ToastContainer />
        </BrowserRouter>
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
    <Routes>
      {/* Public Routes */}
      
      <Route path="/start" element={<Start />} />
      <Route path="/start1" element={<Start1 />} />
      <Route path="/start2" element={<Start2 />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/2fa" element={<TwoFactorAuthentication />} />
      <Route path="/reset-password" element={<ResetPassword />} /> 
      

      {/* Protected Routes - Layout Ensures Navigation is Included */}
      <Route element={<Layout />}>
        <Route index element={<CurrentRide />} />
        <Route path="/suggestions" element={<AvailableRidesComponent />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/profile" element={<ProfileComponent />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/my-rides" element={<MyRides />} />
        <Route path="/setpassword" element={<SetPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/LocationForm" element={<LocationForm />} />
      </Route>

      {/* Catch-All 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
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
