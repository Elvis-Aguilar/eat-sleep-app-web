export interface Reservation {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  state: string;
  pricePerDay: number;
  totalPrice: number;
  maintenanceCostPerDay: number;
  totalCost: number;
  discountPercentage: number;
  roomId: string;
  customerName:string;
  roomName:string;
}
