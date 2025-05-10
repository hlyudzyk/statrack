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
      <div className="space-y-5">
        <Users/>
        <EventSlider/>
        <div className="flex flex-col w-full bg-gray-200 rounded-xl">
          <div>
            <StatsChart stats={stats}/>
          </div>
          <CustomButton  label="Export data" className="pt-5" onClick={()=>sendUsersStatsReport()}/>
        </div>

      </div>
  )
}
