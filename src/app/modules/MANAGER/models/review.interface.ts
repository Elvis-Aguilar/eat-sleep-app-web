export interface Review {
    id: string;
    customerId: string;
    customerName: string;
    rating: number;
    comment: string;
    createdAt: Date;
}