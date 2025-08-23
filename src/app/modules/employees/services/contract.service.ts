import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';
import { ContractDto, FinishContractDto, NewContractDto, UpdateSalaryDto } from '../models/contract.dto';
import { ReportEmployeeContracts } from '../models/reports.dto';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private readonly API_CONTRACT = this.apiConfigService.API_CONTRACT;

  constructor() { }

  getFirstContractByEmployeeId(idEmployee: number): Observable<ContractDto> {
    return this._http.get<ContractDto>(`${this.API_CONTRACT}/latest/employee/${idEmployee}`)
  }

  createNewContract(create: NewContractDto): Observable<void> {
    return this._http.post<void>(`${this.API_CONTRACT}`, create)
  }

  finishContract(contractId: number, finish: FinishContractDto): Observable<void> {
    return this._http.patch<void>(`${this.API_CONTRACT}/finish/${contractId}`, finish);
  }

  updateSalary(contractId: number, update:UpdateSalaryDto): Observable<void> {
    return this._http.put<void>(`${this.API_CONTRACT}/update-salary/${contractId}`, update);
  }

  dismissalWork(contractId: number, finish: FinishContractDto): Observable<void> {
    return this._http.patch<void>(`${this.API_CONTRACT}/dismissal-work/${contractId}`, finish);
  }

  getHistoryContractByEmployeeId(idEmployee:number): Observable<ContractDto[]> {
    return this._http.get<ContractDto[]>(`${this.API_CONTRACT}/history/employee/${idEmployee}`)
  }

  getEmployeeContractReport(areId:number, startDate?: string, endDate?: string): Observable<ReportEmployeeContracts> {
    let params = new HttpParams();
    
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    
    return this._http.get<ReportEmployeeContracts>(`${this.API_CONTRACT}/reports/employees/history/${areId}`,  { params })
  }

  getReportTerminatedContracts(areId:number, startDate?: string, endDate?: string): Observable<ReportEmployeeContracts> {
    let params = new HttpParams();
    
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    
    return this._http.get<ReportEmployeeContracts>(`${this.API_CONTRACT}/reports/employees/history/terminated/${areId}`,  { params })
  }

}
