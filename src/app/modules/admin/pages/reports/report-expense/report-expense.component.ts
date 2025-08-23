import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportExpensePayEmployeeDto } from 'app/modules/admin/models/employees.dto';
import { ReportExpenseMedicinePurchacheDto } from 'app/modules/admin/models/pharmacy.dto';
import { PaymentService } from 'app/modules/employees/services/payment.service';
import { MedicineService } from 'app/modules/pharmacy/services/medicine.service';

@Component({
  selector: 'app-report-expense',
  imports: [FormsModule, CommonModule],
  templateUrl: './report-expense.component.html',
  styleUrl: './report-expense.component.css'
})
export class ReportExpenseComponent {

  private readonly _pharmacyService = inject(MedicineService)
  private readonly _paymentService = inject(PaymentService)

  filter: number = 0;
  startDate = '';
  endDate = '';

  reportPayEmployee: ReportExpensePayEmployeeDto = { totalAmount: 0, items: [] }
  reportPurches: ReportExpenseMedicinePurchacheDto = { amountExpense: 0, items: [] }


  getReportePaymentes() {
    if (this.startDate === '' || this.endDate === '') {
      this._paymentService.getReportPayEmployeeInRange().subscribe({
        next: value => {
          this.reportPayEmployee = value;
        }
      })

      return
    }

    this._paymentService.getReportPayEmployeeInRange(this.startDate, this.endDate).subscribe({
      next: value => {
        this.reportPayEmployee = value;
      }
    })
  }

  getReportePurches() {
    if (this.startDate === '' || this.endDate === '') {
      this._pharmacyService.getReportExpensePurchasesMedicineInRange().subscribe({
        next: value => {
          this.reportPurches = value;
        }
      })

      return
    }

    this._pharmacyService.getReportExpensePurchasesMedicineInRange(this.startDate, this.endDate).subscribe({
      next: value => {
        this.reportPurches = value;
      }
    })
  }

  generetedReport() {
    this.filter = Number(this.filter)
    switch (this.filter) {
      case 1:
        this.getReportePaymentes();
        this.reportPurches = { amountExpense: 0, items: [] };
        return;
      case 2:
        this.reportPayEmployee = { totalAmount: 0, items: [] };
        this.getReportePurches();
        return;

      default:
        this.getReportePaymentes();
        this.getReportePurches();
        return;
    }
  }

  getTotal(): number {
    return this.reportPayEmployee.totalAmount + this.reportPurches.amountExpense;
  }

  formatDateTime(date: any): string {
    const dateString = `${date}`
    const [datePart, timePart] = dateString.split('T');
    const time = timePart.slice(0, 5);

    return `${datePart} ${time} hrs`;
  }


}
