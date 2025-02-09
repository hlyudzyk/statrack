'use client'

import {JSX} from "react";

interface CustomButtonProps{
  label:string;
  className?:string;
  onClick: ()=>void;
}
const CustomButton: ({label, onClick, className}: {
  label: any;
  onClick: any;
  className: any
}) => JSX.Element = ({label,onClick, className})=> {
  return(<div className={`w-full py-4 bg-lightbase hover:bg-lightbase-hover text-white text-center
            rounded-xl transition cursor-pointer ${className}`}
            onClick={onClick}>
    {label}
  </div>)
}

export default CustomButton;