import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';

type Props = {
  exercise: string;
  weight: number;
  formScore: number;
  onDismiss: () => void;
};

export function PRCelebration({ exercise, weight, formScore, onDismiss }: Props) {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSequence(
      withSpring(1.08, { damping: 8 }),
      withSpring(1, { damping: 14 })
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <Text style={styles.prLabel}>PERSONAL RECORD</Text>
        <Text style={styles.exercise}>{exercise}</Text>
        <Text style={styles.weight}>{weight} kg</Text>
        <Text style={styles.formNote}>Form score: {formScore}/100</Text>
        <Pressable onPress={onDismiss} style={styles.dismissBtn}>
          <Text style={styles.dismissText}>Keep going</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.72)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    zIndex: 50,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#121826',
    alignItems: 'center',
    gap: 8,
  },
  prLabel: {
    color: '#fbbf24',
    fontWeight: '900',
    letterSpacing: 2,
    fontSize: 13,
  },
  exercise: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  weight: {
    color: '#e2e8f0',
    fontSize: 36,
    fontWeight: '900',
  },
  formNote: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    marginBottom: 8,
  },
  dismissBtn: {
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#22c55e',
  },
  dismissText: {
    color: '#052e16',
    fontWeight: '800',
    fontSize: 16,
  },
});
