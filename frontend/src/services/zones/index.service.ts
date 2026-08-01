import type { IApiResponse } from "@src/shared/@types/api";
import type { IZone } from "./types";
import type { IFilter } from "@src/shared/@types/filter";

export const ZONES: IZone[] = [
  {
    id: "viana",
    name: "Viana",
    slug: "viana",
    isActive: true,
  },
  {
    id: "cazenga",
    name: "Cazenga",
    slug: "cazenga",
    isActive: true,
  },
  {
    id: "maianga",
    name: "Maianga",
    slug: "maianga",
    isActive: true,
  },
  {
    id: "capolo",
    name: "Capolo",
    slug: "capolo",
    isActive: true,
  },
  {
    id: "kilamba",
    name: "Kilamba",
    slug: "kilamba",
    isActive: true,
  },
  {
    id: "talatona",
    name: "Talatona",
    slug: "talatona",
    isActive: true,
  },
  {
    id: "ingombota",
    name: "Ingombota",
    slug: "ingombota",
    isActive: true,
  },
  {
    id: "cacuaco",
    name: "Cacuaco",
    slug: "cacuaco",
    isActive: true,
  },
  {
    id: "rangel",
    name: "Rangel",
    slug: "rangel",
    isActive: true,
  },
  {
    id: "samba",
    name: "Samba",
    slug: "samba",
    isActive: true,
  },
  {
    id: "benfica",
    name: "Benfica",
    slug: "benfica",
    isActive: true,
  },
  {
    id: "mutamba",
    name: "Mutamba",
    slug: "mutamba",
    isActive: true,
  },
  {
    id: "sambizanga",
    name: "Sambizanga",
    slug: "sambizanga",
    isActive: true,
  },
  {
    id: "mussulo",
    name: "Mussulo",
    slug: "mussulo",
    isActive: true,
  },
];

export const zoneService = {
  list: async (filters?: Partial<IFilter & { zoneName: string }>) => {
    try {
      return new Promise<IApiResponse<IZone[]>>((resolve) => {
        setTimeout(() => {
          resolve({
            data: ZONES.filter((zone) =>
              zone.name
                .toLowerCase()
                .includes(filters?.zoneName?.toLowerCase() || ""),
            ).slice(0, filters?.pageSize),
            message: "",
          });
        }, 500);
      });
      // const { data } = await client.get<IApiResponse<IZone[]>>("/zones");
      // return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro Desconhecido");
    }
  },
  getZone: async ({ zoneId }: { zoneId: string }) => {
    try {
      return new Promise<IApiResponse<IZone | undefined>>((resolve) => {
        setTimeout(() => {
          resolve({
            data: ZONES.find((zone) => zone.id === zoneId),
            message: "",
          });
        }, 500);
      });
      // const { data } = await client.get<IApiResponse<IZone | undefined>>(
      //   `/service-categories/${zoneId}`,
      // );
      // return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro Desconhecido");
    }
  },
};
