import { useEffect, useState } from "react";
import {getAllEvents} from "@/app/lib/eventActions";
import CustomCarousel from "@/app/components/CustomCarousel";

const EventSlider = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAllEvents(0, 10);

        if (!Array.isArray(response)) {
          console.log(response)
          throw new Error("Invalid response format");
        }

        setEvents(response);
      } catch (err: any) {
        console.error("Failed to fetch events:", err);
        setError("Could not load events");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>{error}</div>;
  if (events.length === 0) return <div>No events found</div>;

  return (
      <div className="h-156 sm:h-64 xl:h-80 3xl:h-[800px] mx-5 lg:my-32">
        <CustomCarousel items={events} />
      </div>
  );
};

export default EventSlider;
