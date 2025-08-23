export interface BillItemReportDto {
    id: number;
    concept: string;
    amount: number;
    type: string;
    createdAt: Date;
}

export interface ReportIncomeBill {
    totalIncome: number;
    items: BillItemReportDto[];
}