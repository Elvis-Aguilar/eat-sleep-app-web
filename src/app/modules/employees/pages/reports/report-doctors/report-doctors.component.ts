import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HistoryAssignedEmployee } from 'app/modules/employees/models/reports.dto';
import { EmployeeService } from 'app/modules/employees/services/employee.service';

@Component({
  selector: 'app-report-doctors',
  imports: [FormsModule, CommonModule],
  templateUrl: './report-doctors.component.html',
  styleUrl: './report-doctors.component.css'
})
export class ReportDoctorsComponent {

  private readonly _employeeService = inject(EmployeeService)


  filter: number = 0;
  startDate = '';
  endDate = '';

  report: HistoryAssignedEmployee[] = [];


  genertedReport() {

    this.filter = Number(this.filter)
    if (this.startDate === '' || this.endDate === '') {
      this._employeeService.getAssignedReport(this.filter).subscribe({
        next: value => {
          this.report = value.report
        },
        error: err => {
          console.log(err);

        }
      })
      return
    }

    this._employeeService.getAssignedReport(this.filter, this.startDate, this.endDate).subscribe({
      next: value => {
        this.report = value.report
      },
      error: err => {
        console.log(err);

      }
    })


  }

}
