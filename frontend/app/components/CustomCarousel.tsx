import { useEffect, useRef, useState } from "react";
import EventSlide from "@/app/components/events/EventSlide";

export default function CustomCarousel({ items, interval = 8000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
        () => setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length),
        interval
    );
    return () => resetTimeout();
  }, [currentIndex, items.length]);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  if (!items || items.length === 0) return null;

  return (
      <div className="relative w-full overflow-hidden rounded-2xl shadow-xl">
        <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
              <div
                  key={index}
                  className="min-w-full flex justify-center items-center"
              >
                <EventSlide eventItem={item} />
              </div>
          ))}
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {items.map((_, index) => (
              <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
              />
          ))}
        </div>
      </div>
  );
}