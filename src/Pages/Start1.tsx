import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import img1 from "../Images/start-image-1.png";

const Start1: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="gradient-background grid place-items-center h-screen p-4">
      <div className="max-w-sm flex flex-col gap-8">
        {/* Centered Image */}
        <img src={img1} alt="Trusted Users" className="max-w-[90%] md:max-w-[70%]" />

        <div>
          {/* Left-Aligned Text Below Image */}
          <div className="text-left">
            <h1 className="text-black font-bold leading-snug"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" }}> {/* Reduced for large screens */}
              Trusted <br />
              by <span className="text-[#008955]">8000+</span> <br />
              <span className="text-[#008955]">NITT students</span> for <br />
              their daily <br />
              commute!
            </h1>
          </div>

          {/* Left-Aligned Arrow Button */}
          <div className="relative mt-6 flex justify-start w-fit">
            <div className="p-1 md:p-2 w-16 h-16 bg-[#B9E5D1] rounded-full flex items-center justify-center">
              <div
                className="w-10 h-10 bg-[#008955] rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => navigate("/start2")}
              >
                <FiArrowRight className="text-white text-2xl sm:text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start1;
