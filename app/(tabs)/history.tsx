import { useSessionHistoryStore } from '@/store/sessionHistoryStore';
import { Link } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function HistoryScreen() {
  const sessions = useSessionHistoryStore((s) => s.sessions);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Session history</Text>
      <Text style={styles.sub}>Stored locally (Zustand + AsyncStorage). WatermelonDB optional.</Text>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>Complete a set from Workout to see history.</Text>
        }
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.ex}>{item.exerciseId}</Text>
            <Text style={styles.meta}>
              {new Date(item.endedAt).toLocaleString()} · {item.reps} reps · form{' '}
              {Math.round(item.avgFormScore)}
            </Text>
          </View>
        )}
      />
      <Link href="/(tabs)/workout" asChild>
        <Text style={styles.link}>Go to workout</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    gap: 12,
    backgroundColor: '#0b1220',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  sub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.65)',
    marginBottom: 8,
  },
  list: {
    gap: 10,
    paddingBottom: 24,
  },
  card: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  ex: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  meta: {
    color: 'rgba(255,255,255,0.75)',
    marginTop: 6,
    fontSize: 13,
  },
  empty: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 14,
    marginTop: 24,
  },
  link: {
    color: '#6ee7b7',
    fontWeight: '700',
    fontSize: 16,
  },
});
