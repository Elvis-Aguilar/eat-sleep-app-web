// src/app/services/medicine.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicine } from '../models/inveontry';
import { ApiConfigService } from '@shared/services/api-config.service';
import { CreatePurchacheDto } from '../models/purches.dto';
import { PatientDto } from '../models/patient.dto';
import { CreateSaleDto, ItemsSaleMedicineDto, ReportSaleMedicineDto, ReportSalesPerEmployeeDto } from '../models/sales.dto';
import { ReportExpenseMedicinePurchacheDto, ReportSalesTotal } from 'app/modules/admin/models/pharmacy.dto';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private readonly apiConfig = inject(ApiConfigService);
  private baseUrl = this.apiConfig.API_MEDICINE;
  private readonly API_PURCHES = this.apiConfig.API_PURCHES;
  private readonly API_PATIENT = this.apiConfig.API_PATIENT;
  private readonly API_SALES = this.apiConfig.API_SALES

  constructor(private http: HttpClient) { }

  getAll(name?: string): Observable<Medicine[]> {
    let params = new HttpParams();
    if (name) params = params.set('name', name);
    return this.http.get<Medicine[]>(this.baseUrl, { params });
  }

  getById(id: number): Observable<Medicine> {
    return this.http.get<Medicine>(`${this.baseUrl}/${id}`);
  }

  create(medicine: Partial<Medicine>): Observable<Medicine> {
    return this.http.post<Medicine>(this.baseUrl, medicine);
  }

  update(id: number, medicine: Partial<Medicine>): Observable<Medicine> {
    return this.http.put<Medicine>(`${this.baseUrl}/${id}`, medicine);
  }

  createPurches(purhc: CreatePurchacheDto, medicineId: number): Observable<void> {
    return this.http.post<void>(`${this.API_PURCHES}/${medicineId}`, purhc);
  }

  getAllPatientes(): Observable<PatientDto[]> {
    return this.http.get<PatientDto[]>(`${this.API_PATIENT}/all`);
  }

  createSale(sale: CreateSaleDto): Observable<void> {
    return this.http.post<void>(`${this.API_SALES}`, sale);
  }


  getReportSalesMedicinePerMedicineInRange(startDate?: string, endDate?: string): Observable<ReportSaleMedicineDto[]> {
    let params = new HttpParams();

    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this.http.get<ReportSaleMedicineDto[]>(`${this.API_SALES}/report/medicine`, { params })
  }

  getReportSalesMedicineEmployeeInRange(startDate?: string, endDate?: string): Observable<ReportSalesPerEmployeeDto[]> {
    let params = new HttpParams();

    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this.http.get<ReportSalesPerEmployeeDto[]>(`${this.API_SALES}/report/employees`, { params })
  }


  getReportSalesTotalInRange(startDate?: string, endDate?: string): Observable<ReportSalesTotal> {
    let params = new HttpParams();

    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this.http.get<ReportSalesTotal>(`${this.API_SALES}/report/income`, { params })
  }

  getReportExpensePurchasesMedicineInRange(startDate?: string, endDate?: string): Observable<ReportExpenseMedicinePurchacheDto> {
    let params = new HttpParams();

    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);

    return this.http.get<ReportExpenseMedicinePurchacheDto>(`${this.API_PURCHES}/report/Expense`, { params })
  }

}
