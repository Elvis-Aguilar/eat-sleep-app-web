export interface SaleMedicineDto {
    medicineId: number;
    name: string;
    unitCost: number;
    saleId: number;
    quantity: number;
    unitPrice: number;
    soldAt: Date;
    employeeId: number;
}


export interface ReportSalesTotal {
    totalIncome: number;
    items: SaleMedicineDto[]

}

export interface MedicinePurchacheDto {
    medicineId: number;
    name: string;
    purchaseId: number;
    quantity: number;
    unitCost: number;
    purchasedAt: Date;
}

export interface ReportExpenseMedicinePurchacheDto {
    amountExpense: number;
    items: MedicinePurchacheDto[];
}