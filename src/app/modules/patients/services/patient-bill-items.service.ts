import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BillItem, NewBillItem } from '@patients/models/bill.model';
import { Page, Pageable } from '@shared/models/pageable.model';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientBillItemsService {
  private readonly http = inject(HttpClient);
  private readonly apiUri = inject(ApiConfigService).API_PATIENT;

  getAllPatientBillItems(
    patientId: number,
    pageable: Pageable<keyof BillItem> = {}
  ): Observable<Page<BillItem>> {
    return this.http.get<Page<BillItem>>(
      `${this.apiUri}/${patientId}/bills/items`,
      {
        params: { sort: ['createdAt,DESC'], size: 10, ...pageable },
      }
    );
  }

  getPatientBillById(
    patientId: number,
    billId: number,
    pageable: Pageable<keyof BillItem> = {}
  ): Observable<Page<BillItem>> {
    return this.http.get<Page<BillItem>>(
      `${this.apiUri}/${patientId}/bills/${billId}/items`,
      {
        params: { sort: ['createdAt,DESC'], size: 10, ...pageable },
      }
    );
  }

  createPatientConsultation(
    patientId: number,
    item: Omit<NewBillItem, 'amount'>
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiUri}/${patientId}/bills/consultations`,
      { ...item, amount: 1 }
    );
  }

  createPatientBillItem(
    patientId: number,
    billId: number,
    item: NewBillItem
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiUri}/${patientId}/bills/${billId}/items`,
      item
    );
  }
}
