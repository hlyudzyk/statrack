"use client";

import {Button, Card, Dropdown, Modal, ModalBody, ModalHeader} from "flowbite-react";
import Image from "next/image";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {HiOutlineExclamationCircle} from "react-icons/hi";

interface UserListCardProps {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  status: string;
  imageUrl: string | null;
  role: string;
  department?: string;
  onDeleteUser?: (id: string) => void; // Deletion handler
}
const roleIcons = {
  ADMIN: "/high_rank.png",
  TEACHER: "/low_rank.png",
  TV_VIEWER: "/low_rank.png",
};
const UserCard: React.FC<UserListCardProps> = ({
                                                 id,
                                                 firstname,
                                                 lastname,
                                                 email,
                                                 status,
                                                 imageUrl,
                                                 role,
                                                 department,
                                                 onDeleteUser
                                               }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const statusColor = {
    ONLINE: "bg-green-500",
    OFFLINE: "bg-gray-400",
    ON_BREAK: "bg-yellow-500",
  }[status] || "bg-gray-300";

  const handleDelete = () => {
    if (onDeleteUser) onDeleteUser(id);
    setShowModal(false);
  };

  return (
      <>
        <Card className="w-full max-w-sm 2xl:max-w-md 3xl:max-w-2xl overflow-hidden p-4 2xl:p-6 3xl:p-10 shadow-lg rounded-2xl bg-white dark:bg-gray-900">
          <div className="flex justify-end">
            <Dropdown inline label="">
              <Dropdown.Item onClick={() => setShowModal(true)}>
              <span className="block px-4 py-2 text-base 2xl:text-xl 3xl:text-3xl text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-600 dark:hover:text-white">
                Delete
              </span>
              </Dropdown.Item>
            </Dropdown>
          </div>

          <div className="flex flex-col items-center pb-10 gap-4 2xl:gap-6 3xl:gap-8">
            <Image
                alt="User image"
                height={128}
                width={128}
                src={imageUrl ? `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}` : `/no_pfp.png`}
                className="rounded-full shadow-lg object-cover w-[96px] h-[96px] 2xl:w-[128px] 2xl:h-[128px] 3xl:w-[160px] 3xl:h-[160px]"
            />

            <h5 className="text-2xl 2xl:text-2xl 3xl:text-5xl font-semibold text-gray-900 dark:text-white flex items-center gap-4">
              {firstname} {lastname}
              <span className={`h-4 w-4 2xl:h-5 2xl:w-5 3xl:h-6 3xl:w-6 rounded-full ${statusColor}`} title={status}></span>
            </h5>

            <span className="text-base 2xl:text-xl 3xl:text-4xl text-gray-500 dark:text-gray-400 text-center px-4 truncate" title={email}>
            {email}
          </span>

            <div className="flex items-center gap-3 pt-4">
              <Image src={roleIcons[role]} width={32} height={32} alt="Role icon" className="2xl:w-[40px] 3xl:w-[48px]" />
              <span className="text-xl 2xl:text-xl 3xl:text-5xl">{role}</span>
            </div>

            <div className="mt-6 flex gap-4 2xl:gap-6 3xl:gap-8">
              <button
                  onClick={() => router.push(`account/${id}`)}
                  className="inline-flex items-center rounded-lg bg-cyan-700 px-6 py-3 2xl:px-8 2xl:py-4 3xl:px-10 3xl:py-5 text-base 2xl:text-xl 3xl:text-4xl font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                View
              </button>
              <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-3 2xl:px-8 2xl:py-4 3xl:px-10 3xl:py-5 text-base 2xl:text-xl 3xl:text-4xl font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                Message
              </a>
            </div>
          </div>
        </Card>

        {/* Modal */}
        <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
          <ModalHeader />
          <ModalBody>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this user?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDelete}>
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </>
  );
};
export default UserCard;
