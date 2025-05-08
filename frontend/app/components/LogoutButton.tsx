'use client';

import {useRouter} from "next/navigation";
import { resetAuthCookies } from '../lib/actions'
import MenuLink from "@/app/components/navbar/MenuLink";
import {JSX} from "react";

const LogoutButton:() => JSX.Element = () => {
  const router = useRouter();
  const submitLogOut = async () => {
    await resetAuthCookies();
    router.push('/')
  }
  return (
      <button onClick={submitLogOut} className="p-2">
        <svg
            viewBox="0 0 24 24"
            fill="none"
            width={25}
            height={25}
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 block"
        >
          <path
              d="M12.9999 2C10.2385 2 7.99991 4.23858 7.99991 7C7.99991 7.55228 8.44762 8 8.99991 8C9.55219 8 9.99991 7.55228 9.99991 7C9.99991 5.34315 11.3431 4 12.9999 4H16.9999C18.6568 4 19.9999 5.34315 19.9999 7V17C19.9999 18.6569 18.6568 20 16.9999 20H12.9999C11.3431 20 9.99991 18.6569 9.99991 17C9.99991 16.4477 9.55219 16 8.99991 16C8.44762 16 7.99991 16.4477 7.99991 17C7.99991 19.7614 10.2385 22 12.9999 22H16.9999C19.7613 22 21.9999 19.7614 21.9999 17V7C21.9999 4.23858 19.7613 2 16.9999 2H12.9999Z"
              fill="currentColor"
          />
          <path
              d="M13.9999 11C14.5522 11 14.9999 11.4477 14.9999 12C14.9999 12.5523 14.5522 13 13.9999 13V11Z"
              fill="currentColor"
          />
          <path
              d="M5.71783 11 ... (truncated for brevity)"
              fill="currentColor"
          />
        </svg>
      </button>
  );
}
export default LogoutButton;