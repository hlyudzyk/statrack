import React, { useState } from 'react';

const durations = ['30 minutes', '1 hour', '2 hours'];

const TimePickerWithDuration = ({
                                  value,
                                  onChange,
                                  min = '09:00',
                                  max = '18:00',
                                  duration,
                                  onDurationChange,
                                }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
  duration?: string;
  onDurationChange?: (duration: string) => void;
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDurationClick = (d: string) => {
    onDurationChange?.(d);
    setDropdownOpen(false);
  };

  return (
      <div className="max-w-[13rem] mx-auto">
        <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select time:
        </label>
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

          <button
              type="button"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="border-s-0 shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            {duration || 'Duration'}
            <svg className="w-2.5 h-2.5 ms-2.5" viewBox="0 0 10 6" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>
          </button>

          {isDropdownOpen && (
              <div
                  className="absolute top-full right-0 z-10 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-36 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {durations.map((d) => (
                      <li key={d}>
                        <button
                            type="button"
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => handleDurationClick(d)}
                        >
                          {d}
                        </button>
                      </li>
                  ))}
                </ul>
              </div>
          )}
        </div>
      </div>
  );
};

export default TimePickerWithDuration;
