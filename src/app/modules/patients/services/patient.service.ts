import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NewPatient, Patient } from '@patients/models/patient.model';
import { Page, Pageable } from '@shared/models/pageable.model';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private readonly http = inject(HttpClient);
  private readonly apiUri = inject(ApiConfigService).API_PATIENT;

  getAllPatients(
    pageable: Pageable<keyof Patient | 'search'>
  ): Observable<Page<Patient>> {
    return this.http.get<Page<Patient>>(`${this.apiUri}`, {
      params: { ...pageable },
    });
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUri}/${id}`);
  }

  createPatient(patient: NewPatient): Observable<void> {
    return this.http.post<void>(`${this.apiUri}`, patient);
  }

  updatePatient(id: number, patient: NewPatient): Observable<void> {
    return this.http.put<void>(`${this.apiUri}/${id}`, patient);
  }
}
