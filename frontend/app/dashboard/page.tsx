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


  return(
      <div>
        <h3 className="text-2xl"> Dashboard </h3>
        <h4 className="text-xl">Welcome back, {user?.firstname + user?.lastname}!</h4>
        <div className="flex flex-row space-x-5">
          {statusOptions.filter(s => s.value !== user?.status).map((s) => (
              <CustomButton
                  key={s.value}
                  label={s.label}
                  variant={getButtonStyle(s.value)}
                  onClick={() => changeStatus(s.value)}
              />
          ))}
        </div>
        <div className="pt-10">
          <h3 className="text-2xl pb-5"> Your activity today </h3>
          <UserStatusTimeline/>
        </div>
      </div>
  )
}

export default Dashboard;