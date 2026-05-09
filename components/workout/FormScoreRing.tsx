import { StyleSheet, Text, View, type ViewStyle } from 'react-native';

type Props = {
  score: number;
  style?: ViewStyle;
};

export function FormScoreRing({ score, style }: Props) {
  const tint =
    score > 80 ? '#1D9E75' : score > 60 ? '#EF9F27' : '#E24B4A';

  return (
    <View style={[styles.wrap, style]}>
      <View style={[styles.ring, { borderColor: tint }]}>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.label}>form</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  score: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
  },
  label: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '600',
    marginTop: -2,
  },
});
