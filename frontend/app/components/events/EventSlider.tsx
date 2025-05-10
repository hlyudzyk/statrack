
"use client";

import { Carousel  } from "flowbite-react";
import {useEffect, useState} from "react";
import {Event} from "@/app/lib/types"
import apiService from "@/app/services/apiService";
import EventSlide from "@/app/components/events/EventSlide"
import {getAllEvents} from "@/app/lib/eventActions";

const EventSlider = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async (page = 0, size = 10) => {
    try {
      const data = await getAllEvents(page,size);
      setEvents(data.content);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
      <div className="h-156 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slideInterval={1000}>
          {events.map((item) => (
              <EventSlide key={item.id} eventItem={item} />
          ))}
        </Carousel>
      </div>
  );
}

export default EventSlider;