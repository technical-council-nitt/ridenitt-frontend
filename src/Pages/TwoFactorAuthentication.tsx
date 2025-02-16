import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

const TwoFactorAuthentication: React.FC = () => {
  const { ongoingSignup, setOngoingSignup, refreshAuth } = useAuth();

  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) { // Only allow digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if a digit is entered
      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    
    if (!ongoingSignup) {
      toast.error("Invalid request");
      setLoading(false);
      navigate("/signup");
      return;
    }

    axios.post("/auth/verify-otp", {
      ...ongoingSignup,
      phoneNumber: ongoingSignup.phoneNumber,
      otp: otp.join("")
    })
    .then(() => {
      toast.success("Success");
      refreshAuth()
      setOngoingSignup(false);
      setTimeout(() => navigate("/"), 2000);
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.response.data.error ?? "Failed to Login");
      setLoading(false);
    })
  }

  return (
    <div className="gradient-background flex flex-col items-center justify-center h-screen px-4 sm:px-6 md:px-8 relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4 flex items-center cursor-pointer" onClick={() => navigate("/signup")}> 
        <span className="text-2xl">&lt;</span>
        <span className="ml-2 text-lg font-semibold">Back</span>
      </div>
      
      <div className="flex flex-col items-center w-full max-w-lg mt-6 md:mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4 text-center">Phone Verification</h2>
        <p className="text-[#878585] font-semibold mb-6 text-center">Enter your OTP code</p>
        
        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3 sm:gap-4 md:gap-5 w-full max-w-xs sm:max-w-sm">
          {otp.map((digit, index) => (
            <input
              disabled={loading}
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              className="w-10 sm:w-12 md:w-14 h-12 sm:h-14 md:h-16 text-center border border-black rounded-md text-lg sm:text-xl font-semibold focus:ring-2 focus:ring-[#008955] focus:outline-none transition"
            />
          ))}
        </div>
        
        {/* Resend Code */}
        <p className="text-gray-700 text-sm sm:text-base font-semibold mt-4">
          Didn’t receive code? 
          <span 
            className="text-[#008955] underline cursor-pointer" 
            onClick={() => console.log("Resend OTP")}
          > Resend again</span>
        </p>
        
        {/* Verify Button */}
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="mt-6 w-full disabled:opacity-50 max-w-sm sm:max-w-md md:max-w-lg py-3 bg-[#008955] text-white font-semibold rounded-lg text-lg border border-black hover:bg-[#007144] transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
