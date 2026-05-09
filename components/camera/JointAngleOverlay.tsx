import type { Landmark } from '@/modules/pose/landmarks';
import { extractSquatAngles } from '@/modules/angles/exercises/squat';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  landmarks: Landmark[];
};

export function JointAngleOverlay({ landmarks }: Props) {
  if (!landmarks.length) return null;
  const a = extractSquatAngles(landmarks);

  return (
    <View style={styles.wrap} pointerEvents="none">
      <Text style={styles.line}>L knee {a.leftKnee}°</Text>
      <Text style={styles.line}>R knee {a.rightKnee}°</Text>
      <Text style={styles.line}>Trunk {a.trunkLean}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 12,
    top: 120,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.45)',
    gap: 4,
  },
  line: {
    color: '#fff',
    fontSize: 12,
  },
});
