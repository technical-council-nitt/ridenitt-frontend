import React from "react";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../Hooks/useAuth";
import Redirect from "../Components/Redirect";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const Login: React.FC = () => {
  const { user, hasSignedUp } = useAuth();

  if (user) {
    if (hasSignedUp) return <Redirect to="/" />;
    return <Redirect to="/sign-up" />;
  }

  const handleGoogleLogin = () => {
    // Full page redirect → backend Google OAuth
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <div className="gradient-background h-screen px-6 pt-20 flex flex-col items-center">
      <div className="w-full max-w-sm text-left">
        <h2 className="text-black text-2xl md:text-3xl font-semibold">Hop In!</h2>
        <h2 className="text-black text-2xl md:text-3xl font-semibold">
          Smarter Rides Start Here.
        </h2>
      </div>

      <img
        width={300}
        height={300}
        src="/Images/login-image.png"
        alt="Login illustration"
        className="mt-6 w-[85%] sm:w-[50%] md:w-[40%] lg:w-[30%] max-w-[350px] max-h-[280px] object-contain"
      />

      <button
        onClick={handleGoogleLogin}
        className="disabled:opacity-50 mt-6 px-6 py-3 flex items-center justify-center gap-4 bg-[#008955] text-white font-semibold rounded-lg text-lg w-full max-w-sm hover:bg-[#007144] transition border border-black"
      >
        <FaGoogle />
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
