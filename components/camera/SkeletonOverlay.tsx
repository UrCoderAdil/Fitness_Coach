import { LM } from '@/modules/pose/landmarks';
import type { Landmark } from '@/modules/pose/landmarks';
import { Canvas, Circle, Line } from '@shopify/react-native-skia';

const SKELETON_CONNECTIONS: [number, number][] = [
  [LM.LEFT_SHOULDER, LM.RIGHT_SHOULDER],
  [LM.LEFT_SHOULDER, LM.LEFT_ELBOW],
  [LM.LEFT_ELBOW, LM.LEFT_WRIST],
  [LM.RIGHT_SHOULDER, LM.RIGHT_ELBOW],
  [LM.RIGHT_ELBOW, LM.RIGHT_WRIST],
  [LM.LEFT_HIP, LM.RIGHT_HIP],
  [LM.LEFT_HIP, LM.LEFT_KNEE],
  [LM.LEFT_KNEE, LM.LEFT_ANKLE],
  [LM.RIGHT_HIP, LM.RIGHT_KNEE],
  [LM.RIGHT_KNEE, LM.RIGHT_ANKLE],
];

type Props = {
  landmarks: Landmark[];
  frameWidth: number;
  frameHeight: number;
  formScore: number;
};

export function SkeletonOverlay({ landmarks, frameWidth, frameHeight, formScore }: Props) {
  const color =
    formScore > 80 ? '#1D9E75' : formScore > 60 ? '#EF9F27' : '#E24B4A';

  return (
    <Canvas style={{ position: 'absolute', width: frameWidth, height: frameHeight }}>
      {SKELETON_CONNECTIONS.map(([a, b], i) => {
        const lmA = landmarks[a];
        const lmB = landmarks[b];
        if (!lmA || !lmB || lmA.visibility < 0.5 || lmB.visibility < 0.5) return null;
        return (
          <Line
            key={i}
            p1={{ x: lmA.x * frameWidth, y: lmA.y * frameHeight }}
            p2={{ x: lmB.x * frameWidth, y: lmB.y * frameHeight }}
            color={color}
            strokeWidth={2.5}
          />
        );
      })}
      {landmarks.map((lm, i) =>
        lm.visibility > 0.5 ? (
          <Circle
            key={i}
            cx={lm.x * frameWidth}
            cy={lm.y * frameHeight}
            r={5}
            color={color}
          />
        ) : null
      )}
    </Canvas>
  );
}
