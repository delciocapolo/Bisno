export class CategoryService {
  constructor(
    public readonly id: string,
    public name: string,
    public slug: string,
    private _isActive: boolean = true,
  ) {}

  public get isActive(): boolean {
    return this._isActive;
  }
}
