import { LM, emptyLandmarks, type Landmark } from './landmarks';

const DEG = Math.PI / 180;

/**
 * Demo landmarks for UI / logic testing without a native pose runtime.
 * Produces a squat-like knee flexion cycle over time (ms).
 */
export function simulateSquatLandmarks(nowMs: number): Landmark[] {
  const lm = emptyLandmarks();
  const t = nowMs * 0.0025;
  const kneeDeg = 95 + 62 * (0.5 + 0.5 * Math.sin(t));

  const hipY = 0.52;
  const hipLX = 0.42;
  const hipRX = 0.58;
  const thigh = 0.14;
  const shin = 0.13;

  const leftKneeRad = (180 - kneeDeg) * DEG;
  const rightKneeRad = leftKneeRad + 0.04;

  const lkX = hipLX + Math.sin(leftKneeRad) * thigh;
  const lkY = hipY + Math.cos(leftKneeRad) * thigh;
  const rkX = hipRX - Math.sin(rightKneeRad) * thigh;
  const rkY = hipY + Math.cos(rightKneeRad) * thigh;

  const laX = lkX + Math.sin(leftKneeRad * 0.95) * shin;
  const laY = lkY + Math.cos(leftKneeRad * 0.95) * shin;
  const raX = rkX - Math.sin(rightKneeRad * 0.95) * shin;
  const raY = rkY + Math.cos(rightKneeRad * 0.95) * shin;

  const shoulderY = 0.28;
  const midHipX = (hipLX + hipRX) / 2;
  const lean = Math.min(38, Math.abs(midHipX - 0.5) * 400 + Math.sin(t * 0.5) * 6);
  const lsX = 0.38 - lean * 0.0008;
  const rsX = 0.62 - lean * 0.0008;
  const sy = shoulderY + lean * 0.0015;

  set(lm, LM.NOSE, 0.5, 0.12, 0, 0.95);
  set(lm, LM.LEFT_SHOULDER, lsX, sy, -0.02, 0.92);
  set(lm, LM.RIGHT_SHOULDER, rsX, sy, -0.02, 0.92);
  set(lm, LM.LEFT_ELBOW, 0.34, 0.4, -0.05, 0.85);
  set(lm, LM.RIGHT_ELBOW, 0.66, 0.4, -0.05, 0.85);
  set(lm, LM.LEFT_WRIST, 0.32, 0.52, -0.06, 0.8);
  set(lm, LM.RIGHT_WRIST, 0.68, 0.52, -0.06, 0.8);
  set(lm, LM.LEFT_HIP, hipLX, hipY, 0, 0.92);
  set(lm, LM.RIGHT_HIP, hipRX, hipY, 0, 0.92);
  set(lm, LM.LEFT_KNEE, lkX, lkY, 0.02, 0.9);
  set(lm, LM.RIGHT_KNEE, rkX, rkY, 0.02, 0.9);
  set(lm, LM.LEFT_ANKLE, laX, laY + 0.02, 0.03, 0.88);
  set(lm, LM.RIGHT_ANKLE, raX, raY + 0.02, 0.03, 0.88);
  set(lm, LM.LEFT_HEEL, laX - 0.02, laY + 0.05, 0, 0.75);
  set(lm, LM.RIGHT_HEEL, raX + 0.02, raY + 0.05, 0, 0.75);
  set(lm, LM.LEFT_FOOT_INDEX, laX + 0.02, laY + 0.06, 0, 0.72);
  set(lm, LM.RIGHT_FOOT_INDEX, raX - 0.02, raY + 0.06, 0, 0.72);

  return lm;
}

function set(out: Landmark[], i: number, x: number, y: number, z: number, visibility: number) {
  out[i] = { x, y, z, visibility };
}
