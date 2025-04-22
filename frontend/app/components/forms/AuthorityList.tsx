import React, { useEffect, useState } from 'react';
import AuthorityCheckbox from './AuthorityCheckbox';

interface AuthorityListProps {
  authorities: string[];
}

const ALL_AUTHORITIES = ["ROLE_ADMIN", "Admin permission"];

const AuthorityList: React.FC<AuthorityListProps> = ({ authorities }) => {
  const [selectedAuthorities, setSelectedAuthorities] = useState<Set<string>>(new Set());

  useEffect(() => {
    const initialSelected = new Set<string>();
    authorities.forEach((auth) => {
      if (ALL_AUTHORITIES.includes(auth)) {
        initialSelected.add(auth);
      }
    });
    setSelectedAuthorities(initialSelected);
  }, [authorities]);

  const handleCheckboxChange = (authority: string) => {
    setSelectedAuthorities((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(authority)) {
        newSelected.delete(authority);
      } else {
        newSelected.add(authority);
      }
      return newSelected;
    });
  };

  const isAuthoritySelected = (authority: string) => {
    return selectedAuthorities.has(authority);
  };

  return (
      <div>
        <h2>Select Authorities</h2>
        {authorities.map((auth) => (
            <AuthorityCheckbox
                key={auth}
                authority={auth}
                isSelected={isAuthoritySelected(auth)}
                onChange={handleCheckboxChange}
            />
        ))}
      </div>
  );
};

export default AuthorityList;
