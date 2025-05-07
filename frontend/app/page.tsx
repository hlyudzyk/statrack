import Users from "@/app/components/Users";
import EventSlider from "@/app/components/events/EventSlider";

export default function Home() {
  return (
      <div className="space-y-5">
        <Users/>
        <EventSlider/>
      </div>
  )
}
