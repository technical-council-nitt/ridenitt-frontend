"use client"

import { useState } from "react"
import { Calendar, Clock, HelpCircle, Car, User } from "lucide-react"
import { DateTimeModal } from "./date-time-modal"

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
    <div className="flex justify-center mb-6">
  <div className="inline-flex items-center px-11 py-4 rounded-full bg-[#E8F8F3] w-[150%]">
    <span className="text-sm mr-2 text-center flex-grow">Share Count:</span>
    <input
      type="number"
      value={count}
      onChange={handleChange}
      className="w-20 text-center font-semibold text-sm border-0 bg-[#E8F8F3] focus:outline-none"
    />
  </div>
</div>



  );
}

export default function ShareRide() {
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("2nd May 2025")
  const [timeRange, setTimeRange] = useState("07:30 PM - 07:45 PM")
  const [selectedTransport, setSelectedTransport] = useState("")

  const handleDateTimeConfirm = (date: string, startTime: string, endTime: string) => {
    setSelectedDate(`${date}nd May 2025`)
    setTimeRange(`${startTime} - ${endTime}`)
  }

  const handleTransportSelect = (transport: string) => {
    setSelectedTransport(transport)
  }

  return (
    <div className="relative w-full min-h-screen bg-[#C1EDE08C] p-4 sm:p-6">
      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-10 pl-4 pr-10 rounded-full border-2 border-gray-300 focus:outline-none"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <HelpCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Title */}
<h1 className="text-3xl font-bold text-[#008955] mb-1">Share & Ride</h1>
<p className="text-xl mb-6">Post your ride!</p>


      {/* White Card */}
      <div className="w-full max-w-[380px] mx-auto bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-300 mb-12">
        {/* Departure Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Point of departure"
            className="w-full p-4 rounded-full bg-[#E8F8F3] border-2 border-gray-300 focus:outline-none"
          />
        </div>

        {/* Destination Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Travel destination"
            className="w-full p-4 rounded-full bg-[#E8F8F3] border-2 border-gray-300 focus:outline-none"
          />
        </div>

        {/* Date and Time Box */}
        <button
          onClick={() => setIsDateTimeModalOpen(true)}
          className="flex items-center justify-between w-full p-4 mb-4 rounded-2xl border-2 border-gray-300"
        >
          <div className="flex flex-col items-start gap-1 w-1/2">
            <label className="text-[8px] font-semibold text-gray-500 opacity-50">Travel Date</label>
            <div className="flex items-center gap-2 text-xs">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>{selectedDate}</span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1 w-1/2">
            <label className="text-[8px] font-semibold text-gray-500 opacity-50">Travel Time Range</label>
            <div className="flex items-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{timeRange}</span>
            </div>
          </div>
        </button>

        {/* Share Count Component */}
        <ShareCount />

        {/* Transport Options */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div
            onClick={() => handleTransportSelect("Car")}
            className={`flex flex-col items-center p-4 rounded-2xl text-white cursor-pointer ${
              selectedTransport === "Car" ? "bg-green-600" : "bg-[#E8F8F3]"
            }`}
          >
            <Car className="w-6 h-6 mb-1" />
            <span className="text-sm">Car</span>
          </div>
          <div
            onClick={() => handleTransportSelect("Auto")}
            className={`flex flex-col items-center p-4 rounded-2xl cursor-pointer ${
              selectedTransport === "Auto" ? "bg-green-600 text-white" : "bg-[#E8F8F3]"
            }`}
          >
            <img src="/placeholder.svg?height=24&width=24" alt="Auto" className="w-6 h-6 mb-1" />
            <span className="text-sm">Auto</span>
          </div>
          <div
            onClick={() => handleTransportSelect("Taxi")}
            className={`flex flex-col items-center p-4 rounded-2xl cursor-pointer ${
              selectedTransport === "Taxi" ? "bg-green-600 text-white" : "bg-[#E8F8F3]"
            }`}
          >
            <img src="/placeholder.svg?height=24&width=24" alt="Taxi" className="w-6 h-6 mb-1" />
            <span className="text-sm">Taxi</span>
          </div>
        </div>

        {/* Preferred Gender */}
        <div className="mb-6">
          <label className="block mb-2 opacity-60">Preferred Gender :</label>
          <select className="w-full p-3 rounded-full border-2 border-gray-300 focus:outline-none">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="any">Any</option>
          </select>
        </div>

        {/* Post Button */}
        {/* Post Button */}
<button className="w-full py-4 bg-[#008955] text-white rounded-full text-lg font-semibold">
  Post your ride!
</button>

      </div>

      {/* Date Time Modal */}
      <DateTimeModal
        isOpen={isDateTimeModalOpen}
        onClose={() => setIsDateTimeModalOpen(false)}
        onConfirm={handleDateTimeConfirm}
      />

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4">
        <button className="flex flex-col items-center justify-center">
          <Clock className="w-6 h-6" />
        </button>
        <button className="flex flex-col items-center justify-center">
          <Calendar className="w-6 h-6" />
        </button>
        <button className="flex flex-col items-center justify-center">
          <img src="/placeholder.svg?height=24&width=24" alt="Notification" className="w-6 h-6" />
        </button>
        <button className="flex flex-col items-center justify-center">
          <User className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
