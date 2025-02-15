import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Start from "./Pages/Start";
import Login from "./Pages/Login";
import Start1 from "./Pages/Start1";
import Start2 from "./Pages/Start2";
import Signup from "./Pages/Signup";
import TwoFactorAuthentication from "./Pages/TwoFactorAuthentication";
import SetPassword from "./Pages/SetPassword";
import NotFound from "./Pages/NotFound"; // 404 Page

// Import Map Pages Individually

import MapPage2 from "./Pages/MapPage2";


const router = createBrowserRouter([
  { path: "/", element: <Start /> },
  { path: "/start1", element: <Start1 /> },
  { path: "/start2", element: <Start2 /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/twofactorauthentication", element: <TwoFactorAuthentication /> },
  { path: "/setpassword", element: <SetPassword /> },

  // Separate Routes for Each Map Page
  { path: "/map2", element: <MapPage2 /> },

  // Catch-all for undefined routes
  { path: "*", element: <NotFound /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
