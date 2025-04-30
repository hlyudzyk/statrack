'use client'

import {useRouter} from "next/navigation";

const SearchFilters = () => {
  const router = useRouter();

  return(
      <div className="h-[48px] lg:h-[64px] flex flex-row items-center justify-between
      border rounded-full shadow-xl" onClick={()=>{}}>
        <div className="hidden lg:block">
          <div className="flex flex-row items-center justify-between">
            <div
                className="cursor-pointer h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100"
                onClick={()=> {
                  router.push('/dashboard');
                }}>
              <p className="text-xm font-bold">Dashboard</p>
            </div>
            <div
                className="cursor-pointer h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100"
                onClick={()=> {
                  router.push('/account');
                }}>
              <p className="text-xm font-bold">Account</p>
            </div>
            <div
                className="cursor-pointer h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100"
                onClick={()=> {
                  router.push('/inbox');
                }}>
              <p className="text-xm font-bold">Inbox</p>
            </div>
        </div>
        </div>
        <div className="p-2">
          <div className="cursor-pointer p-4 bg-lightbase rounded-full hover:bg-lightbase-hover transition text-white">
            <svg viewBox="0 0 32 32"
                 style={{display:'block',fill:'none',height:'16px',width:'16px',stroke:'currentColor',strokeWidth:4,
              overflow:'visible'}}
                 aria-hidden="true" role="presentation" focusable="false">
              <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
            </svg>
          </div>
        </div>
      </div>
  )
}

export default SearchFilters;