'use client'

import Users from "@/app/components/Users";
import EventSlider from "@/app/components/events/EventSlider";
import StatsChart from "@/app/components/StatsChart";
import {useEffect, useState} from "react";
import {UserStats} from "@/app/lib/types";
import {getUsersStats, sendUsersStatsReport} from "@/app/lib/userActions";
import CustomButton from "@/app/components/forms/CustomButton";

export default function Home() {
  const [stats, setStats] = useState<UserStats[]>([]);

  const fetchStats =  async () => {
    getUsersStats().then((data)=>setStats(data));
  }

  useEffect(() => {
    fetchStats();
  }, []);



  return (
      <div className="space-y-5 3xl:space-y-20">
        <Users/>
        <EventSlider/>
        <div className="flex flex-col bg-gray-200 rounded-xl w-full space-y-10 3xl:space-y-32">
          <StatsChart stats={stats}/>
          <CustomButton label="Export data" className="max-w-2xl 3xl:text-4xl 3xl:rounded-full 3xl:p-10" onClick={()=>sendUsersStatsReport()}/>
        </div>

      </div>
  )
}
