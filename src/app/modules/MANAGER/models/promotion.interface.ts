export interface Promotion {
    id: string;
    name: string;
    description: string;
    discountPercentage: number;
    active: boolean;
    type: 'ROOM' | 'CUSTOMER' | 'DISHES';
}

export interface NewPromotion {
    refenceId: string;
    typeReference: 'room' | 'dishes' | 'customer';
    name: string;
    description: string;
    discountPercentage: number;
}