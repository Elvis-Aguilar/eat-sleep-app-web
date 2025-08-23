import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';
import { RoleDto, UserEmployeeDto } from '../models/users.dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private readonly API_USER = this.apiConfigService.API_USER;
  private readonly API_ROLE = this.apiConfigService.API_ROL;

  findAllEmployeesWithActiveFalseUser(): Observable<UserEmployeeDto[]> {
    return this._http.get<UserEmployeeDto[]>(`${this.API_USER}/employees/active-false`)
  }

  findAllEmployeesWithActiveTrueUser(): Observable<UserEmployeeDto[]> {
    return this._http.get<UserEmployeeDto[]>(`${this.API_USER}/employees/active-true`)
  }

  updateUserActive(userId: number, active: boolean): Observable<void> {
    return this._http.put<void>(`${this.API_USER}/accounts/${userId}/active`, null, {
      params: { active: active.toString() }
    });
  }

  getAllRoles(): Observable<RoleDto[]> {
    return this._http.get<RoleDto[]>(`${this.API_ROLE}`)
  }


  updateUserRole(userId: number, roleId: number): Observable<void> {
    return this._http.put<void>(`${this.API_USER}/role/${userId}`, null, {
      params: { roleId: roleId }
    });
  }


  

}
