export abstract class UseCaseAbstract<T> {
  abstract execute(params: Record<string, unknown>): Promise<T>;
}
