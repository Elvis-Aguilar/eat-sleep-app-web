import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { PaymentPerSurgeryDto } from '../models/payment.dto';
import { Observable } from 'rxjs';
import { ReportExpensePayEmployeeDto } from 'app/modules/admin/models/employees.dto';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private readonly API_PAYMENT = this.apiConfigService.API_PAYMENT;

  constructor() { }

  createPayment(createPayment: PaymentPerSurgeryDto): Observable<PaymentPerSurgeryDto> {
    return this._http.post<PaymentPerSurgeryDto>(`${this.API_PAYMENT}`, createPayment)
  }

  getAllPayments(): Observable<PaymentPerSurgeryDto[]> {
    return this._http.get<PaymentPerSurgeryDto[]>(`${this.API_PAYMENT}`)
  }

  getReportPayEmployeeInRange(startDate?: string, endDate?: string): Observable<ReportExpensePayEmployeeDto> {
    let params = new HttpParams();

    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this._http.get<ReportExpensePayEmployeeDto>(`${this.API_PAYMENT}/report/Expense`, { params })
  }
}
