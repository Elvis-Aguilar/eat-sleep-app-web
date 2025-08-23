export enum BillItemType {
  HOSPITALIZED = 'HOSPITALIZED',
  SURGERY = 'SURGERY',
  CONSULTATION = 'CONSULTATION',
  MEDICATION = 'MEDICATION',
}

export interface NewBillItem {
  concept: string;
  amount?: number;
  saleId?: number;
  admissionId?: number;
  surgeryId?: number;
  billId: number;
}

export type BillItem = Omit<
  NewBillItem,
  'saleId' | 'admissionId' | 'surgeryId' | 'billId'
> & {
  id: number;
  type: keyof typeof BillItemType;
  createdAt: string;
  updatedAt?: string;
};

export interface Bill {
  id: number;
  total?: number;
  isClosed: boolean;
  isPaid: boolean;
  items?: BillItem[];
  createdAt: string;
  updatedAt?: string;
}

export type NewBill = {};

export type UpdateBill = Pick<Bill, 'isClosed' | 'isPaid'>;
