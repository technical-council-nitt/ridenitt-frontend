import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSavePassword = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!"); 
      return;
    }
    if (!password || !confirmPassword) {
      alert("Password cannot be blank");
      return;
    }

    // Redirect to login page after setting password
    navigate("/login");
  };

  return (
    <div className="gradient-background flex flex-col items-center justify-center h-screen px-6 relative">

      {/* Back Button */}
      <div
        className="absolute top-4 left-4 flex items-center cursor-pointer"
        onClick={() => navigate("/twofactorauthentication")}
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
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg mb-6">
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

        {/* Save Password Button */}
        <button 
          onClick={handleSavePassword}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg py-3 bg-[#008955] text-white font-semibold rounded-lg text-lg border border-black hover:bg-[#007144] transition"
        >
          Save Password
        </button>
      </div>
    </div>
  );
};

export default SetPassword;

