export type MixeiroStatusType = "whatsapp" | "mobile" | "email";

export class Mixeiro {
  constructor(
    public readonly id: string,
    public readonly categoryId: string,
    public readonly zoneId: string,
    public custom_name: string,
    public fullname: string,
    public email: string,
    public password: string,
    public bi: string,
    public mobile: string,
    public hasWhatsapp: boolean,
    public channel: MixeiroStatusType,
    private verifiedAt: Date | null,
    private deletedAt: Date | null,
    private _isActive: boolean,
    private _isLocked: boolean,
  ) {}

  public get isActive(): boolean {
    return this._isActive;
  }

  public get isLocked(): boolean {
    return this._isLocked;
  }

  public get isDeleted(): boolean {
    return this.deletedAt !== null;
  }

  public get isVerified(): boolean {
    return this.verifiedAt !== null;
  }

  public markAsLocked(): void {
    if (!this.isVerified) {
      throw new Error(`Mixeiro ${this.id} can't be locked. It's not verified`);
    }

    if (this.isLocked) {
      throw new Error(`Mixeiro ${this.id} is already locked`);
    }

    if (!this.isActive || this.isDeleted) {
      throw new Error(`Mixeiro ${this.id} can't be locked. It's inactive or deleted`);
    }

    this._isLocked = true;
  }

  public unlock(): void {
    this._isLocked = false;
  }

  public isEligibleForBisno(bisno: { zoneId: string; categoryId: string }): boolean {
    return (
      this.isVerified &&
      this._isActive &&
      !this.isDeleted &&
      !this._isLocked &&
      this.zoneId === bisno.zoneId &&
      this.categoryId === bisno.categoryId
    );
  }

  public deactivate(): void {
    this._isActive = false;
  }

  public activate(): void {
    this._isActive = true;
  }

  public softDelete(): void {
    this.deletedAt = new Date();
    this._isActive = false;
  }

  public verifyMixeiro(): void {
    if (!this.isActive || this.isDeleted) {
      throw new Error(`Mixeiro ${this.id} can't be verified. It's inactive or deleted`);
    }
    this.verifiedAt = new Date();
  }
}
