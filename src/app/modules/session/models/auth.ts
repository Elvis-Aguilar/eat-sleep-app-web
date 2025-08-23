export interface Login {
    email: string
    password: string
}

export interface Register {
    cui: string;
    email: string;
    password: string;
}

export interface Confirmation {
    email: string
    code: string
}

export interface Recover {
    email: string
    code: string
    password: string
}
export interface Session {
    token: string
    id: number
    email: string
    cui: string
    active: boolean
    roleName: Rol
}

export enum Rol {
    PHARMACY = "Encargado de Farmacia",
    EMPLOYEE = "Encargado de Empleados",
    PATIENT = "Encargado de Pacientes",
    ADMIN = "Administrador"
}