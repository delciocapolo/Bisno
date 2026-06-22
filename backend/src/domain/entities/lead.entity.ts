export type LeadStatus = "sent" | "accepted" | "expired";

export class Lead {
  constructor(
    public readonly id: string,
    public readonly bisnoId: string,
    public readonly mixeiroId: string,
    public readonly notifiedAt: string | null = null,
    private _respondedAt: string | null,
    private _status: LeadStatus,
  ) { }

  static notify(bisnoId: string, mixeiroId: string): Lead {
    return new Lead("lead-1", bisnoId, mixeiroId, new Date().toISOString(), null, "sent");
  }

  public get status(): LeadStatus {
    return this._status;
  }

  public get respondedAt(): string | null {
    return this._respondedAt;
  }

  public get isPending(): boolean {
    return this._status === "sent";
  }

  public accept(): void {
    if (!this.isPending) {
      throw new Error(
        `Lead (bisno ${this.bisnoId}, mixeiro ${this.mixeiroId}) can't be accepted. Current status: ${this._status}`,
      );
    }
    this._status = "accepted";
    this._respondedAt = new Date().toISOString();
  }

  public expire(): void {
    if (!this.isPending) {
      throw new Error(
        `Lead (bisno ${this.bisnoId}, mixeiro ${this.mixeiroId}) can't be expired. Current status: ${this._status}`,
      );
    }
    this._status = "expired";
    this._respondedAt = new Date().toISOString();
  }

  public hasTimedOut(timeoutMs: number): boolean {
    const notifiedAt = this.notifiedAt;
    if (!this.isPending || !notifiedAt) return false;
    const elapsed = Date.now() - new Date(notifiedAt).getTime();
    return elapsed >= timeoutMs;
  }
}
