import { CUES } from '@/modules/audio/cues';

export function cueFor(exerciseId: string, faultId: string): string | undefined {
  return CUES[exerciseId]?.[faultId];
}
