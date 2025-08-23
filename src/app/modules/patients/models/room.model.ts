export interface NewRoom {
  number: string;
  costPerDay?: number;
}

export type Room = NewRoom & {
  id: number;
  isOccupied: boolean;
  isUnderMaintenance: boolean;
  createdAt: string;
  updatedAt?: string;
};
