import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserStore {
  streak: number;
  lastWorkoutDate: string | null;
  streakFreezes: number;
  weeklyFormScore: number[];
  personalRecords: Record<
    string,
    { weight: number; date: string; formScore: number }
  >;
  updateStreak: () => void;
  logPR: (exerciseId: string, weight: number, formScore: number) => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      streak: 0,
      lastWorkoutDate: null,
      streakFreezes: 2,
      weeklyFormScore: [],
      personalRecords: {},

      updateStreak: () => {
        const today = new Date().toDateString();
        const last = get().lastWorkoutDate;
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (last === today) return;
        const newStreak = last === yesterday ? get().streak + 1 : 1;
        set({ streak: newStreak, lastWorkoutDate: today });
      },

      logPR: (exerciseId, weight, formScore) => {
        const existing = get().personalRecords[exerciseId];
        if (formScore < 75) return false;
        if (!existing || weight > existing.weight) {
          set((s) => ({
            personalRecords: {
              ...s.personalRecords,
              [exerciseId]: {
                weight,
                date: new Date().toISOString(),
                formScore,
              },
            },
          }));
          return true;
        }
        return false;
      },
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
