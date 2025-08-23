import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Bill, UpdateBill } from '@patients/models/bill.model';
import { Page, Pageable } from '@shared/models/pageable.model';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientBillsService {
  private readonly http = inject(HttpClient);
  private readonly apiUri = inject(ApiConfigService).API_PATIENT;

  getAllPatientBills(
    patientId: number,
    pageable: Pageable<keyof Bill> = {}
  ): Observable<Page<Bill>> {
    return this.http.get<Page<Bill>>(`${this.apiUri}/${patientId}/bills`, {
      params: { sort: ['createdAt,DESC'], size: 10, ...pageable },
    });
  }

  getPatientBillsByOpened(patientId: number): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiUri}/${patientId}/bills/opened`);
  }

  getPatientBillById(patientId: number, billId: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUri}/${patientId}/bills/${billId}`);
  }

  createPatientBill(patientId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUri}/${patientId}/bills`, {});
  }

  updatePatientBill(
    patientId: number,
    billId: number,
    bill: Partial<UpdateBill>
  ): Observable<void> {
    return this.http.put<void>(
      `${this.apiUri}/${patientId}/bills/${billId}`,
      bill
    );
  }
}
