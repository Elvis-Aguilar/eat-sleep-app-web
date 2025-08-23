import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Medicine } from '../../models/inveontry';
import { MedicineService } from '../../services/medicine.service';
import { ReportSaleMedicineDto, ReportSalesPerEmployeeDto } from '../../models/sales.dto';


@Component({
  selector: 'app-reports',
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
})
export default class ReportsComponent {

  private readonly medicineService = inject(MedicineService);


  activeTab: string = 'medicamentos';

  medSearchTerm: string = '';
  profitSearchTerm: string = '';
  employeeSearchTerm: string = '';
  startDate: string = '';
  endDate: string = '';


  medicaments: Medicine[] = [];
  profits: ReportSaleMedicineDto[] = [];
  employeeSales: ReportSalesPerEmployeeDto[] = [];


  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.medicineService.getAll().subscribe(data => {
      this.medicaments = data;
    });
  }


  get filteredMedicaments(): Medicine[] {
    return this.medicaments.filter(item =>
      item.name.toLowerCase().includes(this.medSearchTerm.toLowerCase()));
  }

  get filteredProfits(): ReportSaleMedicineDto[] {
    let filtered = this.profits.filter(sale =>
      sale.name.toLowerCase().includes(this.profitSearchTerm.toLowerCase())
    );
    return filtered;
  }

  get filteredEmployeeSales(): ReportSalesPerEmployeeDto[] {
    let filtered = this.employeeSales.filter(employee =>
      employee.employeeName.toLowerCase().includes(this.employeeSearchTerm.toLowerCase()) ||
      employee.cui.toLowerCase().includes(this.employeeSearchTerm.toLowerCase())
    );

    return filtered;
  }

  calculateInventoryTotal(): number {
    return this.filteredMedicaments.reduce((total, item) => total + (item.stock * item.unitPrice), 0);
  }

  calculateProfitTotal(): number {
    return this.filteredProfits.reduce((total, sale) => total + sale.totalProfit, 0);
  }

  calculateEmployeeSalesTotal(): number {
    return this.filteredEmployeeSales.reduce((total, employee) => total + employee.totalProfit, 0);
  }

  gerReportSaleMedicine() {
    if (this.startDate === '' || this.endDate === '') {
      this.medicineService.getReportSalesMedicinePerMedicineInRange().subscribe({
        next: value => {
          this.profits = value;
        }
      })

      return
    }

    this.medicineService.getReportSalesMedicinePerMedicineInRange(this.startDate, this.endDate).subscribe({
      next: value => {
        this.profits = value;
      }
    })

  }

  getReportEmployees() {
    if (this.startDate === '' || this.endDate === '') {
      this.medicineService.getReportSalesMedicineEmployeeInRange().subscribe({
        next: value => {
          this.employeeSales = value;
        }
      })

      return
    }

    this.medicineService.getReportSalesMedicineEmployeeInRange(this.startDate, this.endDate).subscribe({
      next: value => {
        this.employeeSales = value;
      }
    })
  }
}