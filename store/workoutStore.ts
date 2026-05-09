import { create } from 'zustand';

export type ExerciseId =
  | 'squat'
  | 'deadlift'
  | 'pushup'
  | 'overhead_press'
  | 'lunge'
  | 'bicep_curl'
  | 'plank'
  | 'pullup'
  | 'romanian_deadlift'
  | 'bench_press'
  | 'lateral_raise'
  | 'glute_bridge'
  | 'step_up'
  | 'tricep_dip'
  | 'jumping_jack';

interface WorkoutStore {
  exerciseId: ExerciseId;
  targetReps: number;
  weightKg: number;
  sessionStartedAt: number | null;
  setExercise: (id: ExerciseId) => void;
  setTargets: (reps: number, weightKg: number) => void;
  beginSession: () => void;
  endSession: () => void;
}

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  exerciseId: 'squat',
  targetReps: 8,
  weightKg: 20,
  sessionStartedAt: null,
  setExercise: (exerciseId) => set({ exerciseId }),
  setTargets: (targetReps, weightKg) => set({ targetReps, weightKg }),
  beginSession: () => set({ sessionStartedAt: Date.now() }),
  endSession: () => set({ sessionStartedAt: null }),
}));
