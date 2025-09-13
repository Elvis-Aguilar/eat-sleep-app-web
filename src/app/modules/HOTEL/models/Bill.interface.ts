export interface NewBill {
  refenceId: string;
  typeReference: string;
  amount: number;
}

export interface BillPdf {
  reservationId: string;
  startDate: string;
  endDate: string;
  state: string;
  pricePerDay: number;
  totalPrice: number;
  discountPercentage: number;
  roomNumber: string;
  hotelName: string;
  customerName: string;
  customerCui: string;
}
