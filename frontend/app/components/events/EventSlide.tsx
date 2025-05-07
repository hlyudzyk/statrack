import Image from "next/image";

export const EventSlide = ({ eventItem }) => {
  return (
      <div
          className="flex w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Image (30%) */}
        <div className="w-4/12 relative">
          <Image
              src={
                eventItem.imageUrl
                    ? `${process.env.NEXT_PUBLIC_API_URL}${eventItem.imageUrl}`
                    : "/mountain.png"
              }
              alt="Event"
              fill
              className="object-cover"
          />
        </div>

        <div className="w-6/12 flex flex-col p-6 justify-between">
          <div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {eventItem.header}
            </h5>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{eventItem.content}</p>
          </div>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            {new Date(eventItem.eventDate).toLocaleString("en-US", {
              weekday: "short",
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="w-2/12 flex p-10 flex-col items-center pb-10">
          <Image
              alt="Bonnie image"
              height="96"
              src="/no_pfp.png"
              width="96"
              className="mb-3 rounded-full shadow-lg"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        </div>
      </div>
  );
};
export default EventSlide;