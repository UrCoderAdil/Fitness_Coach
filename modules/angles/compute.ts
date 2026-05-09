import type { Landmark } from '@/modules/pose/landmarks';
import { LM } from '@/modules/pose/landmarks';

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export function midpoint(a: Landmark, b: Landmark): Point3D {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    z: (a.z + b.z) / 2,
  };
}

function dot2D(u: { x: number; y: number }, v: { x: number; y: number }): number {
  return u.x * v.x + u.y * v.y;
}

/**
 * Angle at joint B formed by points A–B–C. Degrees 0–180.
 */
export function computeAngle(A: Point3D, B: Point3D, C: Point3D): number {
  const BA = { x: A.x - B.x, y: A.y - B.y, z: A.z - B.z };
  const BC = { x: C.x - B.x, y: C.y - B.y, z: C.z - B.z };

  const dot = BA.x * BC.x + BA.y * BC.y + BA.z * BC.z;
  const magBA = Math.sqrt(BA.x ** 2 + BA.y ** 2 + BA.z ** 2);
  const magBC = Math.sqrt(BC.x ** 2 + BC.y ** 2 + BC.z ** 2);

  if (magBA === 0 || magBC === 0) return 0;
  const cosAngle = Math.max(-1, Math.min(1, dot / (magBA * magBC)));
  return Math.round(Math.acos(cosAngle) * (180 / Math.PI));
}

/**
 * Trunk lean vs vertical using hip midpoint → shoulder midpoint.
 */
export function computeTrunkLean(landmarks: Landmark[]): number {
  const hipMid = midpoint(landmarks[LM.LEFT_HIP], landmarks[LM.RIGHT_HIP]);
  const shoulderMid = midpoint(landmarks[LM.LEFT_SHOULDER], landmarks[LM.RIGHT_SHOULDER]);
  const vertical = { x: hipMid.x, y: hipMid.y - 1, z: hipMid.z };
  return computeAngle(
    vertical as Point3D,
    hipMid as Point3D,
    shoulderMid as Point3D
  );
}

/**
 * Knee valgus — frontal-plane proxy using 2D cross product (degrees).
 */
export function computeKneeValgus(hip: Landmark, knee: Landmark, ankle: Landmark): number {
  const hipKneeVec = { x: knee.x - hip.x, y: knee.y - hip.y };
  const kneeAnkleVec = { x: ankle.x - knee.x, y: ankle.y - knee.y };
  const cross = hipKneeVec.x * kneeAnkleVec.y - hipKneeVec.y * kneeAnkleVec.x;
  return Math.round(Math.atan2(cross, dot2D(hipKneeVec, kneeAnkleVec)) * (180 / Math.PI));
}
