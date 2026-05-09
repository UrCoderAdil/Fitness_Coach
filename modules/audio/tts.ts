import * as Speech from 'expo-speech';

const FEEDBACK_COOLDOWN_MS = 4000;

export class AudioFeedback {
  private lastSpoken: Record<string, number> = {};

  speak(
    cue: string,
    faultId: string,
    priority: 'critical' | 'warning' | 'info' = 'warning'
  ) {
    const now = Date.now();
    const lastTime = this.lastSpoken[faultId] ?? 0;

    const cooldown = priority === 'critical' ? 2000 : FEEDBACK_COOLDOWN_MS;
    if (now - lastTime < cooldown) return;

    this.lastSpoken[faultId] = now;
    Speech.speak(cue, {
      language: 'en-US',
      rate: 0.9,
      pitch: 1.0,
    });
  }

  speakRepCount(count: number) {
    Speech.speak(String(count), { language: 'en-US', rate: 1.1, pitch: 1.1 });
  }

  speakSetComplete(reps: number, formScore: number) {
    const msg =
      formScore >= 90
        ? `Set done! ${reps} reps. Excellent form — ${formScore} out of 100`
        : `Set done! ${reps} reps. Form score ${formScore}. Focus on ${this.weakPoint(formScore)}`;
    Speech.speak(msg, { language: 'en-US', rate: 0.95 });
  }

  private weakPoint(score: number): string {
    return score < 70 ? 'consistency' : 'depth';
  }
}
