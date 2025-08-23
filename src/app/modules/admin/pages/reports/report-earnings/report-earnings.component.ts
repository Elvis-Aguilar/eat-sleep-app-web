import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportExpensePayEmployeeDto } from 'app/modules/admin/models/employees.dto';
import { ReportIncomeBill } from 'app/modules/admin/models/patients.dto';
import { ReportExpenseMedicinePurchacheDto, ReportSalesTotal } from 'app/modules/admin/models/pharmacy.dto';
import { PatientsService } from 'app/modules/admin/services/patients.service';
import { PaymentService } from 'app/modules/employees/services/payment.service';
import { MedicineService } from 'app/modules/pharmacy/services/medicine.service';

@Component({
  selector: 'app-report-earnings',
  imports: [FormsModule, CommonModule],
  templateUrl: './report-earnings.component.html',
  styleUrl: './report-earnings.component.css'
})
export class ReportEarningsComponent {


  private readonly _pharmacyService = inject(MedicineService)
  private readonly _paymentService = inject(PaymentService)
  private readonly _patientService = inject(PatientsService)

  //income
  reportPharmacy: ReportSalesTotal = { totalIncome: 0, items: [] };
  reportWard: ReportIncomeBill = { totalIncome: 0, items: [] };

  //expose
  reportPayEmployee: ReportExpensePayEmployeeDto = { totalAmount: 0, items: [] }
  reportPurches: ReportExpenseMedicinePurchacheDto = { amountExpense: 0, items: [] }

  filter: number = 0;
  startDate = '';
  endDate = '';

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

  getReportParmacy() {
    if (this.startDate === '' || this.endDate === '') {
      this._pharmacyService.getReportSalesTotalInRange().subscribe({
        next: value => {
          this.reportPharmacy = value;
        }
      })

      return
    }

    this._pharmacyService.getReportSalesTotalInRange(this.startDate, this.endDate).subscribe({
      next: value => {
        this.reportPharmacy = value;
      }
    })
  }

  getReportWard() {
    if (this.startDate === '' || this.endDate === '') {
      this._patientService.getReportSalesTotalInRange().subscribe({
        next: value => {
          this.reportWard = value;
        }
      })

      return
    }

    this._patientService.getReportSalesTotalInRange(this.startDate, this.endDate).subscribe({
      next: value => {
        this.reportWard = value;
      }
    })
  }



  generetedReport() {
    this.getReportePaymentes()
    this.getReportePurches()
    this.getReportParmacy()
    this.getReportWard()

  }

  formatDateTime(date: any): string {
    const dateString = `${date}`
    const [datePart, timePart] = dateString.split('T');
    const time = timePart.slice(0, 5);

    return `${datePart} ${time} hrs`;
  }

  getTotalExpose(): number {
    return this.reportPayEmployee.totalAmount + this.reportPurches.amountExpense;
  }

  getTotalIncome(): number {
    return this.reportPharmacy.totalIncome + this.reportWard.totalIncome;

  }

  getTotalEarnings(): number {
    const expose: number = this.reportPayEmployee.totalAmount + this.reportPurches.amountExpense;
    const income: number = this.reportPharmacy.totalIncome + this.reportWard.totalIncome;
    return income - expose ;
  }



}
