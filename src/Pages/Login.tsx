import React from "react";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../Hooks/useAuth";
import Redirect from "../Components/Redirect";

const Login: React.FC = () => {
  const { user, hasSignedUp } = useAuth()

  if (user) {
    if (hasSignedUp) return (
      <Redirect to="/" />
    )

    return (
      <Redirect to="/sign-up" />
    )
  }

  return (
    <div className="gradient-background h-screen px-6 pt-20">
      <div className="w-full max-w-sm mx-auto">
        <h2 className="text-black text-2xl md:text-3xl font-semibold text-left">
          Hop In!
        </h2>
        <h2 className="text-black text-2xl md:text-3xl font-semibold text-left">
          Smarter Rides Start Here.
        </h2>

        <img
          width={300} height={300}
          src="/Images/login-image.png"
          alt="Login"
          className="mt-6 w-[85vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] max-w-[350px] max-h-[220px] md:max-h-[260px] lg:max-h-[280px] object-contain"
        />

        {/* Not Link to force refresh page */}
        <a
          href="/auth/google"
          className="disabled:opacity-50 mt-6 px-6 py-3 flex items-center justify-center gap-4 bg-[#008955] text-white font-semibold rounded-lg text-lg w-full max-w-sm hover:bg-[#007144] transition border border-black"
        >
          <FaGoogle />
          Continue with Google
        </a>
      </div>

    </div>
  );
};

export default Login;
