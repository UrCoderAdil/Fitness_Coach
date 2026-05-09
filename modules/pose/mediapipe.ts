import type { Landmark } from './landmarks';

/**
 * Native MediaPipe Pose Landmarker integration belongs in a Vision Camera frame
 * processor (custom native module). This placeholder keeps the JS API surface
 * ready for that bridge.
 */
export type PoseLandmarkerResult = {
  landmarks: Landmark[];
  timestampMs: number;
};

export function isFullPose(landmarks: Landmark[] | null | undefined): boolean {
  return Array.isArray(landmarks) && landmarks.length === 33;
}
