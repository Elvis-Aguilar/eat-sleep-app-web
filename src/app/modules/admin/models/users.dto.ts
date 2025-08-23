export interface UserEmployeeDto {
    //User
    id: number;
    active: boolean;
    roleName: string;
    createdAt: Date;
    updatedAt: Date;
    //employee
    employeeId: number;
    fullName: string;
    cui: string;
    phone: string;
    email: string;
    isSpecialist: boolean;
    areaName: string;
}

export interface RoleDto {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}