'use client'

import StatusSelect, {statusOptions, UserStatus} from "@/app/components/forms/StatusSelect";
import CustomButton from "@/app/components/forms/CustomButton";
import {useState} from "react";
import {getUserId} from "@/app/lib/actions";
import apiService from "@/app/services/apiService";


const StatusForm = () => {
  const [status, setStatus] = useState<string>("");

  const changeStatus = async (newStatus: string) => {
    const id = await getUserId();
    setStatus(newStatus);
    const payload = {
      status: newStatus
    }
    await apiService.post(`api/v1/clocking-events/by-user-id/${id}`, JSON.stringify(payload)).then(
        (res)=>{}
    )
    .catch((err)=>{
      console.log(err)
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
        {statusOptions.map((s) => (
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