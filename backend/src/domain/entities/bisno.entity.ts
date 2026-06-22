export type BisnoStatusType = "pending" | "matched" | "done" | "exhausted";

export class Bisno {
  constructor(
    public readonly id: string,
    public readonly zoneId: string,
    public readonly serviceId: string,
    public readonly createdAt: string,
    public customerName: string,
    public customerMobile: string,
    public customerMobileHasWhatsapp: boolean,
    public description: string | null,
    public status: BisnoStatusType = "pending",
    public distributionRound: number,
  ) {}

  markAsExhausted(): void {
    if (this.status !== "pending") {
      throw new Error("It's only possible to mark a bisno pending as exhausted");
    }
    this.status = "exhausted";
  }

  incrementDistributionRound(): void {
    this.distributionRound += 1;
  }
}
