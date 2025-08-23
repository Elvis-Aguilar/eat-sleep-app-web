import { Component, inject } from '@angular/core';
import { AreaResponseDto } from '../../models/area.dto';
import { FormsModule } from '@angular/forms';
import { AreaService } from '../../services/area.service';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeDto } from '../../models/employee.dto';
import { Router } from '@angular/router';
import { SlugService } from '@shared/services/slug.service';

@Component({
  selector: 'app-employees',
  imports: [FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  private readonly _areaService = inject(AreaService)
  private readonly _employeeService = inject(EmployeeService)
  private readonly slugSevice = inject(SlugService)
  private readonly route = inject(Router)



  areas: AreaResponseDto[] = []
  employees: EmployeeDto[] = []
  idArea: number = 0;


  ngOnInit() {
    this.getAllAreas()
    this.getAllEmployees()
  }

  getAllAreas() {
    this._areaService.getAllAreas().subscribe({
      next: value => {
        this.areas = value
      }
    })
  }

  getAllEmployees() {
    this._employeeService.getAllEmployees().subscribe({
      next: value => {        
        this.employees = value
      }
    })
  }


  getAllEmployeesByAreaId() {
    this._employeeService.getAllEmployeesByAreaId(this.idArea).subscribe({
      next: value => {
        this.employees = value
      }
    })
  }



  filter() {
    this.idArea = Number(this.idArea)
    if (this.idArea > 0) {
      this.getAllEmployeesByAreaId()
      return
    }

    this.getAllEmployees();

  }

  goManagmentEmployee(employee:EmployeeDto){
    this._employeeService.employee = employee
    const slug = this.slugSevice.generateSlug(employee.cui);
    this.route.navigate([`employee-management/view-employee/${slug}`]);
  }

  goHistory(employee:EmployeeDto){
    this._employeeService.employee = employee
    const slug = this.slugSevice.generateSlug(employee.cui);
    this.route.navigate([`employee-management/view-history/${slug}`]);
  }

}
