'use client'

import Select  from "react-select";
import {JSX} from "react";
import {RoleStatusValue} from "@/app/lib/types";
import {roleOptions} from "@/app/lib/constants";



interface RoleStatusProps{
  value:RoleStatusValue;
  onChange:(value:RoleStatusValue)=>void;
  disabled: boolean;
}

const RoleSelect:({value, onChange}: {value: RoleStatusValue, onChange: any, disabled: boolean }) => JSX.Element = ({value,onChange, disabled})=>{
  return(
        <Select options={roleOptions} defaultValue={value} isDisabled={disabled}
                onChange={(value)=>onChange(value as RoleStatusValue)}/>
  )
}

export default RoleSelect;