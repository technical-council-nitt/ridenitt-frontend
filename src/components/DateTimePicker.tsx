import React, { useState } from 'react';

interface TimeValue {
  hours: number;
  minutes: number;
  amPm: 'AM' | 'PM';
}

interface DateTimePickerProps {
  label: string;
  value: TimeValue;
  onChange: (value: TimeValue) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ label, value, onChange }) => {
  const [hours, setHours] = useState<number>(value.hours || 12);  // Ensuring hours are initialized properly
  const [minutes, setMinutes] = useState<number>(value.minutes || 0); // Ensuring minutes are initialized properly
  const [amPm, setAmPm] = useState<'AM' | 'PM'>(value.amPm || 'AM'); // Ensuring amPm is initialized properly

  // Handle the change and pass the updated value back to the parent
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
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setHours(Number(e.target.value))} // Correct typing
        >
          {[...Array(12).keys()].map((hour) => (
            <option key={hour} value={hour + 1}>{hour + 1}</option>
          ))}
        </select>
        <select
          className="p-2 rounded-lg bg-green-100"
          value={minutes}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setMinutes(Number(e.target.value))} // Correct typing
        >
          {[0, 15, 30, 45].map((minute) => (
            <option key={minute} value={minute}>
              {minute < 10 ? `0${minute}` : minute}
            </option>
          ))}
        </select>
        <select
          className="p-2 rounded-lg bg-green-100"
          value={amPm}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAmPm(e.target.value as 'AM' | 'PM')} // Correct typing
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
