'use client'

import Users from "@/app/components/Users";
import EventSlider from "@/app/components/events/EventSlider";
import StatsChart from "@/app/components/StatsChart";
import {useEffect, useState} from "react";
import {UserStats} from "@/app/lib/types";
import {getUsersStats, sendUsersStatsReport} from "@/app/lib/userActions";
import CustomButton from "@/app/components/forms/CustomButton";
import {useUser} from "@/app/lib/context/UserContext";
import {HR} from "flowbite-react";

export default function Home() {
  const [stats, setStats] = useState<UserStats[]>([]);
  const { user, setUser } = useUser();

  const isAdmin = () => {
    return user.role==="ADMIN";
  }
  const fetchStats =  async () => {
    getUsersStats().then((data)=>setStats(data));
  }

  useEffect(() => {
    fetchStats();
  }, []);



  return (
      <div className="space-y-16 3xl:space-y-20">
        <Users/>
        <EventSlider/>
        <HR/>
        {isAdmin()&&stats.length>0&&
        <div className="flex flex-col bg-gray-200 rounded-xl w-full space-y-10 3xl:space-y-32 3xl:hidden">
          <StatsChart stats={stats}/>
          <CustomButton label="Експортувати дані" className="max-w-2xl 3xl:text-4xl 3xl:rounded-full 3xl:p-10" onClick={()=>sendUsersStatsReport()}/>
        </div>}

      </div>
  )
}
