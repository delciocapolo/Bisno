export interface BisnoCreatedPayload {
  bisnoId: string;
  zoneId: string;
  categoryId: string;
}

export interface DistributionStartPayload {
  bisnoId: string;
}

export interface NotificationSendPayload {
  bisnoId: string;
  mixeiroId: string;
  mixeiroMobile: string;
  description: string;
}