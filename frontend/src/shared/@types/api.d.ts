type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

export type IApiResponse<T> = {
  data: T;
  message: string | string[];
};

export interface IApiPaginatedResponse<T> {
  data: Array<T>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
