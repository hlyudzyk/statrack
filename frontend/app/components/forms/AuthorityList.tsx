import React, { useEffect, useState } from 'react';
import AuthorityCheckbox from './AuthorityCheckbox';
import { Authority } from '@/app/components/Teachers';

interface AuthorityListProps {
  authorities: Authority[];
}

const ALL_AUTHORITIES = ["ROLE_ADMIN", "Admin permission"];

const AuthorityList: React.FC<AuthorityListProps> = ({ authorities }) => {
  const [selectedAuthorities, setSelectedAuthorities] = useState<Set<string>>(new Set());

  useEffect(() => {
    const initialSelected = new Set<string>();
    authorities.forEach((auth) => {
      if (ALL_AUTHORITIES.includes(auth.authority)) {
        initialSelected.add(auth.authority);
      }
    });
    setSelectedAuthorities(initialSelected);
  }, [authorities]);

  const handleCheckboxChange = (authority: Authority) => {
    setSelectedAuthorities((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(authority.authority)) {
        newSelected.delete(authority.authority);
      } else {
        newSelected.add(authority.authority);
      }
      return newSelected;
    });
  };

  const isAuthoritySelected = (authority: Authority) => {
    return selectedAuthorities.has(authority.authority);
  };

  return (
      <div>
        <h2>Select Authorities</h2>
        {authorities.map((auth) => (
            <AuthorityCheckbox
                key={auth.authority}
                authority={auth}
                isSelected={isAuthoritySelected(auth)}
                onChange={handleCheckboxChange}
            />
        ))}
      </div>
  );
};

export default AuthorityList;
