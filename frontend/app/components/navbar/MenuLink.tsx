'use client';

import {JSX} from "react";

interface MenuLinkProps{
  label:string;
  onClick:()=>void;
}

const MenuLink: ({label, onClick}: { label: any; onClick: any }) => JSX.Element = ({label,onClick}) => {
    return(
        <div className="px-5 py-4 cursor-pointer hover:bg-gray-100 text-gray-800 transition" onClick={onClick}>
          {label}
        </div>
    )
}
export default MenuLink;