'use client'

import Select  from "react-select";

export type SelectStatusValue = {
  label:string;
  value:string;
}

interface SelectStatusProps{
  value?:SelectStatusValue;
  onChange:(value:SelectStatusValue)=>void;
}

export const statusOptions: SelectStatusValue[] = [
  { label: 'Online', value: 'ONLINE' },
  { label: 'Offline', value: 'OFFLINE' },
  { label: 'On Break', value: 'on_break' },
];

const SelectCountry:({value, onChange}: { value: any; onChange: any }) => JSX.Element = ({value,onChange})=>{

  return(
      <>
        <Select options={statusOptions} value={value} defaultValue={statusOptions[0]}
                onChange={(value)=>onChange(value as SelectStatusValue)}/>
      </>
  )
}

export default SelectCountry;