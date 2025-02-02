'use client';

import {useRouter} from "next/navigation";
import { resetAuthCookies } from '../lib/actions'
import MenuLink from "@/app/components/navbar/MenuLink";
import {JSX} from "react";

const LogoutButton:() => JSX.Element = () => {
  const router = useRouter();
  const submitLogOut = async () => {
    resetAuthCookies();
    router.push('/')
  }
  return (<MenuLink label="Log out" onClick={submitLogOut}/>)
}
export default LogoutButton;