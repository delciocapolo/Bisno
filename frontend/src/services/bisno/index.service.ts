import type { IApiResponse } from "@src/shared/@types/api";
import type { IBisno } from "./types";
import type { IFormCreateBisno } from "@src/shared/schemas/bisno";

export const bisnoService = {
  create: async (payload: IFormCreateBisno) => {
    try {
      return new Promise<IApiResponse<IBisno | null>>((resolve) => {
        setTimeout(() => {
          resolve({
            data: payload,
            message: "",
          });
        }, 500);
      });
      // const { data } = await client.post<IApiResponse<IBisno | null>>(
      //   "/bisnos",
      // );
      // return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro Desconhecido");
    }
  },
};
