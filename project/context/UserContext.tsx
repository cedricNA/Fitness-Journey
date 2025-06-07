import React, { createContext, useContext, useState } from 'react';

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
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultUser: User = {
  name: 'Marie Dupont',
  email: 'marie.dupont@email.com',
  age: 28,
  height: 165,
  goal: 'weight_loss',
  joinDate: '2024-01-01',
  level: 'Intermédiaire',
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
