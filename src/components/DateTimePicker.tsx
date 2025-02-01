
import React, { useState } from 'react';

const DateTimePicker = ({ label, value, onChange }: {
    label: string,
    value: {
        hours: number,
        minutes: number,
        amPm: 'AM' | 'PM'
    },
    onChange: any
}) => {
  const [hours, setHours] = useState(value?.hours || 12);
  const [minutes, setMinutes] = useState(value?.minutes || 0);
  const [amPm, setAmPm] = useState(value?.amPm || 'AM');

  const handleChange = () => {
    onChange({ hours, minutes, amPm });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <label className="text-white font-medium">{label}</label>
      <div className="flex items-center space-x-4">
        <select
          className="p-2 rounded-lg bg-green-100"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        >
          {[...Array(12).keys()].map((hour) => (
            <option key={hour} value={hour + 1}>{hour + 1}</option>
          ))}
        </select>
        <select
          className="p-2 rounded-lg bg-green-100"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        >
          {[0, 15, 30, 45].map((minute) => (
            <option key={minute} value={minute}>{minute < 10 ? `0${minute}` : minute}</option>
          ))}
        </select>
        <select
          className="p-2 rounded-lg bg-green-100"
          value={amPm}
          onChange={(e) => setAmPm(e.target.value)}
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
      <button
        onClick={handleChange}
        className="bg-green-500 text-white p-2 rounded-lg mt-4"
      >
        {`${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`}
      </button>
    </div>
  );
};

export default DateTimePicker;
