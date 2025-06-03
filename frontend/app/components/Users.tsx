'use client'

import { useEffect, useState } from "react";
import CustomButton from "@/app/components/forms/CustomButton";
import useSignupModal from "@/app/hooks/useSignupModal";
import UserCard from "@/app/components/UserCard";
import {User} from "@/app/lib/types";
import {deleteUserAction, getAllUsers} from "@/app/lib/userActions";
import {useUser} from "@/app/lib/context/UserContext";
import {UserSkeleton} from "@/app/components/skeletons";

const Users = () => {
  const { user, setUser } = useUser();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const signupModal = useSignupModal();

  const isAdmin = () => {
    return user.role==="ADMIN";
  }

  const fetchUsers = async () => {
    try {
      const users: User[] = await getAllUsers();
      console.log(users)
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
    fetchUsers();

    const interval = setInterval(() => {
      fetchUsers();
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
        <div className="flex flex-wrap gap-5 p-5">
          {Array.from({ length: 6 }).map((_, index) => (
              <UserSkeleton key={index} />
          ))}
        </div>
    );
  }

  if (!users.length) {
    return <div>No teachers found.</div>;
  }

  return (
      <div className="flex flex-col w-full bg-gray-200 rounded-xl 3xl:rounded-3xl ">
        <div className="flex m-5 justify-between 3xl:p-16">
          <h2 className="text-2xl 3xl:text-6xl font-semibold" data-testid="users-header">
            Список викладачів
          </h2>
          {isAdmin() && (
              <CustomButton
                  label={"Додати викладача"}
                  onClick={() => signupModal.open()}
                  className="max-w-sm 3xl:hidden"
                  data-testid="add-user-button"
              />
          )}
        </div>
        <div className="flex flex-wrap gap-5 p-5 justify-center">
          {users.map((user: User) => (
              <div key={user.id} className="basis-[250px] 3xl:basis-[500px] max-w-[100%] grow">
                <UserCard
                    user={user}
                    onDeleteUser={()  => deleteUser(user.id)}
                    superuserMode={isAdmin()}
                />
              </div>
          ))}
        </div>
      </div>
  );
};


export default Users;
