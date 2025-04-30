'use client'

import Select  from "react-select";
import {JSX} from "react";

export enum UserStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  ON_BREAK = 'ON_BREAK',
}

export type SelectStatusValue = {
  label: string;
  value: UserStatus;
};

export const statusOptions: SelectStatusValue[] = [
  { label: 'Online', value: UserStatus.ONLINE },
  { label: 'Offline', value: UserStatus.OFFLINE },
  { label: 'On Break', value: UserStatus.ON_BREAK },
];

interface SelectStatusProps{
  value?:SelectStatusValue;
  onChange:(value:SelectStatusValue)=>void;
}


const SelectCountry:({value, onChange}: { value: any; onChange: any }) => JSX.Element = ({value,onChange})=>{

  return(
      <>
        <Select options={statusOptions} value={value} defaultValue={statusOptions[0]}
                onChange={(value)=>onChange(value as SelectStatusValue)}/>
      </>
  )
}

export default SelectCountry;