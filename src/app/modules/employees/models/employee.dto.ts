export interface CreateEmployeeDto {
    fullName: string;
    cui: string;
    email: string;
    phone: string;
    area: number;
    isSpecialist: boolean;
    startDate: string;
    salary: number;
    igssDiscount: number;
    irtraDiscount: number;
}


export interface EmployeeResponseDto {
    id: number;
    fullName: string;
    cui: string;
    phone: string;
    email: string;
    isSpecialist: boolean;
    createdAt: Date;
}

export interface EmployeeDto {
    id: number;
    fullName: string;
    cui: string;
    phone: string;
    email: string;
    isSpecialist: boolean;
    areaName: string;
    createdAt: Date;
    updatedAt: Date;
}