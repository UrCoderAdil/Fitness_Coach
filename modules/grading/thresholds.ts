import type { SquatAngles } from '@/modules/angles/exercises/squat';

export interface FormFault {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  cue: string;
  affectedAngle: string;
}

export const SQUAT_RULES: Array<{
  check: (angles: SquatAngles) => boolean;
  fault: FormFault;
}> = [
  {
    check: (a) => Math.min(a.leftKnee, a.rightKnee) > 100,
    fault: {
      id: 'squat_depth',
      severity: 'warning',
      cue: 'Go deeper — get below parallel',
      affectedAngle: 'knee',
    },
  },
  {
    check: (a) => Math.max(Math.abs(a.leftKneeValgus), Math.abs(a.rightKneeValgus)) > 15,
    fault: {
      id: 'knee_cave',
      severity: 'critical',
      cue: 'Push your knees out',
      affectedAngle: 'knee_valgus',
    },
  },
  {
    check: (a) => a.trunkLean > 45,
    fault: {
      id: 'forward_lean',
      severity: 'warning',
      cue: 'Keep your chest up',
      affectedAngle: 'trunk',
    },
  },
  {
    check: (a) => Math.abs(a.leftKnee - a.rightKnee) > 15,
    fault: {
      id: 'asymmetry',
      severity: 'warning',
      cue: 'Even out your weight distribution',
      affectedAngle: 'knee',
    },
  },
];

export function gradeSingleFrame(
  angles: SquatAngles,
  rules: typeof SQUAT_RULES
): { score: number; faults: FormFault[] } {
  const faults = rules.filter((rule) => rule.check(angles)).map((rule) => rule.fault);

  const penalty = faults.reduce((sum, f) => {
    return sum + (f.severity === 'critical' ? 30 : f.severity === 'warning' ? 15 : 5);
  }, 0);

  return { score: Math.max(0, 100 - penalty), faults };
}
