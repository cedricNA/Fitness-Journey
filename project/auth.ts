import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from './context/UserContext';

const USER_KEY = 'auth_user';

export async function getPersistedUser(): Promise<User | null> {
  const data = await AsyncStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export async function persistUser(user: User) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function clearPersistedUser() {
  await AsyncStorage.removeItem(USER_KEY);
}

export async function fakeLogin(email: string, password: string): Promise<User> {
  // Simple fake user based on email
  const existing = await getPersistedUser();
  if (existing && existing.email === email) {
    return existing;
  }
  const user: User = {
    name: 'Utilisateur',
    email,
    age: 30,
    height: 170,
    goal: 'weight_loss',
    joinDate: new Date().toISOString().split('T')[0],
    level: 'Débutant',
  };
  await persistUser(user);
  return user;
}

export async function fakeRegister(name: string, email: string, password: string): Promise<User> {
  const user: User = {
    name,
    email,
    age: 30,
    height: 170,
    goal: 'weight_loss',
    joinDate: new Date().toISOString().split('T')[0],
    level: 'Débutant',
  };
  await persistUser(user);
  return user;
}

