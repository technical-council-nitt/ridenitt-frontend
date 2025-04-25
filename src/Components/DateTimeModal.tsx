"use client"

import { useMemo, useState } from "react"

interface DateTimeData {
  date: number
  month: number
  year: number
  startHour: number
  startMinute: number
  startAmPm: 'AM' | 'PM'
  endHour: number
  endMinute: number
  endAmPm: 'AM' | 'PM'
}

interface DateTimeModalProps {
  isOpen: boolean
  initialValue: DateTimeData
  onClose: () => void
  onConfirm: (data: DateTimeData) => void
}

export function DateTimeModal({
  isOpen,
  initialValue,
  onClose,
  onConfirm
}: DateTimeModalProps) {
  const [selectedDate, setSelectedDate] = useState(initialValue.date)
  const [startHour, setStartHour] = useState(initialValue.startHour.toString())
  const [startMinute, setStartMinute] = useState(
    initialValue.startMinute.toString().padStart(2, "0")
  )
  const [startAmPm, setStartAmPm] = useState<'AM' | 'PM'>(initialValue.startAmPm)
  
  const [endHour, setEndHour] = useState(initialValue.endHour.toString())
  const [endMinute, setEndMinute] = useState(
    initialValue.endMinute.toString().padStart(2, "0")
  )
  const [endAmPm, setEndAmPm] = useState<'AM'| 'PM'>(initialValue.endAmPm)

  const [currentMonth, setCurrentMonth] = useState(initialValue.month)
  const [currentYear, setCurrentYear] = useState(initialValue.year)

  const today = new Date()
  const todayDate = today.getDate()
  const todayMonth = today.getMonth()
  const todayYear = today.getFullYear()
  
  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate()
  }, [currentMonth, currentYear])

  // First day of the month (0=Sunday, 1=Monday, ...)
  const firstDay = useMemo(
    () => new Date(currentYear, currentMonth, 1).getDay(),
    [currentYear, currentMonth]
  )
  // Shift so Monday=0, Tuesday=1, ..., Sunday=6
  const blankCount = (firstDay + 6) % 7

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
  
  // Generate zero-based day indices
  const days = Array.from({ length: daysInMonth }, (_, i) => i)

  const handleConfirm = () => {
    onConfirm({
      date: selectedDate + 1,
      month: currentMonth,
      year: currentYear,
      startHour: Number(startHour),
      startMinute: Number(startMinute),
      startAmPm,
      endHour: Number(endHour),
      endMinute: Number(endMinute),
      endAmPm,
    })
    onClose()
  }

  const handleHourChange = (type: "start" | "end", value: number) => {
    if (type === "start") setStartHour(value.toString())
    else setEndHour(value.toString())
  }
  const handleMinuteChange = (type: "start" | "end", value: number) => {
    if (type === "start") setStartMinute(value.toString())
    else setEndMinute(value.toString())
  }
  const handleAmPmChange = (type: "start" | "end", value: 'AM' | 'PM') => {
    if (type === "start") setStartAmPm(value)
    else setEndAmPm(value)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-[40px] p-6 z-50 text-sm overflow-auto">
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-center">Your Ride, Your Way.</h2>

          {/* Calendar Section */}
          <div className="space-y-4">
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
              {['M','T','W','T','F','S','S'].map((day, i) => (
                <div key={i} className="text-gray-500 text-xs">{day}</div>
              ))}

              {/* Blank cells for alignment */}
              {Array.from({ length: blankCount }).map((_, i) => (
                <div key={`blank-${i}`} />
              ))}

              {/* Days */}
              {days.map((day) => {
                const dateObj = new Date(currentYear, currentMonth, day + 1)
                const isPastDate = dateObj < new Date(todayYear, todayMonth, todayDate)

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    disabled={isPastDate}
                    className={
                      `
                        rounded-full w-8 h-8 mx-auto flex items-center justify-center 
                        ${isPastDate ? "text-gray-300" : "text-gray-700"} 
                        ${selectedDate === day ? "bg-green-600 text-white" : ""}
                      `
                    }
                  >
                    {day + 1}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Time Range Section */}
          <div className="space-y-4">
            {/* Start Time */}
            <div className="space-y-2">
              <h3 className="text-gray-500">Earliest Departure Time</h3>
              <div className="flex gap-4">
                <select
                  className="relative w-1/5 px-2 py-1 border-2 border-gray-300 rounded-full"
                  value={startHour}
                  onChange={(e) => handleHourChange("start", Number(e.target.value))}
                >
                  {[...Array(12).keys()].map((i) => (
                    <option key={i} value={i+1}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <select
                  className="w-1/4 p-2 border-2 border-gray-300 rounded-full"
                  value={startMinute}
                  onChange={(e) => handleMinuteChange("start", Number(e.target.value))}
                >
                  {['00','15','30','45'].map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
                <select
                  className="w-1/4 p-2 border-2 border-gray-300 rounded-full"
                  value={startAmPm}
                  onChange={(e) => handleAmPmChange("start", e.target.value as any)}
                >
                  {['AM','PM'].map((ampm) => (
                    <option key={ampm} value={ampm}>
                      {ampm}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* End Time */}
            <div className="space-y-2">
              <h3 className="text-gray-500">Latest Departure Time</h3>
              <div className="flex gap-4">
                <select
                  className="w-1/4 p-2 border-2 border-gray-300 rounded-full"
                  value={endHour}
                  onChange={(e) => handleHourChange("end", Number(e.target.value))}
                >
                  {[...Array(12).keys()].map((i) => (
                    <option key={i} value={i+1}>
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <select
                  className="w-1/4 p-2 border-2 border-gray-300 rounded-full"
                  value={endMinute}
                  onChange={(e) => handleMinuteChange("end", Number(e.target.value))}
                >
                  {['00','15','30','45'].map((minute) => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
                <select
                  className="w-1/4 p-2 border-2 border-gray-300 rounded-full"
                  value={endAmPm}
                  onChange={(e) => handleAmPmChange("end", e.target.value as any)}
                >
                  {['AM','PM'].map((ampm) => (
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
