import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Hooks/useAuth";

const ResetPassword: React.FC = () => {
  const { user, setOngoingResetPw } = useAuth()

  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = () => {
    let ph = "+91" + phoneNumber.replaceAll(/\s+/g, "");
    
    setOngoingResetPw({
      phoneNumber: ph
    });
    
    setLoading(true);

    axios.post("/auth/send-otp", { phoneNumber: ph })
      .then(() => {
        toast.success("OTP Sent");
        navigate("/setpassword")
      })
      .catch((err) => {
        console.error(err)
        toast.error(err.response.data.error ?? "Failed to Send OTP");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (user) {
    navigate("/");
  }

  return (
    <div className="gradient-background flex flex-col items-center justify-center h-screen px-6">
      {/* Left-Aligned Title Container */}
      <div className="w-full max-w-sm">
        <h2 className="text-black text-2xl md:text-3xl font-semibold text-left">
          Reset Password
        </h2>
      </div>

      {/* Increased Gap Between Text and Image */}
      <div className="mt-6"></div>

      {/* Centered Image with Balanced Size */}
      <img
        width={300} height={300}
        src="/Images/login-image.png"
        alt="Reset Password"
        className="w-[85%] sm:w-[50%] md:w-[40%] lg:w-[30%] max-w-[350px] max-h-[220px] md:max-h-[260px] lg:max-h-[280px] object-contain"
      />

      {/* Input Fields - Centered */}
      <div className="w-full max-w-sm flex flex-col gap-4 mt-5">
        <div className="flex border border-black rounded-md overflow-hidden mb-3">
          <span className="bg-gray-200 px-4 py-2">+91</span>
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="tel"
            placeholder="Enter number"
            className="w-full px-4 py-2 outline-none"
          />
        </div>
      </div>

      {/* Start Sharing Button - Centered */}
      <button
        disabled={loading}
        onClick={handleResetPassword}
        className="disabled:opacity-50 mt-6 px-6 py-3 bg-[#008955] text-white font-semibold rounded-lg text-lg w-full max-w-sm hover:bg-[#007144] transition border border-black"
      >
        Send OTP
      </button>
    </div>
  );
};

export default ResetPassword;
