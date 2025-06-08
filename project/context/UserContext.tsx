import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  fakeLogin,
  fakeRegister,
  getPersistedUser,
  clearPersistedUser,
} from '../auth';

export type UserGoal = 'weight_loss' | 'muscle_gain';

export interface User {
  name: string;
  email: string;
  age: number;
  height: number;
  goal: UserGoal;
  joinDate: string;
  level: string;
}

interface UserContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}


const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPersistedUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const login = async (email: string, password: string) => {
    const u = await fakeLogin(email, password);
    setUser(u);
  };

  const register = async (name: string, email: string, password: string) => {
    const u = await fakeRegister(name, email, password);
    setUser(u);
  };

  const logout = async () => {
    await clearPersistedUser();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
