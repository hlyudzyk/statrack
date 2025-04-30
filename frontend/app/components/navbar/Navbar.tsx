import Link from "next/link";
import Image from "next/image";
import React from "react";
import SearchFilters from "@/app/components/navbar/SearchFilters";
import LogoutButton from "@/app/components/LogoutButton";
import {getCurrentUser} from "@/app/lib/userActions";

const Navbar = async () =>{
  const user = await getCurrentUser();
  return(<nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
    <div className="max-w-[1500px] mx-auto px-6">
      <div className="flex justify-between items-center">
        <Link href="/">
          <div className="flex flex-row items-center">

            <Image
                src="/favicon_next.ico"
                alt="Statify logo"
                width={30}
                height={30}
            />
            <h2 className="text-xl ml-3 text-blue-400 font-semibold">Statify</h2>
          </div>

        </Link>
        {user &&
              (<>
              <div className="flex space-x-6">
                <SearchFilters/>
              </div>
              <div className="flex items-center space-x-6">
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