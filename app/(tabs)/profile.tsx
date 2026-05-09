import { useSettingsStore } from '@/store/settingsStore';
import { useUserStore } from '@/store/userStore';
import { useWorkoutStore, type ExerciseId } from '@/store/workoutStore';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

const EXERCISES: ExerciseId[] = [
  'squat',
  'deadlift',
  'pushup',
  'overhead_press',
  'lunge',
  'bicep_curl',
  'plank',
  'pullup',
  'romanian_deadlift',
  'bench_press',
  'lateral_raise',
  'glute_bridge',
  'step_up',
  'tricep_dip',
  'jumping_jack',
];

export default function ProfileScreen() {
  const demoMode = useSettingsStore((s) => s.demoMode);
  const setDemoMode = useSettingsStore((s) => s.setDemoMode);
  const audioEnabled = useSettingsStore((s) => s.audioEnabled);
  const setAudioEnabled = useSettingsStore((s) => s.setAudioEnabled);

  const exerciseId = useWorkoutStore((s) => s.exerciseId);
  const setExercise = useWorkoutStore((s) => s.setExercise);
  const targetReps = useWorkoutStore((s) => s.targetReps);
  const weightKg = useWorkoutStore((s) => s.weightKg);
  const setTargets = useWorkoutStore((s) => s.setTargets);

  const personalRecords = useUserStore((s) => s.personalRecords);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Live session defaults</Text>
        <Text style={styles.hint}>Workout tab uses squat grading rules in this build.</Text>
        <Text style={styles.label}>Exercise focus</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
          {EXERCISES.map((id) => (
            <Pressable
              key={id}
              onPress={() => setExercise(id)}
              style={[styles.chip, exerciseId === id && styles.chipOn]}>
              <Text style={[styles.chipText, exerciseId === id && styles.chipTextOn]}>{id}</Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={styles.label}>Target reps: {targetReps}</Text>
        <View style={styles.stepRow}>
          <Pressable style={styles.step} onPress={() => setTargets(Math.max(1, targetReps - 1), weightKg)}>
            <Text style={styles.stepText}>−</Text>
          </Pressable>
          <Pressable style={styles.step} onPress={() => setTargets(targetReps + 1, weightKg)}>
            <Text style={styles.stepText}>+</Text>
          </Pressable>
        </View>
        <Text style={styles.label}>Weight (kg): {weightKg}</Text>
        <View style={styles.stepRow}>
          <Pressable
            style={styles.step}
            onPress={() => setTargets(targetReps, Math.max(0, weightKg - 2.5))}>
            <Text style={styles.stepText}>−</Text>
          </Pressable>
          <Pressable style={styles.step} onPress={() => setTargets(targetReps, weightKg + 2.5)}>
            <Text style={styles.stepText}>+</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Coaching</Text>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Demo pose stream</Text>
          <Switch value={demoMode} onValueChange={setDemoMode} />
        </View>
        <Text style={styles.caption}>
          Simulates joint angles so you can hear cues & watch the skeleton without MediaPipe native
          code.
        </Text>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Spoken feedback</Text>
          <Switch value={audioEnabled} onValueChange={setAudioEnabled} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Personal records (form ≥ 75)</Text>
        {Object.keys(personalRecords).length === 0 ? (
          <Text style={styles.muted}>Log PRs from recorded sets (future PR flow).</Text>
        ) : (
          Object.entries(personalRecords).map(([id, pr]) => (
            <Text key={id} style={styles.pr}>
              {id}: {pr.weight} kg · {Math.round(pr.formScore)} form
            </Text>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#0b1220',
  },
  container: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
    backgroundColor: '#0b1220',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
  },
  card: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    gap: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#fff',
  },
  hint: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    marginTop: 8,
  },
  chips: {
    flexGrow: 0,
    marginTop: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginRight: 8,
  },
  chipOn: {
    backgroundColor: '#22c55e',
  },
  chipText: {
    color: '#e5e7eb',
    fontSize: 12,
    fontWeight: '700',
  },
  chipTextOn: {
    color: '#052e16',
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  step: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },
  stepText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  toggleLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    paddingRight: 12,
  },
  caption: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 18,
  },
  muted: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 14,
  },
  pr: {
    color: '#e5e7eb',
    fontSize: 14,
    marginTop: 4,
  },
});
