import { StreakBadge } from '@/components/gamification/StreakBadge';
import { WeeklyFormChart } from '@/components/gamification/WeeklyFormChart';
import { ProgressionSuggestion } from '@/components/workout/ProgressionSuggestion';
import type { SessionLog } from '@/modules/progression/readinessScore';
import type { SetPerformance } from '@/modules/progression/overloadEngine';
import { useSessionHistoryStore } from '@/store/sessionHistoryStore';
import { useUserStore } from '@/store/userStore';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const streak = useUserStore((s) => s.streak);
  const sessions = useSessionHistoryStore((s) => s.sessions);

  const recentScores = sessions.slice(0, 7).map((s) => Math.round(s.avgFormScore));
  const chartScores =
    recentScores.length > 0 ? recentScores : [72, 76, 80, 78, 82, 85, 88];

  const mockSessions: SessionLog[] = sessions.slice(0, 5).map((s) => ({
    date: new Date(s.endedAt),
    exerciseId: s.exerciseId,
    avgFormScore: s.avgFormScore,
    rpe: 7,
    totalVolume: 3200,
  }));

  const mockSets: SetPerformance[] =
    sessions.length > 0
      ? [
          {
            targetReps: 8,
            completedReps: sessions[0].reps,
            weight: 40,
            avgFormScore: sessions[0].avgFormScore,
            rpe: 7,
          },
        ]
      : [];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Form Judge</Text>
        <StreakBadge streak={streak} />
      </View>
      <Text style={styles.sub}>
        Real-time squat grading, rep counting, and progression — offline-first foundation.
      </Text>

      <Link href="/(tabs)/workout" asChild>
        <Pressable>
          <Text style={styles.cta}>Start workout →</Text>
        </Pressable>
      </Link>

      <View style={styles.links}>
        <Link href="/leaderboard" asChild>
          <Pressable>
            <Text style={styles.link}>Leaderboard</Text>
          </Pressable>
        </Link>
        <Link href="/exercise/squat" asChild>
          <Pressable>
            <Text style={styles.link}>Squat tutorial</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.section}>
        <WeeklyFormChart scores={chartScores} />
      </View>

      <View style={styles.section}>
        <ProgressionSuggestion recentSessions={mockSessions} setHistory={mockSets} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0b1220',
  },
  container: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
  },
  sub: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 22,
  },
  cta: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '800',
    color: '#34d399',
  },
  links: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  link: {
    fontSize: 15,
    fontWeight: '700',
    color: '#93c5fd',
  },
  section: {
    marginTop: 8,
  },
});
