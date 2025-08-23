import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportIncomeBill } from 'app/modules/admin/models/patients.dto';
import { ReportSalesTotal } from 'app/modules/admin/models/pharmacy.dto';
import { PatientsService } from 'app/modules/admin/services/patients.service';
import { MedicineService } from 'app/modules/pharmacy/services/medicine.service';

@Component({
  selector: 'app-report-income',
  imports: [FormsModule, CommonModule],
  templateUrl: './report-income.component.html',
  styleUrl: './report-income.component.css'
})
export class ReportIncomeComponent {

  private readonly _pharmacyService = inject(MedicineService)
  private readonly _patientService = inject(PatientsService)

  filter: number = 0;
  startDate = '';
  endDate = '';

  reportPharmacy: ReportSalesTotal = { totalIncome: 0, items: [] };
  reportWard: ReportIncomeBill = { totalIncome: 0, items: [] };


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
    this.filter = Number(this.filter)
    switch (this.filter) {
      case 1:
        this.getReportParmacy();
        this.reportWard = { totalIncome: 0, items: [] };
        return;
      case 2:
        this.reportPharmacy = { totalIncome: 0, items: [] };
        this.getReportWard();
        return;

      default:
        this.getReportParmacy();
        this.getReportWard();
        return;
    }
  }

  getTotal():number{
    return this.reportPharmacy.totalIncome + this.reportWard.totalIncome;
  }


  formatDateTime(date: any): string {
    const dateString = `${date}`
    const [datePart, timePart] = dateString.split('T');
    const time = timePart.slice(0, 5);

    return `${datePart} ${time} hrs`;
  }


}
