import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { AreaResponseDto } from '../models/area.dto';
import { Observable } from 'rxjs';
import { CreateAreaDto, UpdateAreaDto } from '../models/create-area.dto';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private readonly API_AREA = this.apiConfigService.API_AREA;
  //private readonly API_EMPLOYEE =this.apiConfigService.API_EMPLOYEE; 

  constructor() { }

  getAllAreas(): Observable<AreaResponseDto[]> {
    return this._http.get<AreaResponseDto[]>(`${this.API_AREA}`)
  }

  createArea(createArea: CreateAreaDto): Observable<AreaResponseDto> {
    return this._http.post<AreaResponseDto>(`${this.API_AREA}`, createArea)
  }

  updateNameArea(updateArea: UpdateAreaDto, idArea:number): Observable<AreaResponseDto> {
    return this._http.patch<AreaResponseDto>(`${this.API_AREA}/${idArea}`, updateArea)
  }

}
