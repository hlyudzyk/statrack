import { useEffect, useState } from "react";
import {getAllEvents} from "@/app/lib/eventActions";
import CustomCarousel from "@/app/components/CustomCarousel";
import {Event} from "@/app/lib/types"
import {EventSkeleton} from "@/app/components/skeletons";

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

  if (loading) {
    return (
        <div className="p-6 justify-center">
              <EventSkeleton/>
        </div>
    );
  }

  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (events.length === 0) return <div className="p-6">No events found</div>;

  return (
      <div className="h-156 sm:h-64 xl:h-80 3xl:h-[800px] mx-5 lg:my-32">
        <CustomCarousel items={events} />
      </div>
  );
};

export default EventSlider;
