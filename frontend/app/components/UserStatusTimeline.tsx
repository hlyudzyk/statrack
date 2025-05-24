'use client'

import {
  Timeline,
  TimelineContent,
  TimelineItem,
    TimelineTime,
  TimelinePoint,
  TimelineTitle,
} from "flowbite-react";
import {useUser} from "@/app/lib/context/UserContext";
import {useEffect, useState} from "react";
import {HiCalendar} from "react-icons/hi";
import {getClockingEventsByUser} from "@/app/lib/clockingEvents";
import {ClockingEvent} from "@/app/lib/types";

const UserStatusTimeline = () => {
  const {user, setUser } = useUser()
  const [timeline, setTimeline] = useState<ClockingEvent[]>([])

  const fetchTimeLine = async (page = 0, size = 10) => {
    try {
      if(user===null){return;}
      const data = await getClockingEventsByUser(user?.id, page,size);
      setTimeline(data);
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