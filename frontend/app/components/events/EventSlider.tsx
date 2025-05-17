
"use client";

import { Carousel  } from "flowbite-react";
import {useEffect, useState} from "react";
import {Event} from "@/app/lib/types"
import EventSlide from "@/app/components/events/EventSlide"
import {getAllEvents} from "@/app/lib/eventActions";
import CustomCarousel from "@/app/components/CustomCarousel";

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
      <div className="h-156 sm:h-64 xl:h-80 3xl:h-[800px] mx-5">
        <CustomCarousel items={events}/>
      </div>
  );
}

export default EventSlider;