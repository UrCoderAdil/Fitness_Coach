import { AudioFeedback } from '@/modules/audio/tts';
import type { Landmark } from '@/modules/pose/landmarks';
import { simulateSquatLandmarks } from '@/modules/pose/simulatePose';
import { extractSquatAngles } from '@/modules/angles/exercises/squat';
import { gradeSingleFrame, SQUAT_RULES } from '@/modules/grading/thresholds';
import { RepCounter } from '@/modules/repCounter/stateMachine';
import { useSettingsStore } from '@/store/settingsStore';
import { useCallback, useEffect, useRef, useState } from 'react';

export type SquatEngineSnapshot = {
  landmarks: Landmark[];
  formScore: number;
  repCount: number;
  phase: ReturnType<RepCounter['update']>['phase'];
  activeFaults: ReturnType<typeof gradeSingleFrame>['faults'];
};

export function useSquatEngine(active: boolean) {
  const demoMode = useSettingsStore((s) => s.demoMode);
  const audioEnabled = useSettingsStore((s) => s.audioEnabled);

  const repCounterRef = useRef(new RepCounter());
  const audioRef = useRef(new AudioFeedback());

  const [snapshot, setSnapshot] = useState<SquatEngineSnapshot>({
    landmarks: [],
    formScore: 100,
    repCount: 0,
    phase: 'IDLE',
    activeFaults: [],
  });

  const processLandmarks = useCallback(
    (lm: Landmark[]) => {
      const angles = extractSquatAngles(lm);
      const { score, faults } = gradeSingleFrame(angles, SQUAT_RULES);
      const primaryAngle = Math.min(angles.leftKnee, angles.rightKnee);
      const ts = Date.now();
      const repResult = repCounterRef.current.update(primaryAngle, ts);

      if (audioEnabled) {
        faults.forEach((fault) => {
          audioRef.current.speak(fault.cue, fault.id, fault.severity);
        });
        if (repResult.repCompleted) {
          audioRef.current.speakRepCount(repResult.repCount);
        }
      }

      setSnapshot({
        landmarks: lm,
        formScore: score,
        repCount: repResult.repCount,
        phase: repResult.phase,
        activeFaults: faults,
      });
    },
    [audioEnabled]
  );

  useEffect(() => {
    repCounterRef.current.reset();
    setSnapshot({
      landmarks: [],
      formScore: 100,
      repCount: 0,
      phase: 'IDLE',
      activeFaults: [],
    });
  }, [active, demoMode]);

  useEffect(() => {
    if (!active || !demoMode) return;

    const id = setInterval(() => {
      const lm = simulateSquatLandmarks(Date.now());
      processLandmarks(lm);
    }, 1000 / 30);

    return () => clearInterval(id);
  }, [active, demoMode, processLandmarks]);

  return {
    snapshot,
    processLandmarks,
    demoMode,
    resetReps: () => repCounterRef.current.reset(),
  };
}
