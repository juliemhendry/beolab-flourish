import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import {
  UserData,
  DEFAULT_USER_DATA,
  CompletedPause,
  AssessmentResult,
  WeeklyCheckIn,
  Demographics,
  FeelingResponse,
} from '../types';
import { loadUserData, saveUserData, clearAllData } from '../hooks/useStorage';
import { calculateBand } from '../utils/scoring';
import {
  requestNotificationPermissions,
  scheduleDailyReminders,
  cancelAllReminders,
} from '../utils/notifications';

function generateId(): string {
  const s = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s()}${s()}-${s()}-${s()}-${s()}-${s()}${s()}${s()}`;
}

interface AppContextType {
  data: UserData;
  loading: boolean;
  resetKey: number;
  completeOnboarding: (demographics: Demographics, assessment: AssessmentResult) => Promise<void>;
  recordPause: (pauseId: string, feeling: FeelingResponse, doneEarly: boolean) => Promise<void>;
  saveAssessment: (scores: number[]) => Promise<void>;
  saveWeeklyCheckIn: (rating: number, weekNumber: number) => Promise<void>;
  updateDemographics: (demographics: Demographics) => Promise<void>;
  toggleReminders: (enabled: boolean) => Promise<void>;
  toggleResearchConsent: (enabled: boolean) => Promise<void>;
  toggleFavourite: (pauseId: string) => Promise<void>;
  resetAllData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<UserData>(DEFAULT_USER_DATA);
  const [loading, setLoading] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const stored = await loadUserData();
        if (!stored.deviceId) {
          stored.deviceId = generateId();
        }
        if (!stored.favouritePauses) {
          stored.favouritePauses = [];
        }
        setData(stored);
      } catch (e) {
        console.warn('Failed to load user data:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (updated: UserData) => {
    setData(updated);
    await saveUserData(updated);
  }, []);

  const completeOnboarding = useCallback(
    async (demographics: Demographics, assessment: AssessmentResult) => {
      const updated: UserData = {
        ...data,
        onboardingComplete: true,
        demographics,
        assessments: [assessment],
        firstOpenDate: new Date().toISOString(),
        remindersEnabled: true,
      };

      // Attempt to set up notifications — keep reminders enabled even if
      // permission is unavailable (e.g. on web) so the toggle state is
      // correct when they later install the native build.
      try {
        const granted = await requestNotificationPermissions();
        if (granted) {
          await scheduleDailyReminders();
        }
      } catch {
        // Notifications not available on this platform
      }

      await persist(updated);
    },
    [data, persist]
  );

  const recordPause = useCallback(
    async (pauseId: string, feeling: FeelingResponse, doneEarly: boolean) => {
      const entry: CompletedPause = {
        pauseId,
        completedAt: new Date().toISOString(),
        feeling,
        doneEarly,
      };
      const updated = {
        ...data,
        completedPauses: [...data.completedPauses, entry],
      };
      await persist(updated);
    },
    [data, persist]
  );

  const saveAssessment = useCallback(
    async (scores: number[]) => {
      const total = scores.reduce((a, b) => a + b, 0);
      const result: AssessmentResult = {
        date: new Date().toISOString(),
        scores,
        total,
        band: calculateBand(total),
      };
      const updated = {
        ...data,
        assessments: [...data.assessments, result],
      };
      await persist(updated);
    },
    [data, persist]
  );

  const saveWeeklyCheckIn = useCallback(
    async (rating: number, weekNumber: number) => {
      const entry: WeeklyCheckIn = {
        date: new Date().toISOString(),
        rating,
        weekNumber,
      };
      const updated = {
        ...data,
        weeklyCheckIns: [...data.weeklyCheckIns, entry],
      };
      await persist(updated);
    },
    [data, persist]
  );

  const updateDemographics = useCallback(
    async (demographics: Demographics) => {
      const updated = { ...data, demographics };
      await persist(updated);
    },
    [data, persist]
  );

  const toggleReminders = useCallback(
    async (enabled: boolean) => {
      if (enabled) {
        try {
          const granted = await requestNotificationPermissions();
          if (granted) {
            await scheduleDailyReminders();
          }
        } catch {
          // Notifications not available on this platform
        }
      } else {
        try {
          await cancelAllReminders();
        } catch {
          // Ignore if not available
        }
      }
      const updated = { ...data, remindersEnabled: enabled };
      await persist(updated);
    },
    [data, persist]
  );

  const toggleResearchConsent = useCallback(
    async (enabled: boolean) => {
      const updated = { ...data, researchConsent: enabled };
      await persist(updated);
    },
    [data, persist]
  );

  const toggleFavourite = useCallback(
    async (pauseId: string) => {
      const current = data.favouritePauses || [];
      const isFav = current.includes(pauseId);
      const updated = {
        ...data,
        favouritePauses: isFav
          ? current.filter((id) => id !== pauseId)
          : [...current, pauseId],
      };
      await persist(updated);
    },
    [data, persist]
  );

  const resetAllData = useCallback(async () => {
    try {
      await cancelAllReminders();
    } catch {
      // Ignore if not available
    }
    await clearAllData();
    const fresh: UserData = { ...DEFAULT_USER_DATA, deviceId: generateId() };
    setData(fresh);
    await saveUserData(fresh);
    // Increment key to force NavigationContainer remount
    setResetKey((k) => k + 1);
  }, []);

  return (
    <AppContext.Provider
      value={{
        data,
        loading,
        resetKey,
        completeOnboarding,
        recordPause,
        saveAssessment,
        saveWeeklyCheckIn,
        updateDemographics,
        toggleReminders,
        toggleResearchConsent,
        toggleFavourite,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
