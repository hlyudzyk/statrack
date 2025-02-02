'use client'

import Select  from "react-select";
import {JSX} from "react";

export type RoleStatusValue = {
  label:string;
  value:string;
}

interface RoleStatusProps{
  value?:RoleStatusValue;
  onChange:(value:RoleStatusValue)=>void;
}

export const roleOptions: RoleStatusValue[] = [
  { label: 'Administrator', value: 'ADMIN' },
  { label: 'Teacher', value: 'TEACHER' },
  { label: 'Student', value: 'STUDENT' },
];

const RoleSelect:({value, onChange}: { value: any; onChange: any }) => JSX.Element = ({value,onChange})=>{
  return(
        <Select options={roleOptions} value={value} defaultValue={roleOptions[0]}
                onChange={(value)=>onChange(value as RoleStatusValue)}/>
  )
}

export default RoleSelect;