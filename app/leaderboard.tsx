import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const LEADERS = [
  { name: 'You (local)', score: 0, note: 'Connect optional cloud sync (README) to go live.' },
  { name: '—', score: 0, note: 'Placeholder row' },
  { name: '—', score: 0, note: 'Placeholder row' },
];

export default function LeaderboardScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Leaderboard' }} />
      <View style={styles.root}>
        <Text style={styles.title}>Offline-first</Text>
        <Text style={styles.sub}>
          Leaderboard sync is optional in the architecture (FastAPI + Supabase). This build stores
          sessions on-device.
        </Text>
        {LEADERS.map((row, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.rank}>{i + 1}</Text>
            <View style={styles.cell}>
              <Text style={styles.name}>{row.name}</Text>
              <Text style={styles.note}>{row.note}</Text>
            </View>
            <Text style={styles.score}>{row.score || '—'}</Text>
          </View>
        ))}
        <Link href="/" asChild>
          <Pressable style={styles.back}>
            <Text style={styles.backText}>← Back</Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0b1220',
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  sub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    gap: 12,
  },
  rank: {
    color: '#94a3b8',
    fontWeight: '800',
    width: 28,
  },
  cell: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  note: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
  },
  score: {
    color: '#fbbf24',
    fontWeight: '900',
    fontSize: 16,
  },
  back: {
    marginTop: 24,
    padding: 12,
  },
  backText: {
    color: '#93c5fd',
    fontWeight: '700',
    fontSize: 16,
  },
});
