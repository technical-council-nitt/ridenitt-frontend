import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../Hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";

const SetPassword: React.FC = () => {
  const { ongoingResetPw, setOngoingResetPw } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (resendTimer > 0) {
        setResendTimer(c => c - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  const handleSavePassword = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!password || !confirmPassword) {
      toast.error("Password cannot be blank");
      return;
    }

    if (ongoingResetPw.phoneNumber === null) {
      toast.error("Failed to Reset Password")
      return
    }

    if (otp.length !== 6) {
      toast.error("Invalid OTP");
      return
    }

    setLoading(true);
    axios.post("/auth/verify-otp?reset=true", {
      phoneNumber: ongoingResetPw,
      password,
      otp
    })
      .then(() => {
        toast.success("Password Reset Successfully");
        navigate("/login");
        setOngoingResetPw({ phoneNumber: null });
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response.data.error ?? "Failed to Reset Password");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resendOtp = () => {
    if (ongoingResetPw.phoneNumber === null) {
      toast.error("Failed to Reset Password")
      return
    }

    setLoading(true);

    axios.post("/auth/send-otp", { phoneNumber: ongoingResetPw })
      .then(() => {
        toast.success("OTP Sent");
        setResendTimer(120);
      })
      .catch((err) => {
        console.error(err)
        toast.error(err.response.data.error ?? "Failed to Send OTP");
      })
      .finally(() => {
        setLoading(false)
      });
  }

  return (
    <div className="gradient-background flex flex-col items-center justify-center h-screen px-6 relative">

      {/* Back Button */}
      <div
        className="absolute top-4 left-4 flex items-center cursor-pointer"
        onClick={() => navigate("/reset-password")}
      >
        <span className="text-2xl">&lt;</span>
        <span className="ml-2 text-lg font-semibold">Back</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center mt-[-40px] w-full max-w-lg">
        <h2 className="text-3xl font-bold text-black mb-4 text-center">Set New Password</h2>
        <p className="text-[#878585] font-semibold mb-6 text-center">Set your new password</p>

        {/* New Password Input */}
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008955] text-lg"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>

        {/* Confirm Password Input */}
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg mb-2">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008955] text-lg"
          />
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>

        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg mb-4">
          {ongoingResetPw && (
            <span>
              OTP Sent to +91 xxxxx xx{ongoingResetPw.phoneNumber?.slice(-3)}
            </span>
          )}
          <input
            type={"text"}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008955] text-lg"
          />
          <button
            disabled={resendTimer > 0}
            onClick={resendOtp}
            className="w-fit ml-auto block text-[#008955] px-4 py-2 rounded-lg text-lg"
          >
            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
          </button>
        </div>

        {/* Save Password Button */}
        <button
          disabled={loading}
          onClick={handleSavePassword}
          className="disabled:opacity-50 w-full max-w-sm sm:max-w-md md:max-w-lg py-3 bg-[#008955] text-white font-semibold rounded-lg text-lg border border-black hover:bg-[#007144] transition"
        >
          Save Password
        </button>
      </div>
    </div>
  );
};

export default SetPassword;

