'use client'
import React from "react";

interface TeacherProps{
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  status: string;
  role: string;
  department: string;
}

const Teacher: React.FC<TeacherProps> = ({id, firstname,lastname, email, status,role, department}) => {
  return(
    <div className="flex flex-row gap-x-3">
      <p>{id}</p>
      <p>{firstname}</p>
      <p>{lastname}</p>
      <p>{email}</p>
      <p>{status}</p>
      <p>{role}</p>
      <p>{department}</p>
    </div>
  )
}

export default Teacher