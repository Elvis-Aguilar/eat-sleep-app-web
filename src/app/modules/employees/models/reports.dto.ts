import { ContractDto } from "./contract.dto";

export interface ReportEmployeeContracts {
    report: HistoryEmployeeContractsDto[];
}

export interface HistoryEmployeeContractsDto {
    id: number;
    fullName: string;
    cui: string;
    email: string;
    areaName: string;
    contracts: ContractDto[];
}

export interface AssignedDto {
    admissionDate: Date;
    dischargeDate: Date;
    fullName: string;
    cui: string;
}

export interface HistoryAssignedEmployee {
    id: number;
    fullName: string;
    cui: string
    email: string;
    contract: ContractDto;
    assignedList: AssignedDto[];
}

export interface ReportAssignedEmployeeDto {
    report: HistoryAssignedEmployee[];
}