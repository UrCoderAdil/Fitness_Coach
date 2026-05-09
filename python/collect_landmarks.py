"""Record landmark sequences from workout videos (README Model Training Pipeline)."""
import json
import sys

try:
    import cv2
    import mediapipe as mp
except ImportError:
    print("Install deps: pip install mediapipe opencv-python", file=sys.stderr)
    sys.exit(1)

mp_pose = mp.solutions.pose.Pose(min_detection_confidence=0.7)


def extract_landmarks_from_video(video_path: str) -> list[list[list[float]]]:
    cap = cv2.VideoCapture(video_path)
    all_frames: list[list[list[float]]] = []
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        result = mp_pose.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        if result.pose_landmarks:
            flat = [
                [lm.x, lm.y, lm.z, lm.visibility]
                for lm in result.pose_landmarks.landmark
            ]
            all_frames.append(flat)
    cap.release()
    return all_frames


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python collect_landmarks.py <video.mp4>")
        sys.exit(1)
    frames = extract_landmarks_from_video(sys.argv[1])
    print(json.dumps({"frames": len(frames)}))
