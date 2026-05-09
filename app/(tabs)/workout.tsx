import { FeedbackBanner } from '@/components/camera/FeedbackBanner';
import { JointAngleOverlay } from '@/components/camera/JointAngleOverlay';
import { SkeletonOverlay } from '@/components/camera/SkeletonOverlay';
import { WorkoutCamera } from '@/components/camera/WorkoutCamera';
import { FormScoreRing } from '@/components/workout/FormScoreRing';
import { WorkoutRepCounter } from '@/components/workout/RepCounter';
import { useSquatEngine } from '@/hooks/useSquatEngine';
import { useSessionHistoryStore } from '@/store/sessionHistoryStore';
import { useUserStore } from '@/store/userStore';
import { useWorkoutStore } from '@/store/workoutStore';
import { useIsFocused } from '@react-navigation/native';
import { Link } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: W, height: H } = Dimensions.get('window');

export default function WorkoutScreen() {
  const isFocused = useIsFocused();
  const exerciseId = useWorkoutStore((s) => s.exerciseId);
  const targetReps = useWorkoutStore((s) => s.targetReps);
  const beginSession = useWorkoutStore((s) => s.beginSession);
  const endSession = useWorkoutStore((s) => s.endSession);

  const addSession = useSessionHistoryStore((s) => s.addSession);
  const updateStreak = useUserStore((s) => s.updateStreak);

  const [running, setRunning] = useState(false);

  const { snapshot, demoMode, resetReps } = useSquatEngine(Boolean(isFocused && running));

  const faults = useMemo(
    () => snapshot.activeFaults.slice(0, 3),
    [snapshot.activeFaults]
  );

  const onStart = useCallback(() => {
    resetReps();
    beginSession();
    setRunning(true);
  }, [beginSession, resetReps]);

  const onEndSet = useCallback(() => {
    const started = useWorkoutStore.getState().sessionStartedAt;
    if (started) {
      addSession({
        exerciseId,
        startedAt: started,
        endedAt: Date.now(),
        reps: snapshot.repCount,
        avgFormScore: snapshot.formScore,
      });
      updateStreak();
    }
    endSession();
    setRunning(false);
  }, [
    addSession,
    endSession,
    exerciseId,
    snapshot.formScore,
    snapshot.repCount,
    updateStreak,
  ]);

  return (
    <View style={styles.root}>
      <WorkoutCamera active={Boolean(isFocused)}>
        <View style={StyleSheet.absoluteFill}>
          {snapshot.landmarks.length > 0 && (
            <SkeletonOverlay
              landmarks={snapshot.landmarks}
              frameWidth={W}
              frameHeight={H}
              formScore={snapshot.formScore}
            />
          )}
          <JointAngleOverlay landmarks={snapshot.landmarks} />
          <SafeAreaView style={styles.topBar} edges={['top']}>
            <View style={styles.topRow}>
              <Link href="/" asChild>
                <Pressable style={styles.back}>
                  <Text style={styles.backText}>← Home</Text>
                </Pressable>
              </Link>
              <FormScoreRing score={snapshot.formScore} />
            </View>
            <Text style={styles.exerciseLabel}>
              {exerciseId.replace(/_/g, ' ')}
            </Text>
          </SafeAreaView>
          <View style={styles.rightHud}>
            <WorkoutRepCounter count={snapshot.repCount} phase={snapshot.phase} />
          </View>
          {!demoMode && (
            <View style={styles.bannerInfo}>
              <Text style={styles.bannerInfoText}>
                Pose ML runs natively with MediaPipe + Vision Camera (dev build). Turn on Demo mode
                in Profile to exercise the grading pipeline without landmarks.
              </Text>
            </View>
          )}
          <SafeAreaView style={styles.bottom} edges={['bottom']}>
            {!running ? (
              <Pressable style={styles.primaryBtn} onPress={onStart}>
                <Text style={styles.primaryBtnText}>Start set</Text>
              </Pressable>
            ) : (
              <Pressable style={styles.secondaryBtn} onPress={onEndSet}>
                <Text style={styles.secondaryBtnText}>End set & save</Text>
              </Pressable>
            )}
            <Text style={styles.targetHint}>Target {targetReps} reps · squat rules active</Text>
            <ScrollView
              style={styles.faultScroll}
              contentContainerStyle={styles.faultList}
              keyboardShouldPersistTaps="handled">
              {faults.map((f) => (
                <FeedbackBanner key={f.id} fault={f} />
              ))}
            </ScrollView>
          </SafeAreaView>
        </View>
      </WorkoutCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  topBar: {
    paddingHorizontal: 12,
    gap: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  back: {
    padding: 8,
  },
  backText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  exerciseLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginLeft: 4,
    marginBottom: 4,
  },
  rightHud: {
    position: 'absolute',
    right: 16,
    top: H * 0.22,
  },
  bannerInfo: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 180,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  bannerInfoText: {
    color: '#e5e7eb',
    fontSize: 13,
    lineHeight: 18,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    gap: 8,
    paddingBottom: 8,
  },
  primaryBtn: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#052e16',
    fontWeight: '800',
    fontSize: 17,
  },
  secondaryBtn: {
    backgroundColor: 'rgba(255,255,255,0.14)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  secondaryBtnText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  targetHint: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  faultScroll: {
    maxHeight: 140,
  },
  faultList: {
    paddingBottom: 8,
    gap: 6,
  },
});
