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

  const fetchTimeLine = async () => {
    await apiService.get(`api/v1/clocking-events/by-user-id/${user?.id}`)
    .then((data)=>{setTimeline(data)})
    .catch(
        (err)=>
        { console.log(err)}
    )
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
            <TimelineTime>{t.timestamp}</TimelineTime>
            <TimelineTitle>{t.status}</TimelineTitle>
            <TimelineBody>
              {t.id}
            </TimelineBody>
          </TimelineContent>
        </TimelineItem>
          )
        )
        }
      </Timeline>
  );
}

export default UserStatusTimeline;