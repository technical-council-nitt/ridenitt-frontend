"use client"

import { useState } from "react"

interface DateTimeModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (date: string, startTime: string, endTime: string) => void
  initialDate?: string
  initialStartTime?: string
  initialEndTime?: string
}

export function DateTimeModal({
  isOpen,
  onClose,
  onConfirm,
  initialDate,
  initialStartTime,
  initialEndTime,
}: DateTimeModalProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate || "02")
  const [startHour, setStartHour] = useState(initialStartTime ? initialStartTime.split(":")[0] : "07")
  const [startMinute, setStartMinute] = useState(initialStartTime ? initialStartTime.split(":")[1].split(" ")[0] : "30")
  const [startAmPm, setStartAmPm] = useState(initialStartTime?.split(" ")[1] || "PM")
  
  const [endHour, setEndHour] = useState(initialEndTime ? initialEndTime.split(":")[0] : "07")
  const [endMinute, setEndMinute] = useState(initialEndTime ? initialEndTime.split(":")[1].split(" ")[0] : "45")
  const [endAmPm, setEndAmPm] = useState(initialEndTime?.split(" ")[1] || "PM")

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()) // Start with the current month
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate() // Get days in the current month
  const today = new Date().getDate()

  // Function to navigate between months
  const handleMonthChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else if (direction === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };
  

  // Generate days of the week for the current month
  const days = Array.from({ length: daysInMonth }, (_, i) => String(i + 1).padStart(2, "0"))

  const handleConfirm = () => {
    const startTime = `${startHour}:${startMinute} ${startAmPm}`
    const endTime = `${endHour}:${endMinute} ${endAmPm}`
    onConfirm(selectedDate, startTime, endTime)
    onClose()
  }

  const handleTimeChange = (type: "start" | "end", field: "hour" | "minute" | "amPm", value: string) => {
    if (type === "start") {
      if (field === "hour") setStartHour(value)
      if (field === "minute") setStartMinute(value)
      if (field === "amPm") setStartAmPm(value)
    } else {
      if (field === "hour") setEndHour(value)
      if (field === "minute") setEndMinute(value)
      if (field === "amPm") setEndAmPm(value)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-[40px] p-6 z-50 max-h-[80vh] overflow-auto">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Your Ride, Your Way.</h2>

          {/* Calendar Section */}
          <div className="space-y-4">
            <h3 className="text-gray-500">Ride Date</h3>
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleMonthChange("prev")}
                className="text-gray-500 text-xl"
              >
                &#60;
              </button>
              <span className="text-xl font-semibold">
                {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
              </span>
              <button
                onClick={() => handleMonthChange("next")}
                className="text-gray-500 text-xl"
              >
                &#62;
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
                <div key={day} className="text-gray-500 text-sm">
                  {day}
                </div>
              ))}
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  disabled={Number.parseInt(day) < today}
                  className={`
                    rounded-full w-8 h-8 flex items-center justify-center
                    ${Number.parseInt(day) < today ? "text-gray-300" : "text-gray-700"}
                    ${selectedDate === day ? "bg-green-600 text-white" : ""}
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time Range Section */}
          <div className="space-y-4">
            {/* Start Time */}
            <div className="space-y-2">
              <h3 className="text-gray-500">Ride Start Time</h3>
              <div className="flex gap-4">
                <select
                  className="w-1/4 p-2 border-2 border-gray-300 rounded-full"
                  value={startHour}
                  onChange={(e) => handleTimeChange("start", "hour", e.target.value)}
                >
                  {[...Array(12).keys()].map((i) => (
                    <option key={i} value={String(i + 1).padStart(2, "0")}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <select
                  className="w-1/4 p-2 border-2 border-gray-300 rounded-full"
                  value={startMinute}
                  onChange={(e) => handleTimeChange("start", "minute", e.target.value)}
                >
                  {["00", "15", "30", "45"].map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
                <select
                  className="w-1/4 p-2 border-2 border-gray-300 rounded-full"
                  value={startAmPm}
                  onChange={(e) => handleTimeChange("start", "amPm", e.target.value)}
                >
                  {["AM", "PM"].map((ampm) => (
                    <option key={ampm} value={ampm}>
                      {ampm}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* End Time */}
            <div className="space-y-2">
              <h3 className="text-gray-500">Ride End Time</h3>
              <div className="flex gap-4">
                <select
                  className="w-1/4 p-2 border-2 border-gray-300 rounded-full"
                  value={endHour}
                  onChange={(e) => handleTimeChange("end", "hour", e.target.value)}
                >
                  {[...Array(12).keys()].map((i) => (
                    <option key={i} value={String(i + 1).padStart(2, "0")}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <select
                  className="w-1/4 p-2 border-2 border-gray-300 rounded-full"
                  value={endMinute}
                  onChange={(e) => handleTimeChange("end", "minute", e.target.value)}
                >
                  {["00", "15", "30", "45"].map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
                <select
                  className="w-1/4 p-2 border-2 border-gray-300 rounded-full"
                  value={endAmPm}
                  onChange={(e) => handleTimeChange("end", "amPm", e.target.value)}
                >
                  {["AM", "PM"].map((ampm) => (
                    <option key={ampm} value={ampm}>
                      {ampm}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="w-full py-4 bg-green-600 text-white rounded-full text-lg font-semibold"
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  )
}
