import { useState } from "react";


interface TimePickerPanelProps{
  value?:string;
  onChange:(string)=>void;
}


const TimePickerPanel = () => {
  const [isTimetableOpen, setIsTimetableOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState("12-am");

  const times = [
    { id: "10-am", label: "10:00 AM" },
    { id: "10-30-am", label: "10:30 AM" },
    { id: "11-am", label: "11:00 AM" },
    { id: "11-30-am", label: "11:30 AM" },
    { id: "12-am", label: "12:00 AM" },
    { id: "12-30-pm", label: "12:30 PM" },
    { id: "1-pm", label: "01:00 PM" },
    { id: "1-30-pm", label: "01:30 PM" },
    { id: "2-pm", label: "02:00 PM" },
    { id: "2-30-pm", label: "02:30 PM" },
    { id: "3-pm", label: "03:00 PM" },
    { id: "3-30-pm", label: "03:30 PM" },
  ];

  return (
      <div className="pt-5 border-t border-gray-200 dark:border-gray-800 flex sm:flex-row flex-col sm:space-x-5 rtl:space-x-reverse">

        <div className="sm:ms-7 sm:ps-5 sm:border-s border-gray-200 dark:border-gray-800 w-full sm:max-w-[15rem] mt-5 sm:mt-0">
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
            Pick a time
          </button>

          {isTimetableOpen && (
              <ul id="timetable" className="grid w-full grid-cols-2 gap-2 mt-5">
                {times.map(({ id, label }) => (
                    <li key={id}>
                      <input
                          type="radio"
                          id={id}
                          name="timetable"
                          className="hidden peer"
                          checked={selectedTime === id}
                          onChange={() => setSelectedTime(id)}
                      />
                      <label
                          htmlFor={id}
                          className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white dark:peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                      >
                        {label}
                      </label>
                    </li>
                ))}
              </ul>
          )}
        </div>
      </div>
  );
}
export default TimePickerPanel;
