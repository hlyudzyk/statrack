'use client'

import {useUser} from "@/app/lib/context/UserContext";
import {statusOptions, UserStatus} from "@/app/components/forms/StatusSelect";
import CustomButton from "@/app/components/forms/CustomButton";
import {useEffect, useState} from "react";
import {changeUserStatus} from "@/app/lib/userActions";
import UserStatusTimeline from "@/app/components/UserStatusTimeline";

const Dashboard = () => {
  const {user, setUser} = useUser();
  const [status, setStatus] = useState<string>("");


  useEffect(() => {
    console.log(user)
    if (user?.status) {
      setStatus(user.status);
    }
  }, [user]);

  const getButtonStyle = (status: UserStatus) => {
    switch (status){
      case UserStatus.OFFLINE:
        return "danger";
      case UserStatus.ON_BREAK:
        return "warning";
      case UserStatus.ONLINE:
        return "success";
    }
  }

  const changeStatus = async (newStatus: string) => {

    setStatus(newStatus);
    const payload = {
      status: newStatus
    }

    if(user==null) return;
    await changeUserStatus(user.id, JSON.stringify(payload))
    .then((data)=>setUser({...user, status: data.status}))
    .catch((err)=>{
      console.log(err);
    })

  }


  return (
      <div className="space-y-6 bg-gray-200 w-full p-12 rounded-2xl">
        <h3 className="text-3xl font-semibold" data-testid="dashboard-header">Dashboard</h3>
        <h4 className="text-xl text-gray-700"  data-testid="welcome-text">Welcome back, {user?.firstname} {user?.lastname}! You are now {user?.status.toLowerCase()}.</h4>
        <h4 className="text-md text-gray-700">What's your status?</h4>

        <div className="flex flex-wrap gap-4 justify-start">
          {statusOptions.filter(s => s.value !== user?.status).map((s) => (
              <CustomButton
                  key={s.value}
                  label={s.label}
                  variant={getButtonStyle(s.value)}
                  onClick={() => changeStatus(s.value)}
                  className="w-auto min-w-[120px] max-w-2xl"
              />
          ))}
        </div>

        <div className="pt-12 md:pl-10">
          <h3 className="text-2xl font-semibold pb-6">Your activity</h3>
          <UserStatusTimeline/>
        </div>
      </div>
  );

}

export default Dashboard;