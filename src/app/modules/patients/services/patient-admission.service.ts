import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Admission, NewAdmission } from '@patients/models/admission.model';
import { Page, Pageable } from '@shared/models/pageable.model';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientAdmissionService {
  private readonly http = inject(HttpClient);
  private readonly apiUri = inject(ApiConfigService).API_PATIENT;

  getAllPatientAdmissions(
    patientId: number,
    pageable: Pageable<keyof Admission> = {}
  ): Observable<Page<Admission>> {
    return this.http.get<Page<Admission>>(
      `${this.apiUri}/${patientId}/admissions`,
      {
        params: { sort: ['createdAt,DESC'], size: 10, ...pageable },
      }
    );
  }

  getPatientAdmissionByAdmitted(patientId: number): Observable<Admission[]> {
    return this.http.get<Admission[]>(
      `${this.apiUri}/${patientId}/admissions/admitted`
    );
  }

  getPatientAdmissionById(
    patientId: number,
    admissionId: number
  ): Observable<Admission> {
    return this.http.get<Admission>(
      `${this.apiUri}/${patientId}/admissions/${admissionId}`
    );
  }

  createPatientAdmission(
    patientId: number,
    admission: NewAdmission
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiUri}/${patientId}/admissions`,
      admission
    );
  }

  updatePatientAdmission(
    patientId: number,
    admissionId: number,
    admission: NewAdmission
  ): Observable<void> {
    return this.http.put<void>(
      `${this.apiUri}/${patientId}/admissions/${admissionId}`,
      admission
    );
  }
}
