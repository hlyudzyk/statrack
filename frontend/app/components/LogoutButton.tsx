'use client';

import {useRouter} from "next/navigation";
import { resetAuthCookies } from '../lib/actions'
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
            className="w-6 h-6 block fill-none h-25 w-25 2xl:h-[48px] 2xl:w-[48px] stroke-gray-900 overflow-visible"
        >
            <path d="M17 7.908H8v4h9V14l4-4.043-4-4.043v1.994z"/>
            <path
                d="M13.919 6.908V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v15.908a2 2 0 0 0 2 2h9.919a2 2 0 0 0 2-2v-5h-6.87v-6z"/>
        </svg>
      </button>
  );
}
export default LogoutButton;