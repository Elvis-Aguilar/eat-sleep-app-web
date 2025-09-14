export interface Hotel {
  id: string;
  name: string;
  address: string;
  phone: string;
  totalRooms: number;
  imageUrl: string;
}

export interface Room {
    id: string;
    roomNumber: string;
    pricePerDay: number;
    costMaintenancePerDay: number;
    description: string;
    capacity: number;
    state:string;
    hotelName:string;
    urlImage: string;
}
