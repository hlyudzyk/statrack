'use client'

import InputField from "@/app/components/forms/InputField";
import TextareaField from "@/app/components/forms/TextareaField";
import {Card, Datepicker, HR} from "flowbite-react";
import CustomButton from "@/app/components/forms/CustomButton";
import {useEffect, useState} from "react";
import {createEvent} from "@/app/lib/eventActions";
import {Event} from "@/app/lib/types"
import apiService from "@/app/services/apiService";
import TimePickerWithDuration from "@/app/components/forms/TimePickerWithDuration";
import {ImageUploader} from "@/app/components/forms/ImageUploader";

const EventsPage = () => {
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');

  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState("09:00");
  const [duration, setDuration] = useState<string | undefined>();

  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    await apiService.get(`api/v1/events`)
    .then((data)=>{setEvents(data)})
    .catch(
        (err)=>
        { console.log(err)}
    )
  }

  useEffect(()=>{
    fetchEvents();
  },[])

  const handleCreateEvent = async () => {
    const formData = new FormData();
    formData.append('header', header);
    formData.append('content', description);
    const eventDate = `${date.toISOString().split("T")[0]}T${time}`;
    formData.append('eventDate', eventDate);
    await createEvent(formData).then((e)=>setEvents([...events, e]));
  };

  return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl">Events</h3>
          <button
              onClick={() => setShowForm((prev) => !prev)}
              className="w-10 h-10 text-xl bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
          >
            {showForm ? "–" : "+"}
          </button>
        </div>

        {showForm && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <InputField
                    label="Header"
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                />
                <TextareaField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <ImageUploader onImageSelected={(file) => console.log("Selected image:", file)} />
              </div>
              <div>
                <label className="block mb-2">Select Date</label>
                <Datepicker value={date} onChange={setDate} />
                <TimePickerWithDuration
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    duration={duration}
                    onDurationChange={setDuration}
                />
              </div>

              <div className="mt-6 max-w-md">
                <CustomButton
                    label="Create Event"
                    onClick={handleCreateEvent}
                    disabled={header.trim() === ""}
                />
              </div>
            </div>
        )}
        <HR />
        <div>
          {events && (
              <div className="space-y-5">
                {events.map(e=>(
                    <Card key={e.id} imgSrc="/mountain.png" horizontal>
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {e.header}
                      </h5>

                      <div className="relative">
                        <div
                            className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400"
                               aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                               fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd"
                                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                  clipRule="evenodd"/>
                          </svg>
                        </div>
                        <p className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          00:00
                        </p>
                      </div>

                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {e.content}
                      </p>
                    </Card>
                ))}
              </div>
          )
          }
        </div>
      </div>
  );
};

export default EventsPage;

