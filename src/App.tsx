import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import AvailableRidesComponent from "./Pages/Availablerides"
import ProfileComponent from './Pages/Profile'
import Start from "./Pages/Start";
import Login from "./Pages/Login";
import Start1 from "./Pages/Start1";
import Start2 from "./Pages/Start2";
import Signup from "./Pages/Signup";
import TwoFactorAuthentication from "./Pages/TwoFactorAuthentication"; // 404 Page

// Import Map Pages Individually

import MapPage2 from "./Pages/MapPage2";
import NotFound from "./Pages/NotFound";
import Requests from "./Pages/Requests/Index";
import MyRides from "./Pages/MyRides";
import { ToastContainer } from "react-toastify";
import { AuthProvider, useAuth } from "./Hooks/useAuth";
import Navigation from "./Components/Navigation";
import ResetPassword from "./Pages/ResetPassword";
import LocationForm from "./Components/PostRideForm";
import { CurrentRideProvider, useCurrentRide } from "./Hooks/useCurrentRide";
import CurrentRide from "./Pages/CurrentRide";
import Notifications from "./Pages/Notifications";
import MapPage2 from "./Pages/MapPage2";


const App: React.FC = () => {
  return <>
    <AuthProvider>
      <CurrentRideProvider>
        <CustomRouter />
        <ToastContainer />
      </CurrentRideProvider>
    </AuthProvider>
  </>
}

const CustomRouter = () => {
  const { user, authLoading } = useAuth()

  const { loading: currentRideLoading } = useCurrentRide()

  if (authLoading || currentRideLoading) {
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<Start />} />
        <Route path="/start1" element={<Start1 />} />
        <Route path="/start2" element={<Start2 />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/2fa" element={<TwoFactorAuthentication />} />
        <Route path="/setpassword" element={<SetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/create-ride" element={<LocationForm />} />
        
        <Route element={<Layout />}>
          <Route index element={<CurrentRide />} />
          <Route path="/suggestions" element={<AvailableRidesComponent />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/my-rides" element={<MyRides />} />
          <Route path="/map2" element={<MapPage2 />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

const Layout = () => {
  return (
    <div>
      <Outlet />
      <Navigation />
    </div>
  )

}

export default App;
