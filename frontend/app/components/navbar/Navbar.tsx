import Link from "next/link";
import Image from "next/image";
import React from "react";
import CentralBar from "@/app/components/navbar/CentralBar";
import LogoutButton from "@/app/components/LogoutButton";
import {getUserId} from "@/app/lib/actions";

const Navbar = async () =>{
  const userId = await getUserId();
  return(<nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
    <div className="max-w-[2400px] mx-auto px-6">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center space-x-3">
            <Image
                src="/favicon_next.ico"
                alt="Statrack logo"
                width={40}
                height={40}
                className="w-8 sm:w-10 md:w-12 lg:w-16 xl:w-24"
            />
            <span
                className="text-xl sm:text-2xl md:text-3xl lg:text-2xl 3xl:text-5xl font-semibold text-blue-500">
            Інформаційна дошка ЦК
        </span>
          </div>

        </Link>
        {userId &&
            (<>
                  <div className="flex space-x-6 3xl:hidden">
                    <CentralBar userId={userId}/>
                  </div>
                  <div>
                    <LogoutButton/>
                  </div>
                </>

            )
        }
      </div>
    </div>
  </nav>)
}

export default Navbar;