import type { RepPhase } from '@/modules/repCounter/stateMachine';

/** Reserved for richer eccentric/concentric segmentation per exercise. */
export function phaseLabel(phase: RepPhase): string {
  switch (phase) {
    case 'ECCENTRIC':
      return 'Down';
    case 'CONCENTRIC':
      return 'Up';
    case 'BOTTOM':
      return 'Bottom';
    case 'TOP':
    case 'IDLE':
    default:
      return 'Ready';
  }
}
