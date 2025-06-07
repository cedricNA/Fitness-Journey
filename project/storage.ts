import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodItem } from './types';

export interface WeightEntry {
  date: string;
  value: number;
}

export async function getWeights(): Promise<WeightEntry[]> {
  const data = await AsyncStorage.getItem('weights');
  return data ? JSON.parse(data) : [];
}

export async function saveWeights(weights: WeightEntry[]) {
  await AsyncStorage.setItem('weights', JSON.stringify(weights));
}

export async function getMeals(): Promise<FoodItem[]> {
  const data = await AsyncStorage.getItem('meals');
  return data ? JSON.parse(data) : [];
}

export async function saveMeals(meals: FoodItem[]) {
  await AsyncStorage.setItem('meals', JSON.stringify(meals));
}

export interface WorkoutEntry {
  id: number;
  name: string;
  duration: number;
  calories: number;
  type: string;
  date: string;
  completed: boolean;
}

export async function getWorkouts(): Promise<WorkoutEntry[]> {
  const data = await AsyncStorage.getItem('workouts');
  return data ? JSON.parse(data) : [];
}

export async function saveWorkouts(workouts: WorkoutEntry[]) {
  await AsyncStorage.setItem('workouts', JSON.stringify(workouts));
}
