import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NewRoom, Room } from '@patients/models/room.model';
import { Page } from '@shared/models/pageable.model';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private readonly http = inject(HttpClient);
  private readonly apiUri = inject(ApiConfigService).API_ROOM;

  getAllAvailableRooms(): Observable<Page<Room>> {
    return this.http.get<Page<Room>>(`${this.apiUri}`, {
      params: { isOccupied: false, isUnderMaintenance: false },
    });
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUri}/${id}`);
  }

  createRoom(room: NewRoom): Observable<void> {
    return this.http.post<void>(`${this.apiUri}`, room);
  }

  updateRoom(id: number, room: Room): Observable<void> {
    return this.http.put<void>(`${this.apiUri}/${id}`, room);
  }
}
