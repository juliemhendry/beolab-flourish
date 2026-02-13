import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData, DEFAULT_USER_DATA } from '../types';

const STORAGE_KEY = '@beolab_user_data';

export async function loadUserData(): Promise<UserData> {
  try {
    // Race against a timeout so a hanging AsyncStorage never blocks the app.
    const raw = await Promise.race([
      AsyncStorage.getItem(STORAGE_KEY),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000)),
    ]);
    if (!raw) return { ...DEFAULT_USER_DATA };
    return { ...DEFAULT_USER_DATA, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_USER_DATA };
  }
}

export async function saveUserData(data: UserData): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save user data:', e);
  }
}

export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear data:', e);
  }
}
