import { StyleSheet, Text, View } from 'react-native';

type Props = {
  scores: number[];
};

export function WeeklyFormChart({ scores }: Props) {
  const max = Math.max(40, ...scores, 1);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Recent form (sessions)</Text>
      <View style={styles.row}>
        {scores.map((s, i) => {
          const h = Math.round((s / max) * 72);
          return (
            <View key={i} style={styles.barWrap}>
              <View style={[styles.bar, { height: h }]} />
              <Text style={styles.val}>{s}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#e5e7eb',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    minHeight: 96,
  },
  barWrap: {
    alignItems: 'center',
    gap: 6,
  },
  bar: {
    width: 18,
    borderRadius: 6,
    backgroundColor: '#34d399',
    minHeight: 6,
  },
  val: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '600',
  },
});
