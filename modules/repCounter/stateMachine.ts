export type RepPhase = 'IDLE' | 'ECCENTRIC' | 'BOTTOM' | 'CONCENTRIC' | 'TOP';

export class RepCounter {
  private phase: RepPhase = 'IDLE';
  private repCount = 0;
  private phaseStartTime = 0;

  update(
    primaryAngle: number,
    timestamp: number
  ): {
    repCompleted: boolean;
    repCount: number;
    phase: RepPhase;
    tempo: { eccentric: number; concentric: number } | null;
  } {
    let repCompleted = false;
    let tempo: { eccentric: number; concentric: number } | null = null;

    switch (this.phase) {
      case 'IDLE':
      case 'TOP':
        if (primaryAngle < 160) {
          this.phase = 'ECCENTRIC';
          this.phaseStartTime = timestamp;
        }
        break;

      case 'ECCENTRIC':
        if (primaryAngle < 100) {
          this.phase = 'BOTTOM';
        }
        break;

      case 'BOTTOM':
        if (primaryAngle > 110) {
          this.phase = 'CONCENTRIC';
        }
        break;

      case 'CONCENTRIC':
        if (primaryAngle > 155) {
          this.phase = 'TOP';
          this.repCount++;
          repCompleted = true;
          const totalTime = (timestamp - this.phaseStartTime) / 1000;
          tempo = {
            eccentric: parseFloat((totalTime * 0.5).toFixed(1)),
            concentric: parseFloat((totalTime * 0.5).toFixed(1)),
          };
        }
        break;
    }

    return { repCompleted, repCount: this.repCount, phase: this.phase, tempo };
  }

  reset() {
    this.phase = 'IDLE';
    this.repCount = 0;
  }
}
