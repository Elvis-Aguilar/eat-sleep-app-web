export interface VacationPendingDto {
    employeeId: number;
    fullName: string;
    cui: string;
    //area work
    name: string;
    //vacation
    id: number;
    requestedDate: Date;
    startDate: Date;
    endDate: Date;
    approved: boolean;
    state: string;
}

export interface UpdateRequestVacationDto {
    approved: boolean;
}

export interface CreateRequestVacationDto {
    employeeId: number;
    startDate: string;
    days: number;
}