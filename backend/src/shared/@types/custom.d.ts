// export type RequiredNonNullable<T, K extends keyof T = keyof T> = Required<
//   Pick<T, K>
// > &
//   Omit<T, K>;

export type RequiredNonNullable<T, K extends keyof T = keyof T> = T &
  Required<{
    [P in K]-?: NonNullable<T[P]>;
  }>;
