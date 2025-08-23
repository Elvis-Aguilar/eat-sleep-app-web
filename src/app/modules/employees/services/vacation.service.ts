import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { CreateRequestVacationDto, UpdateRequestVacationDto, VacationPendingDto } from '../models/vacation.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private readonly API_VACATION = this.apiConfigService.API_VACATION;

  constructor() { }

  getAllVacationPending(): Observable<VacationPendingDto[]> {
    return this._http.get<VacationPendingDto[]>(`${this.API_VACATION}/pending`)
  }

  updatePendingVacations(vactionId:number, update:UpdateRequestVacationDto): Observable<VacationPendingDto[]> {
    return this._http.patch<VacationPendingDto[]>(`${this.API_VACATION}/update-state/${vactionId}`, update)
  }

  createVacationRequest(reques:CreateRequestVacationDto): Observable<VacationPendingDto> {
    return this._http.post<VacationPendingDto>(`${this.API_VACATION}/request`, reques)
  }

  getAllVacationApproved(): Observable<VacationPendingDto[]> {
    return this._http.get<VacationPendingDto[]>(`${this.API_VACATION}/approved`)
  }

}
