import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AreaResponseDto } from 'app/modules/employees/models/area.dto';
import { HistoryEmployeeContractsDto } from 'app/modules/employees/models/reports.dto';
import { AreaService } from 'app/modules/employees/services/area.service';
import { ContractService } from 'app/modules/employees/services/contract.service';

@Component({
  selector: 'app-history-contract',
  imports: [FormsModule, CommonModule],
  templateUrl: './history-contract.component.html',
  styleUrl: './history-contract.component.css'
})
export class HistoryContractComponent {

  private readonly _areaService = inject(AreaService)
  private readonly _contratacService = inject(ContractService)

  areas: AreaResponseDto[] = []


  idArea: number = 0;
  startDate = '';
  endDate = '';

  report: HistoryEmployeeContractsDto[] = []



  ngOnInit() {
    this.getAllAreas()
  }

  getAllAreas() {
    this._areaService.getAllAreas().subscribe({
      next: value => {
        this.areas = value
      }
    })
  }

  filter() {
    this.idArea = Number(this.idArea)
    if (this.startDate === '' || this.endDate === '') {
      this._contratacService.getEmployeeContractReport(this.idArea).subscribe({
        next: value =>{
          this.report = value.report
        }
      })
      return
    }

    this._contratacService.getEmployeeContractReport(this.idArea, this.startDate, this.endDate).subscribe({
      next: value =>{
        this.report = value.report
      }
    })

  }

}
