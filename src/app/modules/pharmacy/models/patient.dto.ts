export interface PatientDto {
    id: number;
    fullName: string;
    cui: string;
    birthDate: Date;
    phone: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}