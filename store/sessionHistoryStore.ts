import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface SessionEntry {
  id: string;
  exerciseId: string;
  startedAt: number;
  endedAt: number;
  reps: number;
  avgFormScore: number;
  notes?: string;
}

interface SessionHistoryStore {
  sessions: SessionEntry[];
  addSession: (s: Omit<SessionEntry, 'id'> & { id?: string }) => void;
  clear: () => void;
}

export const useSessionHistoryStore = create<SessionHistoryStore>()(
  persist(
    (set) => ({
      sessions: [],
      addSession: (s) =>
        set((state) => ({
          sessions: [
            {
              id: s.id ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
              exerciseId: s.exerciseId,
              startedAt: s.startedAt,
              endedAt: s.endedAt,
              reps: s.reps,
              avgFormScore: s.avgFormScore,
              notes: s.notes,
            },
            ...state.sessions,
          ].slice(0, 200),
        })),
      clear: () => set({ sessions: [] }),
    }),
    {
      name: 'session-history',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
