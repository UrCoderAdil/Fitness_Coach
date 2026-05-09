export class AngleSmoother {
  private value: number | null = null;

  constructor(private alpha: number = 0.4) {}

  update(raw: number): number {
    if (this.value === null) {
      this.value = raw;
      return raw;
    }
    this.value = this.alpha * raw + (1 - this.alpha) * this.value;
    return Math.round(this.value);
  }

  reset() {
    this.value = null;
  }
}
