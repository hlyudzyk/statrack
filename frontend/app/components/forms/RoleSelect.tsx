'use client'

import Select  from "react-select";
import {JSX} from "react";
import {RoleStatusValue} from "@/app/lib/types";
import {roleOptions} from "@/app/lib/constants";



interface RoleStatusProps{
  value?:RoleStatusValue;
  onChange:(value:RoleStatusValue)=>void;
}

const RoleSelect:({value, onChange}: {onChange: any }) => JSX.Element = ({value,onChange})=>{
  return(
        <Select options={roleOptions} value={value} defaultValue={roleOptions[0]}
                onChange={(value)=>onChange(value as RoleStatusValue)}/>
  )
}

export default RoleSelect;