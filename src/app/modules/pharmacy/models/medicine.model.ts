export interface Medicine {
  id?: string;
  name: string;
  genericName: string;
  manufacturer: string;
  category: string;
  unitPrice: number;
  cost: number;
  stock: number;
  minStock: number;
  expiryDate: Date;
  description?: string;
  dosage: string;
  sideEffects?: string;
  createdAt?: Date;
  updatedAt?: Date;
} 