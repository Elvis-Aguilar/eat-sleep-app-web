import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AssignedEmployee } from '@patients/models/employee.model';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurgerySpecialistsService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(ApiConfigService);
  private readonly patientUri = this.apiConfig.API_PATIENT;
  private readonly specialistUri = this.apiConfig.API_SURGERY_SPECIALISTS;
  private readonly employeeUri = this.apiConfig.API_ASSIGNED_EMPLOYEE;

  getAvailableSpecialists(): Observable<AssignedEmployee[]> {
    return this.http.get<AssignedEmployee[]>(
      `${this.specialistUri}/assignable`
    );
  }

  getAvailableEmployees(): Observable<AssignedEmployee[]> {
    return this.http.get<AssignedEmployee[]>(`${this.employeeUri}/assignable`);
  }

  getAllSurgerySpecialists(
    patientId: number,
    surgeryId: number
  ): Observable<AssignedEmployee[]> {
    return this.http.get<AssignedEmployee[]>(
      `${this.patientUri}/${patientId}/surgeries/${surgeryId}/specialists`
    );
  }

  assignSpecialistsToSurgery(
    patientId: number,
    surgeryId: number,
    specialistIds: number[]
  ): Observable<void> {
    return this.http.put<void>(
      `${this.patientUri}/${patientId}/surgeries/${surgeryId}/specialists`,
      specialistIds
    );
  }
}
