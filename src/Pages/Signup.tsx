import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Hooks/useAuth";
import axios from "axios";
import Redirect from "../Components/Redirect";

const Signup: React.FC = () => {
  const { user, setOngoingSignup } = useAuth();
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    if (!agree) {
      toast("Please agree to the terms and conditions");
      return;
    }

    if (!name || !phoneNumber || !gender || !password) {
      toast("Please fill all the fields")
      return;
    }

    let ph = "+91" + phoneNumber.replaceAll(/\s+/g, '');

    setOngoingSignup({
      name,
      phoneNumber: ph,
      password,
      gender
    })

    setLoading(true);

    axios.post("/auth/send-otp", {
      phoneNumber: ph
    })
      .then(() => {
        navigate("/2fa");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const handleLogin = () => {
    navigate("/login");
  }

  if (user) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <div className="gradient-background flex flex-col items-center justify-center h-screen px-6">
      <div className="flex flex-col items-center justify-center h-screen px-6">
        {/* Signup Text */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl -mt-14 font-bold text-black text-left w-full max-w-sm">
          Sign up with your phone number
        </h2>

        <div className="mt-4 w-full max-w-sm">
          {/* Name Input */}
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Username"
            className="w-full border border-black px-4 py-2 rounded-md"
          />
          <span className="text-xs text-black font-normal block mb-3 pt-1 pl-2">Please remember username for login</span>

          {/* phoneNumber Number Input with +91 */}
          <div className="flex border border-black rounded-md overflow-hidden mb-3">
            <span className="bg-gray-200 px-4 py-2">+91</span>
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              placeholder="Enter number"
              className="w-full px-4 py-2 outline-none"
            />
          </div>

          {/* Password Input */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full border border-black px-4 py-2 rounded-md mb-3"
          />

          {/* Gender Dropdown */}
          <select onChange={(e) => setGender(e.currentTarget.value)} className="w-full border border-black px-2 py-2 rounded-md mb-3">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* Terms & Conditions Checkbox */}
          <div className="flex items-center gap-2 mb-4 pl-2">
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
            disabled={loading}
            className="disabled:opacity-50 w-full bg-[#008955] text-white py-2 rounded-md text-lg font-semibold hover:bg-[#006944] transition"
            onClick={handleSignup}
          >
            Sign Up
          </button>

          {/* Already have an account */}
          <p className="mt-4 text-center text-gray-700 font-semibold">
            Already have an account?{" "}
            <button
              onClick={handleLogin}
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
