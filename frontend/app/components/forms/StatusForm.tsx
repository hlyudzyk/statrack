'use client'

import {statusOptions, UserStatus} from "@/app/components/forms/StatusSelect";
import CustomButton from "@/app/components/forms/CustomButton";
import {useEffect, useState} from "react";
import apiService from "@/app/services/apiService";
import {useUser} from "@/app/lib/context/UserContext";



const StatusForm = () => {
  const { user, setUser } = useUser();
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    console.log(user)
    if (user?.status) {
      setStatus(user.status);
    }
  }, [user]);

  const changeStatus = async (newStatus: string) => {

    setStatus(newStatus);
    const payload = {
      status: newStatus
    }
    await apiService.post(`api/v1/clocking-events/by-user-id/${user?.id}`, JSON.stringify(payload)).then(
        (data)=> {
          setUser({ ...user, status: data.status });
        }
    )
    .catch((err)=>{
      console.log(err);
    })

  }

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

  return (
      <div className="flex flex-row space-x-5">
        {statusOptions.filter(s=>s.value!==user?.status).map((s) => (
            <CustomButton
                key={s.value}
                label={s.label}
                variant={getButtonStyle(s.value)}
                onClick={() => changeStatus(s.value)}
            />
        ))}
      </div>
  )
}

export default StatusForm;