import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { CreateEmployeeDto, EmployeeDto, EmployeeResponseDto } from '../models/employee.dto';
import { Observable } from 'rxjs';
import { ReportAssignedEmployeeDto } from '../models/reports.dto';
import { UpdateEmployeeDto } from '../models/contract.dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private readonly API_EMPLOYEE = this.apiConfigService.API_EMPLOYEE;

  employee!: EmployeeDto;

  constructor() { }

  createArea(createEmployee: CreateEmployeeDto): Observable<EmployeeResponseDto> {
    return this._http.post<EmployeeResponseDto>(`${this.API_EMPLOYEE}`, createEmployee)
  }

  getAllEmployees(): Observable<EmployeeDto[]> {
    return this._http.get<EmployeeDto[]>(`${this.API_EMPLOYEE}`)
  }

  getAllEmployeesByAreaId(roleId: number): Observable<EmployeeDto[]> {
    return this._http.get<EmployeeDto[]>(`${this.API_EMPLOYEE}/area/${roleId}`)
  }

  getAssignedReport(filter: number, startDate?: string, endDate?: string): Observable<ReportAssignedEmployeeDto> {
    let params = new HttpParams();

    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    return this._http.get<ReportAssignedEmployeeDto>(`${this.API_EMPLOYEE}/assigned/report/doctors/${filter}`, { params })
  }

  updateAreaEmployee(employeeId:number, employeeUpdate:UpdateEmployeeDto): Observable<void> {
    return this._http.put<void>(`${this.API_EMPLOYEE}/${employeeId}`, employeeUpdate)
  }

}
