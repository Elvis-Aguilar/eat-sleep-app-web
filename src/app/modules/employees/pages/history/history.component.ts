import { Component, inject } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { EmployeeDto } from '../../models/employee.dto';
import { ContractDto } from '../../models/contract.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  private readonly _contractService = inject(ContractService)
  private readonly _employeeService = inject(EmployeeService)
  private readonly route = inject(Router)


  employee!: EmployeeDto;
  contracts: ContractDto[] = [];

  ngOnInit() {
    this.employee = this._employeeService.employee
    if (!this.employee) {
      this.route.navigate(['employee-management/employees'])
    }
    this.getHistory(this.employee.id)
  }

  getHistory(employeeId:number){
    this._contractService.getHistoryContractByEmployeeId(employeeId).subscribe({
      next: value =>{
        this.contracts = value
      }
    })
  }


}
