export class PersonalBaseline {
  private history: Record<string, number[]> = {};

  recordAngle(angleId: string, value: number) {
    if (!this.history[angleId]) this.history[angleId] = [];
    this.history[angleId].push(value);
    if (this.history[angleId].length > 500) this.history[angleId].shift();
  }

  getPersonalThreshold(angleId: string, percentile: number = 10): number | null {
    const vals = this.history[angleId];
    if (!vals || vals.length < 50) return null;
    const sorted = [...vals].sort((a, b) => a - b);
    const idx = Math.floor((percentile / 100) * sorted.length);
    return sorted[Math.min(idx, sorted.length - 1)];
  }

  getDepthThreshold(defaultThreshold: number): number {
    const personal = this.getPersonalThreshold('leftKnee', 5);
    return personal ? Math.min(personal + 10, defaultThreshold) : defaultThreshold;
  }
}
