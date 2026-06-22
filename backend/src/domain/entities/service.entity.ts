export class Service {
  constructor(
    public readonly id: string,
    public readonly categoryId: string,
    public name: string,
    public slug: string,
    public icon: string,
    private _isActive: boolean = true,
  ) {}

  public get isActive(): boolean {
    return this._isActive;
  }
}
