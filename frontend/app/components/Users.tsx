'use client'

import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import CustomButton from "@/app/components/forms/CustomButton";
import useSignupModal from "@/app/hooks/useSignupModal";
import {getUserId} from "@/app/lib/actions";
import UserCard from "@/app/components/UserCard";


export type UserType = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  status: string;
  role: string;
  department: string;

}

export interface Authority {
  authority: string;
}

const Users = () => {
  const [teachers, setTeachers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const signupModal = useSignupModal();
  const [authorities,setAuthorities] = useState<Authority[]>()
  const fetchTeachers = async () => {
    try {
      const teachers: UserType[] = await apiService.get("api/v1/users");
      const userid = await getUserId();
      const authorities_res: Authority[] = await apiService.get(`api/v1/user-roles/${userid}/authorities`)
      setAuthorities(authorities_res)
      setTeachers(teachers);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if(!teachers.length){
    return (
          <div>No teachers found.</div>
    )
  }

  return (
      <div className="flex flex-col w-full bg-gray-200 rounded-xl">
        <div className="flex flex-row m-5 justify-between">
          <h2 className="text-2xl">Statrack users</h2>
          {authorities?.some((auth) => auth.authority === "ROLE_ADMIN")&&<CustomButton label={"Add teacher"} onClick={()=>signupModal.open()} className="max-w-32"/>}
        </div>
        <div className="flex justify-start space-x-10 p-5">
          {teachers.map((t: UserType) => (
                  <UserCard
                      key={t.id}
                      id={t.id}
                      firstname={t.firstname}
                      lastname={t.lastname}
                      email={t.email}
                      status={t.status}
                      role={t.role}
                      department={t.department}
                  />
              )
          )
          }
        </div>
      </div>
  );
}

export default Users;
