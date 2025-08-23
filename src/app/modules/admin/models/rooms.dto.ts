export interface RoomResponseDto {
    id: number;
    number: string;
    costPerDay: number;
    isOccupied: boolean;
    underMaintenance: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateRoom {
    number: string;
    costPerDay: number;
}