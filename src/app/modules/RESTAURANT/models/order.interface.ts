export interface newOrder {
  discountPercentage: number;
  restaurantId: string;
  customerId: string;
  detailRequestDtoList: newItemOrder[];
}

export interface newItemOrder {
  dishId: string;
  quantity: number;
  discountPercentage: number;
}

export interface OrderDetail {
  id: string;
  quantity: number;
  unitPrice: number;
  unitCost: number;
  subtotal: number;
  discountPercentage: number;
  promotionId: string | null;
  orderId: string;
  dishId: string;
  dishName: string;
}

export interface Order {
  id: string;
  customerId: string;
  totalPrice: number;
  discountPercentage: number;
  promotionId: string | null;
  createdAt: string;
  restaurantId: string;
  restaurantName: string;
  details: OrderDetail[];
  customerName:string;
  customerCui:string;
}
