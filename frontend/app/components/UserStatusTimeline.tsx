'use client'

import {
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelineTime,
  TimelinePoint,
  TimelineTitle, TimelineBody,
} from "flowbite-react";
import {useUser} from "@/app/lib/context/UserContext";
import {useEffect, useState} from "react";
import {HiCalendar} from "react-icons/hi";
import {getClockingEventsByUser} from "@/app/lib/clockingEvents";
import {ClockingEvent} from "@/app/lib/types";
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import {UserStatus} from "@/app/components/forms/StatusSelect";

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
    return format(date, "EEEE, d MMMM yyyy 'о' HH:mm", { locale: uk });
  };

  const statusTranslations: Record<UserStatus, string> = {
    ONLINE: "Присутній/-я",
    ON_BREAK: "На перерві",
    OFFLINE: "Відсутній/-я",
  };

  useEffect(()=>{
    fetchTimeLine();
  },[])
  return (
      <Timeline>
        {timeline.map((t)=>
          (<TimelineItem key={t.id} color="red">
                <TimelinePoint icon={HiCalendar} />
                <TimelineContent>
            <TimelineTime>{formatDate(new Date(t.timestamp))}</TimelineTime>
            <TimelineTitle>{statusTranslations[user.status]}</TimelineTitle>
                  <TimelineBody>{t.comment}</TimelineBody>
          </TimelineContent>
        </TimelineItem>
          )
        )
        }
      </Timeline>
  );
}

export default UserStatusTimeline;