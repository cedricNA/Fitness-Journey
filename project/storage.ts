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

export interface MeasurementEntry {
  id: number;
  name: string;
  value: number;
  unit: string;
  date: string;
}

export async function getMeasurements(): Promise<MeasurementEntry[]> {
  const data = await AsyncStorage.getItem('measurements');
  return data ? JSON.parse(data) : [];
}

export async function saveMeasurements(measurements: MeasurementEntry[]) {
  await AsyncStorage.setItem('measurements', JSON.stringify(measurements));
}

export interface ProgressPhoto {
  id: number;
  uri: string;
  type: string;
  date: string;
}

export async function getPhotos(): Promise<ProgressPhoto[]> {
  const data = await AsyncStorage.getItem('photos');
  return data ? JSON.parse(data) : [];
}

export async function savePhotos(photos: ProgressPhoto[]) {
  await AsyncStorage.setItem('photos', JSON.stringify(photos));
}
