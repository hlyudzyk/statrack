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
import Image from 'next/image';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

const EventsPage = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState("09:00");
  const [image, setImage] = useState<File | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filterKeyword, setFilterKeyword] = useState<string>('');

  useEffect(() => {
    setIsHydrated(true);
    fetchEvents();
  }, []);

  const fetchEvents = async (
      page = 0,
      size = 20,
      filterDate?: string,
      filterKeyword?: string
  ) => {
    try {
      const data = await getAllEvents(page, size, filterDate, filterKeyword);
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateEvent = async () => {
    if (!date) return;

    const formData = new FormData();
    formData.append('header', header);
    formData.append('content', description);
    const eventDate = `${date.toISOString().split("T")[0]}T${time}`;
    formData.append('eventDate', eventDate);
    if (image) {
      formData.append("image", image);
    }

    const newEvent = await createEvent(formData);
    setEvents([...events, newEvent]);

    // Clear form
    setImage(null);
    setHeader("");
    setDescription("");
    setDate(new Date());
    setTime("09:00");
  };


  const formatDate = (date: Date) => {
    return format(date, "EEEE, d MMMM yyyy 'о' HH:mm", { locale: uk });
  };

  if (!isHydrated) return null; // prevent hydration errors from SSR

  return (
      <div>
        <div className="flex items-center justify-between mb-6 m-5">
          <h3 data-testid="events-header" className="text-2xl">Події</h3>
          <button
              data-testid="expand-button"
              onClick={() => setShowForm((prev) => !prev)}
              className="w-10 h-10 text-xl bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
          >
            {showForm ? "–" : "+"}
          </button>
        </div>

        {showForm && (
            <div className="gap-6 p-5">
              <div>
                <InputField
                    dataTestId="header-input"
                    label="Заголовок"
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                />
                <TextareaField
                    label="Опис"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex flex-row p-10">
                  <Datepicker
                      language="uk"
                      value={date}
                      onChange={setDate}
                  />
                  <TimePickerWithDuration
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <ImageUploader
                    onImageSelected={(file) => setImage(file)}
                    withDropBox={true}
                />
                <div className="mt-6 max-w-md">
                  <CustomButton
                      data-testid="create-event-button"
                      label="Створити подію"
                      onClick={handleCreateEvent}
                      disabled={header.trim() === ""}
                  />
                </div>
              </div>

            </div>
        )}

        <HR/>

        <div className="flex gap-4 flex-col items-center mb-4 p-5">
          <div className="flex flex-row items-center gap-x-5">
            <InputField
                label="Пошук"
                value={filterKeyword}
                onChange={(e) => setFilterKeyword(e.target.value)}
            />
            <span className="space-y-5">
            <p className="text-sm"> По даті</p>
            <Datepicker
                language="uk"
                value={filterDate ?? new Date()}
                onChange={(date) => setFilterDate(date)}
            />
            </span>
          </div>
          <CustomButton
              label="Застосувати фільтр"
              className="max-w-xl"
              onClick={() =>
                  fetchEvents(
                      0,
                      20,
                      filterDate?.toISOString().split("T")[0],
                      filterKeyword
                  )
              }
          />
          <CustomButton
              label="Очистити фільтр"
              className="max-w-xl"
              onClick={() => {
                setFilterDate(null);
                setFilterKeyword("");
                fetchEvents(0, 20);
              }}
          />
        </div>

        <div>
          <div className="space-y-5 p-6" key={events.length}>
            {events.map((e) => (
                <Card
                    className="rounded-2xl"
                    key={e.id}
                    horizontal
                    renderImage={() => (
                        <Image
                            src={
                              e.imageUrl
                                  ? `${process.env.NEXT_PUBLIC_API_URL}${e.imageUrl}`
                                  : '/default_event.png'
                            }
                            width={200}
                            height={100}
                            alt="event image"
                        />
                    )}
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
            ))}
          </div>
        </div>
      </div>
  );
};

export default EventsPage;