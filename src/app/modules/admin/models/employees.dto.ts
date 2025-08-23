export interface PaymentEmployeeDto {
    employeeId: number;
    fullName: string;
    cui: string;
    amount: number;
    paidAt: Date;
}

export interface ReportExpensePayEmployeeDto {
    totalAmount: number;
    items: PaymentEmployeeDto[];
}