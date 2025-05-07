import {
  Button,
  Timeline,
  TimelineBody,
  TimelineContent,
  TimelineItem,
  TimelinePoint,
  TimelineTime,
  TimelineTitle,
} from "flowbite-react";
import apiService from "@/app/services/apiService";
import {useUser} from "@/app/lib/context/UserContext";
import {useEffect, useState} from "react";
import {HiCalendar} from "react-icons/hi";

const UserStatusTimeline = () => {
  const {user, setUser } = useUser()
  const [timeline, setTimeline] = useState<TimelineItem[]>([])

  const fetchTimeLine = async (page = 0, size = 10) => {
    try {
      const data = await apiService.get(`api/v1/clocking-events/by-user-id/${user?.id}?page=${page}&size=${size}`);
      setTimeline(data.content);
    } catch (err) {
      console.log(err);
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
    fetchTimeLine();
  },[])
  return (
      <Timeline>
        {timeline.slice(0,10).map((t)=>
          (<TimelineItem key={t.id} color="red">
                <TimelinePoint icon={HiCalendar} />
                <TimelineContent>
            <TimelineTime>{formatDate(new Date(t.timestamp))}</TimelineTime>
            <TimelineTitle>{t.status}</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
          )
        )
        }
      </Timeline>
  );
}

export default UserStatusTimeline;