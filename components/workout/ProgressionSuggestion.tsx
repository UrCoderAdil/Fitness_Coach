import { suggestNextSet } from '@/modules/progression/overloadEngine';
import type { SetPerformance } from '@/modules/progression/overloadEngine';
import { computeReadiness, type SessionLog } from '@/modules/progression/readinessScore';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  recentSessions: SessionLog[];
  setHistory: SetPerformance[];
};

export function ProgressionSuggestion({ recentSessions, setHistory }: Props) {
  const readiness = computeReadiness(recentSessions);
  const suggestion = suggestNextSet(setHistory, readiness);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Next set suggestion</Text>
      <Text style={styles.readiness}>Readiness {readiness}/100</Text>
      <Text style={styles.message}>{suggestion.message}</Text>
      {suggestion.weight > 0 && (
        <Text style={styles.detail}>
          Target: {suggestion.reps} reps @ {suggestion.weight} kg
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  readiness: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
  },
  message: {
    fontSize: 15,
    color: '#e8f7ef',
    marginTop: 4,
  },
  detail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
});
