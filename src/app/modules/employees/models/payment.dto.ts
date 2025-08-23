export interface PaymentPerSurgeryDto {
    //tariff
    specialistFee: number;

    //Surgery
    id: number;
    description: string,
    performedDate: string,

    //employee
    employeeId: string,
    fullName: string,
    Cui: string
}