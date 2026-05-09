import { CUES } from '@/modules/audio/cues';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const cues = (id && CUES[id]) || {};

  return (
    <>
      <Stack.Screen options={{ title: id ? String(id).replace(/_/g, ' ') : 'Exercise' }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{id}</Text>
        <Text style={styles.body}>
          Tutorial video + rep schemes plug in here. Rule-based grading references angles listed in
          the README for each lift.
        </Text>
        <Text style={styles.section}>Coaching cues</Text>
        {Object.keys(cues).length === 0 ? (
          <Text style={styles.muted}>Add cues for this exercise in modules/audio/cues.ts</Text>
        ) : (
          Object.entries(cues).map(([k, v]) => (
            <Text key={k} style={styles.cue}>
              <Text style={styles.cueKey}>{k}: </Text>
              {v}
            </Text>
          ))
        )}
        <Link href="/(tabs)/workout" asChild>
          <Pressable style={styles.cta}>
            <Text style={styles.ctaText}>Practice on Workout tab</Text>
          </Pressable>
        </Link>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0b1220',
    gap: 12,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    textTransform: 'capitalize',
  },
  body: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 22,
  },
  section: {
    marginTop: 12,
    fontSize: 17,
    fontWeight: '800',
    color: '#fff',
  },
  muted: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
  },
  cue: {
    color: '#e5e7eb',
    fontSize: 14,
    lineHeight: 20,
  },
  cueKey: {
    fontWeight: '800',
    color: '#93c5fd',
  },
  cta: {
    marginTop: 20,
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaText: {
    color: '#052e16',
    fontWeight: '800',
    fontSize: 16,
  },
});
