interface IApiReponseError {
  field: PropertyKey | undefined;
  error: string;
}

interface IApiPaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface IApiResponse {
  data: any;
  meta: {
    errors: IApiReponseError[] | null;
    pagination?: IApiPaginationMeta;
  };
}
