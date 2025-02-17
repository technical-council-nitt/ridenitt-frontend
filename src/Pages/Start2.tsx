import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const Start2: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="gradient-background grid place-items-center h-screen p-4">
      <div className="max-w-sm flex flex-col gap-8">
        {/* Centered Image - Same size as Start1 */}
        <img src="/Images/start-image-2.png" alt="Ride Together" className="max-w-[90%] md:max-w-[70%]" />

        <div className="pl-4 md:pl-8">
          {/* Shifted Right-Aligned Text Below Image */}
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
          <div className="relative mt-6 flex justify-start w-fit">
            <div className="p-2 md:p-3 w-20 h-20 md:w-24 md:h-24 bg-[#B9E5D1] rounded-full flex items-center justify-center">
              <div
                className="w-14 h-14 md:w-16 md:h-16 bg-[#008955] rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => navigate("/login")}
              >
                <FiArrowRight className="text-white text-3xl md:text-4xl" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Start2;
