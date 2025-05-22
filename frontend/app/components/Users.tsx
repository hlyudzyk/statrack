'use client'

import { useEffect, useState } from "react";
import CustomButton from "@/app/components/forms/CustomButton";
import useSignupModal from "@/app/hooks/useSignupModal";
import UserCard from "@/app/components/UserCard";
import {User} from "@/app/lib/types";
import {deleteUserAction, getAllUsers} from "@/app/lib/userActions";
import {useUser} from "@/app/lib/context/UserContext";

const Users = () => {
  const {user, setUser} = useUser();
  const [users, setUsers] = useState<User[]>([]);
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

  const deleteUser = async (userId: string) => {
    const isSuccess = await deleteUserAction(userId);
    if (isSuccess) {
      setUsers((prevUsers) => prevUsers.filter(user => user.id !== userId));
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
      <div className="flex flex-col w-full bg-gray-200 rounded-xl 3xl:rounded-3xl">
        <div className="flex m-5 justify-between 3xl:p-16" >
          <h2 className="text-2xl 3xl:text-6xl font-semibold">Statrack users</h2>
          { user?.role==="ADMIN" &&
            (<CustomButton label={"Add user"} onClick={() => signupModal.open()}
                        className="max-w-32"/>)
          }
        </div>
        <div className="flex flex-wrap gap-5 p-5">
          {users.map((user: User) => (
              <div key={user.id} className="basis-[250px] max-w-[100%] grow">
                <UserCard
                    id={user.id}
                    firstname={user.firstname}
                    lastname={user.lastname}
                    email={user.email}
                    status={user.status}
                    imageUrl={user.avatarUrl}
                    role={user.role}
                    department={user.department}
                    onDeleteUser={()=>deleteUser(user.id)}
                />
              </div>
          ))}
        </div>
      </div>
  );
}

export default Users;
