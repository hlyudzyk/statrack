import { useState } from "react";
import {format} from "date-fns";



interface TimePickerPanelProps {
  value?: string;
  onChange: (value: string) => void;
  bookedTimes?: { scheduledTime: string; status: string }[];

}

const TimePickerPanel = ({ value, onChange, bookedTimes = [] }: TimePickerPanelProps) => {
  const [isTimetableOpen, setIsTimetableOpen] = useState(false);
  const today = new Date();
  const datePart = format(today, "yyyy-MM-dd");

  const times = [
    { id: "9-am", label: "09:00" },
    { id: "9-30-am", label: "09:30" },
    { id: "10-am", label: "10:00" },
    { id: "10-30-am", label: "10:30" },
    { id: "11-am", label: "11:00" },
    { id: "11-30-am", label: "11:30" },
    { id: "12-am", label: "12:00" },
    { id: "12-30-pm", label: "12:30" },
    { id: "13-pm", label: "13:00" },
    { id: "13-30-pm", label: "13:30" },
    { id: "14-pm", label: "14:00" },
    { id: "14-30-pm", label: "14:30" },
  ];

  const bookedSet = new Set(
      bookedTimes.map(b => format(new Date(b.scheduledTime), "HH:mm"))
  );

  return (
      <div className="border-gray-200 dark:border-gray-800 flex sm:flex-row flex-col sm:space-x-5 rtl:space-x-reverse">
        <div className="relative w-full sm:max-w-[15rem]">
          <button
              type="button"
              onClick={() => setIsTimetableOpen((prev) => !prev)}
              className="inline-flex items-center w-full py-2 px-5 me-2 justify-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <svg
                className="w-4 h-4 text-gray-800 dark:text-white me-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
              <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
              />
            </svg>
            {value}
          </button>

          {isTimetableOpen && (
              <ul
                  id="timetable"
                  className="absolute z-50 mt-2 bg-white dark:bg-gray-800 p-2 border border-gray-200 rounded-lg shadow-lg grid grid-cols-2 gap-2 w-full"
              >                {times.map(({id, label}) => {
                const isDisabled = bookedSet.has(label);
                return (
                    <li key={id}>
                      <input
                          type="radio"
                          id={id}
                          name="timetable"
                          className="hidden peer"
                          disabled={isDisabled}
                          checked={value === id}
                          onChange={() => {onChange(label);setIsTimetableOpen(false)}}
                      />
                      <label
                          htmlFor={id}
                          className={`inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center border rounded-lg cursor-pointer
                    ${isDisabled
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white text-blue-600 border-blue-600 hover:bg-blue-500 hover:text-white peer-checked:bg-blue-600 peer-checked:text-white"}
                  `}
                      >
                        {label}
                      </label>
                    </li>
                );
              })}
              </ul>
          )}
        </div>
      </div>
  );
};

export default TimePickerPanel;
