'use client'

import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import Teacher from "@/app/components/Teacher";
import CustomButton from "@/app/components/forms/CustomButton";
import useSignupModal from "@/app/hooks/useSignupModal";
import {getUserId} from "@/app/lib/actions";

export type TeacherType = {
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

const Teachers = () => {
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const signupModal = useSignupModal();
  const [authorities,setAuthorities] = useState<Authority[]>()
  const fetchTeachers = async () => {
    try {
      const teachers: TeacherType[] = await apiService.get("api/v1/users");
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

  return (
      <div className="flex flex-row gap 5">
        <div>
          {teachers.length > 0 ? (
              teachers.map((t: TeacherType) => (
                  <Teacher
                      id={t.id}
                      firstname={t.firstname}
                      lastname={t.lastname}
                      email={t.email}
                      status={t.status}
                      role={t.role}
                      department={t.department}
                  />
              ))
          ) : (
              <div>No teachers found.</div>
          )}
        </div>
        {authorities?.some((auth) => auth.authority === "ROLE_ADMIN")&&<CustomButton label={"Add teacher"} onClick={()=>signupModal.open()} className="max-w-32"/>}

      </div>
  );
}

export default Teachers;
