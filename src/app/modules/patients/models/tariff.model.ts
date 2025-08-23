export interface NewTariff {
  description: string;
  hospitalCost?: number;
  specialistFee?: number;
  price?: number;
}

export type Tariff = NewTariff & {
  id: number;
  createdAt: string;
  updatedAt?: string;
};
