import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { EmployeeDto } from '../models/employee.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private readonly API_EMPLOYEE = this.apiConfigService.API_EMPLOYEE;
  private readonly API_PAY_EMPLOYEES = `${this.apiConfigService.API_PAY_EMPLOYEES}`;

  constructor() { }

  getAllEmployeesNoManager(): Observable<EmployeeDto[]> {
    return this._http.get<EmployeeDto[]>(`${this.API_EMPLOYEE}/all/no-manager`)
  }

  payAllEmployees(startDate: string, endDate: string): Observable<void> {
    return this._http.post<void>(`${this.API_PAY_EMPLOYEES}`, { startDate, endDate })
  }

}
