'use client'

import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import CustomButton from "@/app/components/forms/CustomButton";
import useSignupModal from "@/app/hooks/useSignupModal";
import UserCard from "@/app/components/UserCard";
import {User} from "@/app/lib/types";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const signupModal = useSignupModal();
  const fetchTeachers = async () => {
    try {
      const users: User[] = await apiService.get("api/v1/users");
      setUsers(users);
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

  if(!users.length){
    return (
          <div>No teachers found.</div>
    )
  }

  return (
      <div className="flex flex-col w-full bg-gray-200 rounded-xl">
        <div className="flex flex-row m-5 justify-between">
          <h2 className="text-2xl">Statrack users</h2>
        <CustomButton label={"Add teacher"} onClick={()=>signupModal.open()} className="max-w-32"/>
        </div>
        <div className="flex justify-start space-x-10 p-5">
          {users.map((t: User) => (
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
