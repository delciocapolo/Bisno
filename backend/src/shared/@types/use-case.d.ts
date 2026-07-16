export abstract class UseCaseAbstract<T> {
  abstract execute(params?: unknown): Promise<T>;
}
