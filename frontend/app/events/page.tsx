'use client'

import InputField from "@/app/components/forms/InputField";
import TextareaField from "@/app/components/forms/TextareaField";
import {Card, Datepicker, HR} from "flowbite-react";
import CustomButton from "@/app/components/forms/CustomButton";
import {useEffect, useState} from "react";
import {createEvent, getAllEvents} from "@/app/lib/eventActions";
import {Event} from "@/app/lib/types"
import TimePickerWithDuration from "@/app/components/forms/TimePickerWithDuration";
import {ImageUploader} from "@/app/components/forms/ImageUploader";
import Image from 'next/image'

const EventsPage = () => {
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState("09:00");
  const [duration, setDuration] = useState<string | undefined>();
  const [image, setImage] = useState<File | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);


  const fetchEvents = async (page = 0, size = 20) => {
    try {
      const data = await getAllEvents(page,size);
      setEvents(data.content);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date: Date) => {
    const formatted = date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    return `${formatted.split(", ")[0]}, ${formatted.split(", ")[1]} at ${formatted.split(", ")[2]}`;
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
    formData.append("image", image);

    await createEvent(formData).then((e)=>setEvents([...events, e]));

    setImage(null);
    setHeader("");
    setDescription("");
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
                <ImageUploader onImageSelected={(file) => setImage(file)} withDropBox={true} />
              </div>
              <div className="flex flex-row">
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
              <div className="space-y-5" >
                {events.map(e=>(
                    <Card key={e.id} horizontal
                          renderImage={() =>
                              <Image
                                  src={e.imageUrl?`${process.env.NEXT_PUBLIC_API_URL}${e.imageUrl}`:'/mountain.png'}
                                  width={200}
                                  height={100}
                                     alt="image 1" />}
                    >
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {e.header}
                      </h5>

                      <div className="relative">
                        <p className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                          {formatDate(new Date(e.eventDate))}
                        </p>
                      </div>

                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {e.content}
                      </p>
                    </Card>
                )
                )
                }
              </div>
          )
          }
        </div>
      </div>
  );
};

export default EventsPage;
