export class Subscription {
  constructor(
    public readonly id: string,
    public name: string,
    public slug: string,
    public points: number,
    private _isActive: boolean = true,
  ) {}

  public get isActive(): boolean {
    return this._isActive;
  }
}
