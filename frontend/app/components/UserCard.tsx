"use client";

import {Card, CustomFlowbiteTheme, Dropdown} from "flowbite-react";
import Image from "next/image";
import React from "react";
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

const roleIcons = {
  ADMIN: "/high_rank.png",
  TEACHER: "/low_rank.png",
  TV_VIEWER: "/low_rank.png",
};

const UserCard: React.FC<UserListCardProps> = ({id, firstname,lastname, email, status,role, department}) => {
  const router = useRouter();
  const statusColor = {
    ONLINE: 'bg-green-500',
    OFFLINE: 'bg-gray-400',
    ON_BREAK: 'bg-yellow-500',
  }[status] || 'bg-gray-300';

  return (
      <Card className="max-w-md">
        <div className="flex justify-end px-4 pt-4">
          <Dropdown inline label="">
            <Dropdown.Item>
              <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Edit
              </a>
            </Dropdown.Item>
            <Dropdown.Item>
              <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Export Data
              </a>
            </Dropdown.Item>
            <Dropdown.Item>
              <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Delete
              </a>
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center pb-10">
          <Image
              alt="Bonnie image"
              height="96"
              src="/no_pfp.png"
              width="96"
              className="mb-3 rounded-full shadow-lg"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white flex items-center gap-2">
            {firstname} {lastname}
            <span className={`h-3 w-3 rounded-full ${statusColor}`} title={status}></span>
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{email}</span>
          <div className="flex items-center space-x-2 pt-5">
            <Image src={roleIcons[role]} width={24} height={24} alt="Rank" />

            <span>{role}</span>
          </div>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <button
                onClick={() => {
                  router.push(`account/${id}`)
                }}
                className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              View
            </button>
            <a
                href={`mailto:${email}`}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              Message
            </a>
          </div>
        </div>
      </Card>
  );
}

export default UserCard;
