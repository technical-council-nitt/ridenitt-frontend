"use client";

import { useState } from "react";
import { Calendar, Clock, HelpCircle, Car, User, X } from "lucide-react";
import { DateTimeModal } from "./DateTimeModal";


// ShareCount Component
function ShareCount() {
  const [count, setCount] = useState(6); // Initial count is a number

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (newValue === "") {
      setCount(0);  // Reset to 0 if the input is cleared
      return;
    }

    const parsedValue = Number(newValue);
    if (!isNaN(parsedValue)) {
      setCount(parsedValue);
    }
  };

  return (
//     <div className="flex justify-center mb-6">
//   <div className="inline-flex items-center px-8 py-4 rounded-full bg-[#E8F8F3] w-[80%] max-w-auto border-2 border-black">
//     <span className="text-sm sm:text-base md:text-lg text-center flex-grow">Share Count :</span>
//     <input
//       type="number"
//       value={count}
//       onChange={handleChange}
//       className="w-16 text-center font-semibold text-sm sm:text-base md:text-lg border-0 bg-[#E8F8F3] focus:outline-none"
//     />
//   </div>
// </div>
<div className="flex justify-center mb-6">
  <div className="inline-flex items-start px-4 py-2 rounded-full bg-[#E8F8F3] w-max border-2 border-black">
    <span className="text-sm sm:text-base md:text-lg text-center flex-grow">Share Count :</span>
    <input
      type="number"
      value={count}
      onChange={handleChange}
      className="w-16 text-center font-semibold text-sm sm:text-base md:text-lg border-0 bg-[#E8F8F3] focus:outline-none"
    />
  </div>
</div>


  );
}

export default function ShareRide() {
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2nd May 2025");
  const [timeRange, setTimeRange] = useState("07:30 PM - 07:45 PM");
  const [selectedTransport, setSelectedTransport] = useState("");


  const handleDateTimeConfirm = (date: string, startTime: string, endTime: string) => {
    setSelectedDate(`${date}nd May 2025`);
    setTimeRange(`${startTime} - ${endTime}`);
  };

  const handleTransportSelect = (transport: string) => {
    setSelectedTransport(transport);
  };

  return (
    <div
  className="relative w-full min-h-screen p-6 sm:p-6"
  style={{ background: "linear-gradient(180deg, #FFFFFF 0%, rgba(0, 204, 136, 0.75) 100%)" }}
>
      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex-1 relative">
        <input
  type="text"
  placeholder="Search"
  className="w-full h-10 pl-4 pr-10 rounded-full border-2 border-black focus:outline-none"
/>

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <HelpCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#008955] mb-0.75">Share & Ride</h1>
      <p className="text-xl sm:text-2xl md:text-3xl mb-3  ">Post your ride!</p>

      {/* White Card */}
      <div className="w-full max-w-full mx-auto bg-white rounded-3xl py-4 px-4 shadow-lg border-2 border-black mb-20">
        {/* Departure Input */}
        <div className="mb-4">
        <input
  type="text"
  placeholder="Point of departure"
  className="w-full p-4 rounded-full bg-[#E8F8F3] border-2 border-black focus:outline-none placeholder:text-gray-800"
/>

        </div>

        {/* Destination Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Travel destination"
            className="w-full p-4 rounded-full bg-[#E8F8F3] border-2 border-black focus:outline-none placeholder:text-gray-800"
          />
        </div>

        {/* Date and Time Box */}
        <button
  onClick={() => setIsDateTimeModalOpen(true)}
  className="flex items-center justify-between w-full p-4 mb-4 rounded-2xl border-2 border-black"
>
          <div className="flex flex-col items-start gap-1 w-1/2 ">
            <label className="text-sm place-self-center sm:text-sm md:text-xs font-semibold text-neutral-700 ">Travel Date</label>
            <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
              <Calendar className="w-auto h-auto text-gray-500 -mt-2" />
              <span className="text-sm">{selectedDate}</span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 w-1/2 ml-3">
            <label className="text-sm place-self-center sm:text-sm md:text-xs font-semibold text-neutral-700 "> Time Range</label>
            <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
              <Clock className="w-auto h-auto text-gray-500" />
              <span className="text-sm">{timeRange}</span>

            </div>
          </div>
        </button>

        {/* Share Count Component */}
        <ShareCount />

        {/* Transport Options */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div
            onClick={() => handleTransportSelect("Car")}
            className={`flex flex-col items-center p-4 rounded-2xl text-white border-2 border-[#08B783] cursor-pointer ${selectedTransport === "Car" ? "bg-[#008955]" : "bg-[#E8F8F3]"}`}
          >
            <img src="/Images/car.png" alt="Auto" className="w-8 h-auto mb-1" />
            <span className="text-sm sm:text-base md:text-lg text-black">Car</span>

          </div>
          <div
            onClick={() => handleTransportSelect("Auto")}
            className={`flex flex-col items-center p-4 rounded-2xl border-2 border-[#08B783] cursor-pointer ${selectedTransport === "Auto" ? "bg-[#008955] text-white" : "bg-[#E8F8F3]"}`}
          >
            <img src="/Images/AUTO.png" alt="Auto" className="w-8 h-auto mb-1" />
            <span className="text-sm sm:text-base md:text-lg">Auto</span>
          </div>
          <div
            onClick={() => handleTransportSelect("Taxi")}
            className={`flex flex-col items-center p-4 rounded-2xl border-2 border-[#08B783] cursor-pointer ${selectedTransport === "Taxi" ? "bg-[#008955] text-white" : "bg-[#E8F8F3]"}`}
          >
            <img src="/Images/taxi.png" alt="Taxi" className="w-8 h-auto mb-1" />
            <span className="text-sm sm:text-base md:text-lg">Taxi</span>
          </div>
        </div>

        {/* Preferred Gender */}
        <div className="mb-5">
          <label className="block mb-2 -mt-1 text-black text-sm sm:text-base md:text-lg ">Preferred Gender :</label>
          <select className="w-full p-3 rounded-full border-2 border-black focus:outline-none">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">Any</option>
          </select>
        </div>

        {/* Post Button */}
        <button className="w-full py-4 bg-[#008955] text-white rounded-full text-lg sm:text-xl md:text-2xl font-semibold">
          Post your ride!
        </button>
      </div>

      {/* Date Time Modal */}
      <DateTimeModal
        isOpen={isDateTimeModalOpen}
        onClose={() => setIsDateTimeModalOpen(false)}
        onConfirm={handleDateTimeConfirm}
      />

      
    </div>
  );
}
