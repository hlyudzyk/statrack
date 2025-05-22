"use client";

import { Footer } from "flowbite-react";
import {useRouter} from "next/navigation";
import Image from "next/image";

const FooterComponent = () => {
  const router = useRouter();
  return (
      <Footer className="bg-white border-t w-full mt-10 3xl:pt-64">
        <div className="max-w-[2400px] mx-auto w-full px-6 sm:px-10 md:px-16 lg:px-20 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* Brand */}
            <div className="flex items-center space-x-3">
              <Image
                  src="/favicon_next.ico"
                  alt="Statrack logo"
                  width={40}
                  height={40}
                  className="w-8 sm:w-10 md:w-12 lg:w-16 xl:w-24"
              />
              <span className="text-xl sm:text-2xl md:text-3xl 2xl:text-xl 3xl:text-5xl font-semibold text-blue-500">
          Statrack
        </span>
            </div>

            {/* Link Group */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 md:gap-8 lg:gap-12 xl:gap-16 text-sm sm:text-base md:text-lg 3xl:text-6xl 2xl:text-xl text-gray-600">
              <button onClick={() => router.push("/about")} className="hover:text-blue-500">About</button>
              <button onClick={() => router.push("/privacy-policy")} className="hover:text-blue-500">Privacy Policy</button>
              <button onClick={() => router.push("/licensing")} className="hover:text-blue-500">Licensing</button>
              <button onClick={() => router.push("/contacts")} className="hover:text-blue-500">Contact</button>
            </div>
          </div>

          <div className="mt-8 border-t pt-6 text-center text-xs sm:text-sm md:text-xl 3xl:text-5xl text-gray-400">
            © 2025 Statrack™. All rights reserved.
          </div>
        </div>
      </Footer>
  );
}

export default FooterComponent;