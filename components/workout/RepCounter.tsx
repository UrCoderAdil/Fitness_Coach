import { phaseLabel } from '@/modules/repCounter/phaseDetector';
import type { RepPhase } from '@/modules/repCounter/stateMachine';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

type Props = {
  count: number;
  phase: RepPhase;
  style?: ViewStyle;
};

export function WorkoutRepCounter({ count, phase, style }: Props) {
  return (
    <View style={[styles.wrap, style]}>
      <Text style={styles.phase}>{phaseLabel(phase)}</Text>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>reps</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
  phase: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  count: {
    color: '#fff',
    fontSize: 44,
    fontWeight: '900',
    lineHeight: 48,
  },
  label: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '600',
  },
});
