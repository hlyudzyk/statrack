'use client'

import React, {useState} from "react";
import Image from "next/image";
import CustomButton from "@/app/components/forms/CustomButton";
import {useRouter} from "next/navigation";


interface UserListCardProps{
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  status: string;
  role: string;
  department: string;
}

const UserListCard: React.FC<UserListCardProps> = ({id, firstname,lastname, email, status,role, department}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);


  const getStatusClass = () => {
    if(status==="ONLINE"){
      return "text-green-500"
    }
    return "text-red-500";
  }

  return(
      <div className="space-y-3 flex flex-row rounded-xl bg-gray-100 p-10 m-3 w-[95%] justify-stretch justify-items-start items-center"
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}>
        <div className="justify-items-center space-y-5">
          <Image src="/no_pfp.png" alt="User image" width={50} height={50}/>
          <p><b>{firstname} {lastname}</b></p>
        </div>
        <p className="p-3 bg-blue-200 rounded-xl">Email: <b>{email}</b></p>
        <p className="p-3 bg-blue-200 rounded-xl">Role: <b>{role}</b></p>
        <p className={getStatusClass()}><b>{status}</b></p>
        {isHovered &&
          <CustomButton label="Edit" onClick={()=>{router.push(`/account/${id}`)}} className=" w-[60px]"/>}
      </div>
  )
}

export default UserListCard