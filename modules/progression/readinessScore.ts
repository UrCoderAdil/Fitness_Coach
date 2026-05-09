export interface SessionLog {
  date: Date;
  exerciseId: string;
  avgFormScore: number;
  rpe: number;
  totalVolume: number;
}

export function computeReadiness(recentSessions: SessionLog[]): number {
  if (recentSessions.length === 0) return 75;

  const last = recentSessions[0];
  const daysSinceLastSession = (Date.now() - last.date.getTime()) / (1000 * 60 * 60 * 24);

  const recoveryFactor =
    daysSinceLastSession < 1
      ? 0.6
      : daysSinceLastSession < 1.5
        ? 0.85
        : daysSinceLastSession < 2.5
          ? 1.0
          : daysSinceLastSession < 4
            ? 0.95
            : 0.8;

  const recentVolume = recentSessions
    .slice(0, 3)
    .reduce((sum, s, i) => sum + s.totalVolume * Math.exp(-i * 0.5), 0);
  const volumeFatigue = Math.min(0.3, recentVolume / 50000);

  const avgRecentForm =
    recentSessions.slice(0, 3).reduce((sum, s) => sum + s.avgFormScore, 0) /
    Math.min(3, recentSessions.length);
  const formFactor = avgRecentForm / 100;

  const readiness = (recoveryFactor * formFactor - volumeFatigue) * 100;
  return Math.max(20, Math.min(100, Math.round(readiness)));
}
