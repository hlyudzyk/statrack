'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {User} from "@/app/lib/types"

const UserContext = createContext<User | null>(null);
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children, initialUser }: { children: ReactNode; initialUser: User | null }) => {
  const [user, setUser] = useState(initialUser);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
