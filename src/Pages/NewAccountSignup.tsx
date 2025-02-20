import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Hooks/useAuth";
import axios from "axios";
import Redirect from "../Components/Redirect";

const NewAccountSignup: React.FC = () => {
  const { authLoading, user, hasSignedUp, refreshAuth } = useAuth();
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user?.name || "")
  }, [user])

  const handleSubmit = () => {
    if (!agree) {
      toast("Please agree to the terms and conditions");
      return;
    }

    if (!name || !phoneNumber || !gender) {
      toast("Please fill all the fields")
      return;
    }

    let ph = "+91" + phoneNumber.replaceAll(/\s+/g, '');

    setLoading(true);

    axios.post("/api/users/me", {
      name,
      phoneNumber: ph,
      gender,
    })
      .then(() => {
        toast.success("Your profile is created")
        refreshAuth()
        navigate("/")
      })
      .catch((err) => {
        toast.error(err.response.data.error || "Failed to created profile");
      })
      .finally(() => {
        setLoading(false);
      })
  }

  if (!authLoading && !user) {
    return (
      <Redirect to="/start" />
    )
  }
  
  if (hasSignedUp) {
    return (
      <Redirect to="/" />
    )
  }

  return (
    <div className="gradient-background flex flex-col items-center justify-center h-screen px-6">
      <div className="flex flex-col items-center justify-center h-screen px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-left w-full max-w-sm">
          Create your Account
        </h2>

        <div className="mt-4 w-full max-w-sm flex flex-col gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your Name"
            className="w-full border border-black px-4 py-2 rounded-md"
          />

          <div className="flex border border-black rounded-md overflow-hidden">
            <span className="bg-green-100 px-4 py-2">+91</span>
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              placeholder="Enter number"
              className="w-full px-4 py-2 outline-none"
            />
          </div>

          <select onChange={(e) => setGender(e.currentTarget.value)} className="w-full border border-black px-4 py-2 rounded-md mb-3">
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

          <button
            disabled={loading}
            className="disabled:opacity-50 w-full bg-[#008955] text-white py-2 rounded-md text-lg font-semibold hover:bg-[#006944] transition"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAccountSignup;
