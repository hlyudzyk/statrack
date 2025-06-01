import React, { useState } from 'react';

const TimePickerWithDuration = ({
                                  value,
                                  onChange,
                                  min = '09:00',
                                  max = '18:00',
                                }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
      <div className="max-w-[13rem] mx-auto">
        <div className="flex relative">
          <input
              type="time"
              id="time"
              min={min}
              max={max}
              value={value}
              onChange={onChange}
              required
              className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />

        </div>
      </div>
  );
};

export default TimePickerWithDuration;
