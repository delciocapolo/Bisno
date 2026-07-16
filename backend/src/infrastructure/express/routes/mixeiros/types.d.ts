type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type IPerson = Nullable<{
  numero: string;
  nome: string;
  nif: string;
  data_nasc: string; // formato YYYY-MM-DD
  genero: "M" | "F" | string;
  naturalidade: string;
  pai_nome_completo: string;
  mae_nome_completo: string;
  estado_civil: string; // ex: "SOLTEIRO", "CASADO", etc.
  data_emissao: string;
  emissao_local: string;
}>;

export interface IPersonResponse {
  sucess: boolean;
  message: string;
  data: IPerson;
}
