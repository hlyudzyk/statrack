'use client'

import {useRouter} from "next/navigation";
import {useUser} from "@/app/lib/context/UserContext";
import { useState } from 'react';


const CentralBar = () => {
  const router = useRouter();
  const { user } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', onClick: () => router.push('/dashboard') },
    { label: 'Account', onClick: () => router.push(`/account/${user?.id}`) },
    { label: 'Events', onClick: () => router.push('/events') },
  ];

  return (
      <div className="relative">
        <div className="h-[48px] lg:h-[64px] flex items-center justify-between border rounded-full shadow-xl px-4">
          {/* Large screens: horizontal nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
                <div
                    key={item.label}
                    className="cursor-pointer h-[48px] lg:h-[64px] px-4 flex items-center rounded-full hover:bg-gray-100"
                    onClick={item.onClick}
                >
                  <p className="text-sm font-bold">{item.label}</p>
                </div>
            ))}
          </div>

          {/* Small screen: menu toggle icon */}
          <div className="lg:hidden p-2">
            <div
                className="cursor-pointer p-3 bg-lightbase rounded-full hover:bg-lightbase-hover transition text-white"
                onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <svg
                  viewBox="0 0 32 32"
                  style={{
                    display: 'block',
                    fill: 'none',
                    height: '16px',
                    width: '16px',
                    stroke: 'currentColor',
                    strokeWidth: 4,
                    overflow: 'visible',
                  }}
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
              >
                <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Dropdown menu for small screens */}
        {dropdownOpen && (
            <div className="lg:hidden absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg z-10">
              {navItems.map((item) => (
                  <div
                      key={item.label}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        item.onClick();
                        setDropdownOpen(false); // Close dropdown on click
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