import Link from "next/link";
import Image from "next/image";
import React from "react";
import UserNav from "@/app/components/navbar/UserNav";
import {getUserId} from "@/app/lib/actions";

const Navbar = async () =>{
  const userid = await getUserId()

  return(<nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
    <div className="max-w-[1500px] mx-auto px-6">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="flex flex-row items-center">

            <Image
                src="/favicon.ico"
                alt="Statify logo"
                width={30}
                height={30}
            />
            <h2 className="text-xl ml-3 text-blue-400 font-semibold">Statify</h2>
          </div>

        </Link>

        <div className="flex space-x-6">
        </div>
        <div className="flex items-center space-x-6">
          <UserNav userId={userid}/>
        </div>
      </div>
    </div>
  </nav>)
}

export default Navbar;