import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { CreateRoom, RoomResponseDto } from '../models/rooms.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private readonly _http = inject(HttpClient)
  private readonly apiConfigService = inject(ApiConfigService);
  private readonly API_ROOM = this.apiConfigService.API_ROOM;

  constructor() { }


  getAllRooms(): Observable<RoomResponseDto[]> {
    return this._http.get<RoomResponseDto[]>(`${this.API_ROOM}/all`)
  }

  createRoom(cerateRoom: CreateRoom): Observable<RoomResponseDto> {
    return this._http.post<RoomResponseDto>(`${this.API_ROOM}`, cerateRoom)
  }

  updateRoom(updateRoom: CreateRoom, roomId:number): Observable<RoomResponseDto> {
    return this._http.patch<RoomResponseDto>(`${this.API_ROOM}/${roomId}`, updateRoom)
  }
}
