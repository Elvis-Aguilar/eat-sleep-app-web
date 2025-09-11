import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';
import { Review } from '../models/review.interface';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
 private readonly apiConfigService = inject(ApiConfigService);
  private readonly _http = inject(HttpClient);
  private readonly API_REVIEWS_HOTEL = this.apiConfigService.API_REVIEWS_HOTEL;
  private readonly API_REVIEWS = this.apiConfigService.API_REVIEWS;
  private readonly API_REVIEWS_RESTAURANT =
    this.apiConfigService.API_REVIEWS_RESTAURANT;
  private readonly API_REVIEWS_ROOM = this.apiConfigService.API_REVIEWS_ROOM;
  private readonly API_REVIEWS_DISHES = this.apiConfigService.API_REVIEWS_DISHES;

  constructor() {}

  getAllHotels(idHotel: string): Observable<Review[]> {
    return this._http.get<Review[]>(`${this.API_REVIEWS_HOTEL}/${idHotel}`);
  }

  getAllRestaurant(idRestaurant: string): Observable<Review[]> {
    return this._http.get<Review[]>(
      `${this.API_REVIEWS_RESTAURANT}/${idRestaurant}`
    );
  }

  getAllRooms(roomId: string): Observable<Review[]> {
    return this._http.get<Review[]>(`${this.API_REVIEWS_ROOM}/${roomId}`);
  }

  getAllDishes(dishesId: string): Observable<Review[]> {
    return this._http.get<Review[]>(`${this.API_REVIEWS_DISHES}/${dishesId}`);
  }

}
