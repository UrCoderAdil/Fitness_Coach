import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SettingsStore {
  demoMode: boolean;
  audioEnabled: boolean;
  setDemoMode: (v: boolean) => void;
  setAudioEnabled: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      demoMode: true,
      audioEnabled: true,
      setDemoMode: (demoMode) => set({ demoMode }),
      setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
