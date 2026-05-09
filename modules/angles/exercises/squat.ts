import type { Landmark } from '@/modules/pose/landmarks';
import { LM } from '@/modules/pose/landmarks';
import {
  computeAngle,
  computeKneeValgus,
  computeTrunkLean,
  type Point3D,
} from '@/modules/angles/compute';

export interface SquatAngles {
  leftKnee: number;
  rightKnee: number;
  leftHip: number;
  rightHip: number;
  trunkLean: number;
  leftKneeValgus: number;
  rightKneeValgus: number;
}

export function extractSquatAngles(lm: Landmark[]): SquatAngles {
  return {
    leftKnee: computeAngle(
      lm[LM.LEFT_HIP] as Point3D,
      lm[LM.LEFT_KNEE] as Point3D,
      lm[LM.LEFT_ANKLE] as Point3D
    ),
    rightKnee: computeAngle(
      lm[LM.RIGHT_HIP] as Point3D,
      lm[LM.RIGHT_KNEE] as Point3D,
      lm[LM.RIGHT_ANKLE] as Point3D
    ),
    leftHip: computeAngle(
      lm[LM.LEFT_SHOULDER] as Point3D,
      lm[LM.LEFT_HIP] as Point3D,
      lm[LM.LEFT_KNEE] as Point3D
    ),
    rightHip: computeAngle(
      lm[LM.RIGHT_SHOULDER] as Point3D,
      lm[LM.RIGHT_HIP] as Point3D,
      lm[LM.RIGHT_KNEE] as Point3D
    ),
    trunkLean: computeTrunkLean(lm),
    leftKneeValgus: computeKneeValgus(lm[LM.LEFT_HIP], lm[LM.LEFT_KNEE], lm[LM.LEFT_ANKLE]),
    rightKneeValgus: computeKneeValgus(lm[LM.RIGHT_HIP], lm[LM.RIGHT_KNEE], lm[LM.RIGHT_ANKLE]),
  };
}
