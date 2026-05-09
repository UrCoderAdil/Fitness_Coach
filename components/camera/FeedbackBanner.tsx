import type { FormFault } from '@/modules/grading/thresholds';
import { StyleSheet, Text, View } from 'react-native';

export function FeedbackBanner({ fault }: { fault: FormFault }) {
  const bg =
    fault.severity === 'critical'
      ? '#5c1f1f'
      : fault.severity === 'warning'
        ? '#5c4519'
        : '#1f3d5c';

  return (
    <View style={[styles.banner, { backgroundColor: bg }]}>
      <Text style={styles.text}>{fault.cue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: 12,
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
