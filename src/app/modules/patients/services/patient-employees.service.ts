import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AssignedEmployee } from '@patients/models/employee.model';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdmissionEmployeesService {
  private readonly http = inject(HttpClient);
  private readonly apiConfig = inject(ApiConfigService);
  private readonly patientUri = this.apiConfig.API_PATIENT;
  private readonly employeeUri = this.apiConfig.API_ASSIGNED_EMPLOYEE;

  getAvailableEmployees(): Observable<AssignedEmployee[]> {
    return this.http.get<AssignedEmployee[]>(`${this.employeeUri}/assignable`);
  }

  getAllAdmissionAssignedEmployees(
    patientId: number,
    admissionId: number
  ): Observable<AssignedEmployee[]> {
    return this.http.get<AssignedEmployee[]>(
      `${this.patientUri}/${patientId}/admissions/${admissionId}/assigned-employees`
    );
  }

  assignEmployeesToAdmission(
    patientId: number,
    admissionId: number,
    employeeIds: number[]
  ): Observable<void> {
    return this.http.put<void>(
      `${this.patientUri}/${patientId}/admissions/${admissionId}/assigned-employees`,
      employeeIds
    );
  }
}
