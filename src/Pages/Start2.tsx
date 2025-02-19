import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Start2: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="gradient-background grid place-items-center h-screen p-8">
      <div className="max-w-sm flex flex-col gap-8">
        {/* Centered Image - Same size as Start1 */}
        <img src="/Images/start-image-2.png" alt="Ride Together" className="max-w-[90%] md:max-w-[70%]" />

        <div>
          {/* Left-Aligned Text Below Image */}
          <div className="text-left">
            <h1
              className="text-black font-bold leading-snug"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }} // Same as Start1
            >
              Ride Together, <br />
              Save More, <br />
              Travel Smarter <br />
              with <br />
              <span className="text-[#008955]">RideNITT!</span>
            </h1>
          </div>

          {/* Left-Aligned Arrow Button */}
          <div className="pl-1 relative mt-6 flex justify-start w-fit">
            <div className="p-1 md:p-2 w-20 h-20 bg-[#B9E5D1] rounded-full flex items-center justify-center">
              <Link
                className="w-12 h-12 bg-[#008955] rounded-full flex items-center justify-center cursor-pointer"
                to="/login"
              >
                <FiArrowRight className="text-white text-2xl sm:text-xl" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Start2;
