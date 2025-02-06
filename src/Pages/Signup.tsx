import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);

  return (
    <div className="gradient-background flex flex-col items-center justify-center h-screen px-6">
      <div className="flex flex-col items-center justify-center h-screen px-6">
        {/* Signup Text */}
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-left w-full max-w-sm">
          Sign up with your email or phone number
        </h2>

        <div className="mt-4 w-full max-w-sm">
          {/* Name Input */}
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-black px-4 py-2 rounded-md mb-3"
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-black px-4 py-2 rounded-md mb-3"
          />

          {/* Mobile Number Input with +91 */}
          <div className="flex border border-black rounded-md overflow-hidden mb-3">
            <span className="bg-gray-200 px-4 py-2">+91</span>
            <input
              type="tel"
              placeholder="Enter number"
              className="w-full px-4 py-2 outline-none"
            />
          </div>

          {/* Gender Dropdown */}
          <select className="w-full border border-black px-4 py-2 rounded-md mb-3">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* Terms & Conditions Checkbox */}
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="w-6 h-6 accent-green-600 cursor-pointer"
            />
            <span className="text-sm text-gray-700 font-semibold">
              By agreeing to this, you accept the{" "}
              <span className="text-[#008955] font-semibold cursor-pointer hover:underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#008955] font-semibold cursor-pointer hover:underline">
                Privacy Policy
              </span>
            </span>
          </div>

          {/* Signup Button */}
          <button
            className="w-full bg-[#008955] text-white py-2 rounded-md text-lg font-semibold hover:bg-[#006944] transition"
            onClick={() => navigate("/twofactorauthentication")}
          >
            Sign Up
          </button>

          {/* Already have an account */}
          <p className="mt-4 text-center text-gray-700 font-semibold">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#008955] font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
