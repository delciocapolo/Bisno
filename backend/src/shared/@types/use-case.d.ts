export interface UseCaseImplement<T> {
  execute: () => T | Promise<T>;
}