'use client'

import {useRouter} from "next/navigation";
import {JSX, useState} from 'react';
import Image from "next/image";

interface CentralBarProps {
  userId: string;
}

const CentralBar: React.FC<CentralBarProps>  = ({userId}) => {
  const router = useRouter();
  //const { user } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { label: 'Активність  ', onClick: () => router.push('/dashboard') },
    { label: 'Акаунт', onClick: () => router.push(`/account/${userId}`) },
    { label: 'Події', onClick: () => router.push('/events') },
  ];

  return (
      <div className="relative">
        {/* Wrapper only visible on large screens */}
        <div
            className="hidden lg:flex h-[64px] 3xl:h-[148px] items-center justify-between border rounded-full shadow-xl px-4">
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
                <div
                    key={item.label}
                    className="cursor-pointer h-[64px] 3xl:h-[148px] px-4 3xl:px-16 flex items-center rounded-full hover:bg-gray-100"
                    onClick={item.onClick}
                >
                  <p className="text-sm 3xl:text-4xl font-bold">{item.label}</p>
                </div>
            ))}
          </div>
        </div>

        <div className="lg:hidden flex justify-end">
          <div
              className="cursor-pointer p-3 bg-lightbase rounded-full hover:bg-lightbase-hover transition text-white"
              onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <Image src="/menu-button.png" alt="Menu" width={24} height={24}/>
          </div>
        </div>

        {dropdownOpen && (
            <div className="lg:hidden fixed top-[72px] left-0 w-full bg-white rounded-b-xl shadow-lg z-50">
              {navItems.map((item) => (
                  <div
                      key={item.label}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        item.onClick();
                        setDropdownOpen(false);
                      }}
                  >
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
              ))}
            </div>
        )}

      </div>
  );
};

export default CentralBar;