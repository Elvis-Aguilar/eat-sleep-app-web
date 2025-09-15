import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly apiConfigService = inject(ApiConfigService);
  private readonly _http = inject(HttpClient);
  private readonly API_RESERVATION =
    this.apiConfigService.API_HOTEL_RESERVATIONS;

  constructor() {}

  getReservationById(id: string): Observable<Reservation> {
    return this._http.get<Reservation>(`${this.API_RESERVATION}/${id}`);
  }

  getAllReservationCurrentByRoomId(roomId: String): Observable<Reservation[]> {
    return this._http.get<Reservation[]>(
      `${this.API_RESERVATION}/rooms/current/${roomId}`
    );
  }

  getAllReservationByRoomId(roomId: String): Observable<Reservation[]> {
    return this._http.get<Reservation[]>(
      `${this.API_RESERVATION}/rooms/${roomId}`
    );
  }

  getReservationsByCustomerId(customerId: string): Observable<Reservation[]> {
    return this._http.get<Reservation[]>(
      `${this.API_RESERVATION}/customers/${customerId}`
    );
  }

  getReportRangeDate(range: { startDate: string; endDate: string }) {
    return this._http.post<Reservation[]>(
      `${this.API_RESERVATION}/report`,
      range
    );
  }
}
