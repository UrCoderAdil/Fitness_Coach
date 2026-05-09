/**
 * Optional TFLite grader — add `@tensorflow/tfjs-tflite` and `.tflite` assets
 * under `assets/models/` to enable (see README Phase 3).
 */
export class FormGrader {
  private frameBuffer: number[][] = [];
  private readonly WINDOW_SIZE = 30;

  addFrame(angleVector: number[]) {
    this.frameBuffer.push(angleVector);
    if (this.frameBuffer.length > this.WINDOW_SIZE) {
      this.frameBuffer.shift();
    }
  }

  predict(): { score: number; faultProbabilities: Record<string, number> } | null {
    return null;
  }

  reset() {
    this.frameBuffer = [];
  }
}
