export interface SetPerformance {
  targetReps: number;
  completedReps: number;
  weight: number;
  avgFormScore: number;
  rpe: number;
}

export function suggestNextSet(
  history: SetPerformance[],
  readiness: number
): { weight: number; reps: number; message: string } {
  if (history.length === 0) {
    return {
      weight: 0,
      reps: 8,
      message: 'Start with a weight you can lift with perfect form',
    };
  }

  const last = history[history.length - 1];
  const recentForm =
    history.slice(-3).reduce((s, h) => s + h.avgFormScore, 0) / Math.min(3, history.length);

  if (recentForm < 80) {
    return {
      weight: last.weight,
      reps: last.targetReps,
      message: `Work on form first — your average is ${Math.round(recentForm)}/100`,
    };
  }

  if (last.completedReps >= last.targetReps && last.rpe <= 7 && readiness > 70) {
    const increment = last.weight >= 100 ? 2.5 : last.weight >= 60 ? 2.5 : 1.25;
    return {
      weight: last.weight + increment,
      reps: last.targetReps,
      message: `Great work! Time to add ${increment}kg`,
    };
  }

  if (last.completedReps < last.targetReps) {
    return {
      weight: last.weight,
      reps: last.targetReps,
      message: 'Hit all reps first before increasing weight',
    };
  }

  return { weight: last.weight, reps: last.targetReps, message: 'Keep it up — solid session' };
}
