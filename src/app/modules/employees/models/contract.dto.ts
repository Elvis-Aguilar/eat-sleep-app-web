export interface ContractDto {
    id: number;
    salary: number;
    igssDiscount: number;
    irtraDiscount: number;
    terminationReason: string;
    terminationDescription: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface NewContractDto {
    idContract: number;
    idEmployee: number;
    salary: number;
    igssDiscount: number;
    irtraDiscount: number;
}

export interface FinishContractDto {
    description: string;
    cui: string;
}

export interface UpdateSalaryDto {
    salary: number;
    isIncrement: boolean;
}

export interface UpdateEmployeeDto {
    phone: string;
    email: string;
    areId: number;
}