import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  NewSurgery,
  Surgery,
  UpdateSurgery,
} from '@patients/models/surgery.model';
import { Page, Pageable } from '@shared/models/pageable.model';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientSurgeriesService {
  private readonly http = inject(HttpClient);
  private readonly apiUri = inject(ApiConfigService).API_PATIENT;

  getAllPatientSurgeries(
    patientId: number,
    pageable: Pageable<keyof Surgery> = {}
  ): Observable<Page<Surgery>> {
    return this.http.get<Page<Surgery>>(
      `${this.apiUri}/${patientId}/surgeries`,
      {
        params: { sort: ['createdAt,DESC'], size: 10, ...pageable },
      }
    );
  }

  getPatientSurgeryById(
    patientId: number,
    surgeryId: number
  ): Observable<Surgery> {
    return this.http.get<Surgery>(
      `${this.apiUri}/${patientId}/surgeries/${surgeryId}`
    );
  }

  createPatientSurgery(
    patientId: number,
    surgery: NewSurgery
  ): Observable<Surgery> {
    return this.http.post<Surgery>(
      `${this.apiUri}/${patientId}/surgeries`,
      surgery
    );
  }

  updatePatientSurgery(
    patientId: number,
    surgeryId: number,
    surgery: UpdateSurgery
  ): Observable<Surgery> {
    return this.http.put<Surgery>(
      `${this.apiUri}/${patientId}/surgeries/${surgeryId}`,
      surgery
    );
  }
}
