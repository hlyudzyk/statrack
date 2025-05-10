'use client'

import { useEffect, useState } from "react";
import apiService from "@/app/services/apiService";
import CustomButton from "@/app/components/forms/CustomButton";
import useSignupModal from "@/app/hooks/useSignupModal";
import UserCard from "@/app/components/UserCard";
import {User, UserStats} from "@/app/lib/types";
import {getAllUsers, getUsersStats} from "@/app/lib/userActions";
import StatsChart from "@/app/components/StatsChart";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const signupModal = useSignupModal();
  const fetchTeachers = async () => {
    try {
      const users: User[] = await getAllUsers();
      setUsers(users);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats =  async () => {
    getUsersStats().then((data)=>setStats(data));
  }

  useEffect(() => {
    fetchTeachers();
    fetchStats();

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
          <CustomButton label={"Add user"} onClick={() => signupModal.open()}
                        className="max-w-32"/>
        </div>
        <div className="flex flex-wrap gap-5 p-5">
          {users.map((user: User) => (
              <div key={user.id} className="flex-[1_1_250px] max-w-sm">
                <UserCard
                    id={user.id}
                    firstname={user.firstname}
                    lastname={user.lastname}
                    email={user.email}
                    status={user.status}
                    role={user.role}
                    department={user.department}
                />
              </div>
          ))}
        </div>
        <StatsChart stats={stats}/>

      </div>
  );
}

export default Users;
