export interface ItemSaleDto {
    quantity: number;
    medicineId: number;
}

export interface CreateSaleDto {
    patientId: number;
    //cui:string;
    items: ItemSaleDto[];
}

export interface ItemsSaleMedicineDto {
    saleId: number;
    quantity: number;
    unitPrice: number;
    soldAt: Date;
    unitCost: number;
    Subtotal: number;
    SubCost: number;
    Profit: number;
}

export interface ReportSaleMedicineDto {
    medicineId: number;
    name: string;
    totalSold: number;
    totalIncome: number;
    totalProfit: number;
    items: ItemsSaleMedicineDto[];
    showDetails: boolean;
}

export interface ItemsSalePerEmployeeDto {
    saleId: number;
    quantity: number;
    unitPrice: number;
    soldAt: Date;
    unitCost: number;
    name: string;
    Subtotal: number;
    SubCost: number;
    Profit: number;
}

export interface ReportSalesPerEmployeeDto {
    employeeId: number;
    employeeName: string;
    cui: string;
    totalSold: number;
    totalIncome: number;
    totalProfit: number;
    items: ItemsSalePerEmployeeDto[];
    showDetails: boolean;
}