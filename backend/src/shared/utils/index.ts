/**
 * 
 * @param args Array<() => Promise<any>>
 * @returns 
 * @example
 * resolveSequencialPromises(
 *    () => Promise.resolve(true),
 *    () => Promise.resolve(false),
 *    () => Promise.resolve("Delcio Capolo"),
 * );
 */

export async function resolveSequencialPromises(...args: Array<() => Promise<any>>) {
  type TypeResult = {
    name: string;
    success: boolean;
    error?: any;
    value?: any;
  }

  const results: TypeResult[] = [];

  for (const task of args) {
    const name = task.name || 'anonymous';
    try {
      const result = await task();
      results.push({
        name: name,
        success: true,
        value: result,
      });
    } catch (error) {
      results.push({
        name: name,
        success: false,
        error: error,
      });
    }
  }

  return results;
}

export function isDefined<T>(value: T): value is T {
  return typeof value !== "undefined" && value !== null;
}
