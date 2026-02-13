import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

interface AppContextType {
  data: UserData;
  loading: boolean;
  completeOnboarding: (demographics: Demographics, assessment: AssessmentResult) => Promise<void>;
  recordPause: (pauseId: string, feeling: FeelingResponse, doneEarly: boolean) => Promise<void>;
  saveAssessment: (scores: number[]) => Promise<void>;
  saveWeeklyCheckIn: (rating: number, weekNumber: number) => Promise<void>;
  updateDemographics: (demographics: Demographics) => Promise<void>;
  toggleReminders: (enabled: boolean) => Promise<void>;
  toggleResearchConsent: (enabled: boolean) => Promise<void>;
  resetAllData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<UserData>(DEFAULT_USER_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await loadUserData();
      if (!stored.deviceId) {
        stored.deviceId = uuidv4();
      }
      setData(stored);
      setLoading(false);
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

      // Set up notifications
      const granted = await requestNotificationPermissions();
      if (granted) {
        await scheduleDailyReminders();
      } else {
        updated.remindersEnabled = false;
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
        const granted = await requestNotificationPermissions();
        if (granted) {
          await scheduleDailyReminders();
        } else {
          return; // Don't toggle if permission denied
        }
      } else {
        await cancelAllReminders();
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

  const resetAllData = useCallback(async () => {
    await cancelAllReminders();
    await clearAllData();
    const fresh = { ...DEFAULT_USER_DATA, deviceId: uuidv4() };
    setData(fresh);
    await saveUserData(fresh);
  }, []);

  return (
    <AppContext.Provider
      value={{
        data,
        loading,
        completeOnboarding,
        recordPause,
        saveAssessment,
        saveWeeklyCheckIn,
        updateDemographics,
        toggleReminders,
        toggleResearchConsent,
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
