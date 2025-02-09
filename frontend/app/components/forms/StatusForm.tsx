'use client'

import StatusSelect, {SelectStatusValue} from "@/app/components/forms/StatusSelect";
import CustomButton from "@/app/components/forms/CustomButton";
import {useState} from "react";
import {getUserId} from "@/app/lib/actions";
import apiService from "@/app/services/apiService";


export const statusOptions: SelectStatusValue[] = [
  { label: 'Online', value: 'ONLINE' },
  { label: 'Offline', value: 'OFFLINE' },
  { label: 'On Break', value: 'ON_BREAK' },
];


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

  return (
      <div className="flex flex-row space-x-5">
        {statusOptions.map((s)=> (

            <CustomButton label={`${s.label}`} onClick={() => changeStatus(s.value)}/>

        ))
        }

        {/*<StatusSelect onChange={(st) => setStatus(st.value)}/>*/}
        {/*<CustomButton label="Change status" onClick={() => {*/}
        {/*  changeStatus()*/}
        {/*}}/>*/}
      </div>
  )
}

export default StatusForm;