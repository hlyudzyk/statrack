import React from 'react';
import {Authority} from "@/app/components/Users";

interface AuthorityCheckboxProps {
  authority: Authority;
  isSelected: boolean;
  onChange: (authority: Authority) => void;
}

const AuthorityCheckbox: React.FC<AuthorityCheckboxProps> = ({ authority, isSelected, onChange }) => {
  const handleCheckboxChange = () => {
    onChange(authority);
  };

  return (
      <label>
        <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
        />
        {authority.authority}
      </label>
  );
};

export default AuthorityCheckbox;
