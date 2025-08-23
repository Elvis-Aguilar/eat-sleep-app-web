import { Injectable, inject } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';
import { ReportIncomeBill } from '../models/patients.dto';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private readonly apiConfig = inject(ApiConfigService);
  private readonly API_BILL_ITEMS = this.apiConfig.API_BILL_ITEMS;


  constructor(private http: HttpClient) { }

  getReportSalesTotalInRange(startDate?: string, endDate?: string): Observable<ReportIncomeBill> {
    let params = new HttpParams();

    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this.http.get<ReportIncomeBill>(`${this.API_BILL_ITEMS}/report/income`, { params })
  }

}
