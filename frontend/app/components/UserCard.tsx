"use client";

import {Button, Card, Dropdown, Modal, ModalBody, ModalHeader} from "flowbite-react";
import Image from "next/image";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {User} from "@/app/lib/types";

interface UserListCardProps {
  user: User;
  onDeleteUser?: (id: string) => void;
  superuserMode: boolean;
}

const roleIcons = {
  ADMIN: "/high_rank.png",
  TEACHER: "/low_rank.png",
  TV_VIEWER: "/low_rank.png",
};

const UserCard: React.FC<UserListCardProps> = ({ user, onDeleteUser,superuserMode= false }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    if (onDeleteUser) onDeleteUser(user.id);
    setShowModal(false);
  };

  return (
      <>
        <Card className="w-full h-full max-w-sm 2xl:max-w-md 3xl:max-w-2xl p-6 3xl:p-10 shadow-lg rounded-2xl bg-white dark:bg-gray-900 min-h-[500px] flex flex-col justify-between">
          <div className="flex justify-end 3xl:hidden">
            <Dropdown inline label="⋮">
              <Dropdown.Item onClick={() => router.push(`account/${user.id}`)}>Перегляд</Dropdown.Item>
              <Dropdown.Item>
                <a href={`mailto:${user.email}`}>Повідомлення</a>
              </Dropdown.Item>
              {superuserMode&&(<Dropdown.Item onClick={() => setShowModal(true)}>
                <span className="text-red-600 dark:text-red-400">Видалити</span>
              </Dropdown.Item>)}
            </Dropdown>
          </div>

          <div className="flex flex-col items-center gap-6 grow justify-center">
            <Image
                alt="Аватар користувача"
                height={160}
                width={160}
                src={user.avatarUrl ? `${process.env.NEXT_PUBLIC_API_URL}${user.avatarUrl}` : `/no_pfp.png`}
                className={`rounded-full shadow-lg object-cover w-[128px] h-[128px] 2xl:w-[160px] 2xl:h-[160px] 3xl:w-[192px] 3xl:h-[192px] ring-8 ring-offset-2
    ${
                    user.status === "ONLINE"
                        ? "ring-green-500"
                        : user.status === "ON_BREAK"
                            ? "ring-yellow-500"
                            : "ring-gray-400"
                }`}
            />
            <h5 className="text-xl md:text-2xl 3xl:text-6xl font-semibold text-gray-900 dark:text-white text-center">
              {user.firstname} {user.lastname}
            </h5>

            <p className="text-xl md:text-2xl 3xl:text-5xl text-gray-600 dark:text-gray-300 text-center px-2 min-h-[3rem]">
              {user.statusComment || <span className="opacity-0">---</span>}
            </p>

            <div
                className="text-xl 3xl:hidden text-gray-400 dark:text-gray-500 text-center truncate w-full px-2 min-h-[1.5rem]">
              {user.email || <span className="opacity-0">placeholder</span>}
            </div>

            <div className="3xl:hidden flex items-center gap-2 text-xl text-gray-400 dark:text-gray-500 pt-4">
              <Image src={roleIcons[user.role]} width={28} height={28} alt="Role icon"/>
              <span>{user.role}</span>
            </div>
          </div>
        </Card>


        {/* Confirm delete modal */}
        <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
        <ModalHeader />
          <ModalBody>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Ви впевнені що хочете видалити користувача?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDelete}>
                 Підтвердити
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  Скасувати
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </>
  );
};

export default UserCard;