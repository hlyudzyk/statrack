import React from 'react';

interface AuthorityCheckboxProps {
  authority: string;
  isSelected: boolean;
  onChange: (authority: string) => void;
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
        {authority}
      </label>
  );
};

export default AuthorityCheckbox;
