'use client'

import StatusSelect from "@/app/components/forms/StatusSelect";
import CustomButton from "@/app/components/forms/CustomButton";
import {useState} from "react";
import {getUserId} from "@/app/lib/actions";
import apiService from "@/app/services/apiService";

const StatusForm = () => {
  const [status, setStatus] = useState<string>("");

  const changeStatus = async () => {
    const id = await getUserId()

    try {
      console.log("ID:" + id)
      await apiService.post(`api/v1/status-records/${id}?status=${status}`, null);

    } catch (error) {
    }
  }

  return (
      <div>
        <StatusSelect onChange={(st) => setStatus(st.value)}/>
        <CustomButton label="Change status" onClick={() => {
          changeStatus()
        }}/>
      </div>
  )
}

export default StatusForm;