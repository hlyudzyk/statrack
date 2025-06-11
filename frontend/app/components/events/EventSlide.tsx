import Image from "next/image";
import {format} from "date-fns";
import {uk} from "date-fns/locale";
const EventSlide = ({ eventItem }) => {

  const formatDate = (date: Date) => {
    return format(date, "EEEE, d MMMM yyyy 'о' HH:mm", { locale: uk });
  };
  return (
      <div className="flex flex-col lg:flex-row w-full h-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden 3xl:gap-12 3xl:p-10">
        {/* Image Section */}
        <div className="relative w-full lg:w-4/12 min-h-[300px] 3xl:min-h-[600px]">
          <Image
              src={
                eventItem.imageUrl
                    ? eventItem.imageUrl
                    : "/mountain.png"
              }
              alt="Event"
              fill
              className="object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-6/12 flex flex-col justify-between px-6 py-4 3xl:px-16 3xl:py-10">
          <div>
            <h5 className="text-2xl 3xl:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              {eventItem.header}
            </h5>
            <p className="mt-4 text-base 3xl:text-4xl text-gray-600">
              {eventItem.content}
            </p>
          </div>

          <p className="mt-4 text-sm 3xl:text-3xl text-gray-500 dark:text-gray-400">
            {formatDate(new Date(eventItem.eventDate))}
          </p>
        </div>

        {/* Creator Section */}
        <div className="hidden lg:flex lg:flex-col lg:w-2/12 items-center justify-center p-6 3xl:p-10">
          <Image
              alt="Creator avatar"
              height={96}
              width={96}
              src={
                eventItem.createdBy.avatarUrl || "/no_pfp.png"
              }
              className="mb-4 rounded-full shadow-lg w-24 h-24 3xl:w-40 3xl:h-40 object-cover"
          />
          <h5 className="mb-1 text-xl 3xl:text-4xl font-medium text-gray-900 dark:text-white text-center">
            {eventItem.createdBy.firstname} {eventItem.createdBy.lastname}
          </h5>
          <span className="text-sm 3xl:text-2xl text-gray-500 dark:text-gray-400">
          {eventItem.createdBy.role}
        </span>
        </div>
      </div>
  );
};

export default EventSlide;
