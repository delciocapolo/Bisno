import { isDefined } from "@src/shared/utils";

export class MixeiroHasSubcription {
  constructor(
    public readonly id: string,
    public readonly subscriptionId: string,
    public readonly mixeiroId: string,
    private _activatedAt: string | null,
    private _deletedAt: string | null,
    private _points: number,
  ) {}

  public get isActive(): boolean {
    return this._activatedAt !== null;
  }

  public get isDeleted(): boolean {
    return this._deletedAt !== null;
  }

  public get currentPoints(): number {
    return this._points;
  }

  public decrementPoints(amount: number = 1): void {
    if (this._points < amount) {
      throw new Error(
        `Pontos insuficientes. Actual: ${this._points}, necessário: ${amount}`,
      );
    }
    this._points -= amount;
  }

  public incrementPoints(amount: number): void {
    this._points += amount;
  }

  public activate(): void {
    if (this.isDeleted) {
      throw new Error(`Subscription has been deleted`);
    }
    this._activatedAt = new Date().toISOString();
  }

  public deactivate(): void {
    if (this.isDeleted) {
      throw new Error(`Subscription has been deleted`);
    }
    this._activatedAt = null;
  }

  public hasExpired(durationMs: number): boolean {
    if (!this.isActive) return true;
    const activatedAt = this._activatedAt;

    if (isDefined(activatedAt)) {
      const elapsed = Date.now() - new Date(activatedAt).getTime();
      return elapsed >= durationMs;
    }

    return true;
  }
}
