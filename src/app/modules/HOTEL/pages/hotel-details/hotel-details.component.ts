import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { HandlerError } from '@shared/utils/handlerError';
import { UrlsUtils } from '@shared/utils/urls';
import { Hotel } from 'app/modules/MANAGER/models/hotel.interface';
import { Review } from 'app/modules/MANAGER/models/review.interface';
import { HotelService } from 'app/modules/MANAGER/service/hotel.service';
import { ReviewService } from 'app/modules/MANAGER/service/review.service';
import { Session } from 'app/modules/session/models/auth';
import { AlertStore } from 'app/store/alert.store';

@Component({
  selector: 'app-hotel-details',
  imports: [],
  templateUrl: './hotel-details.component.html',
})
export class HotelDetailsComponent {
  // inyectar el servicios
  private readonly hotelService = inject(HotelService);
  private readonly route = inject(ActivatedRoute);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly alertStore = inject(AlertStore);
  private readonly reviewsService = inject(ReviewService);
  private readonly router = inject(Router);

  // utils
  urlsUtils = UrlsUtils;

  // hangleerError
  private HandlerError = HandlerError;

  // arreglo de reviews by id del hotel
  reviews = signal<Review[]>([]);

  // hotel seleccionado
  hotel = signal<Hotel | null>(null);

  pinionId!: string;
  hotelImageUrl: string = '';
  session: Session = this.localStorageService.getState().session;

  constructor() {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pinionId = params.get('id')!;
      this.getHotelById();
      this.getReviewsByHotelId();
    });

    this.hotelImageUrl = this.urlsUtils.getRandomUrl();
  }

  // get hotel by id
  getHotelById() {
    this.hotelService.getHotelById(this.pinionId).subscribe({
      next: (hotel) => {
        this.hotel.set(hotel);
      },
      error: (error) => {
        this.hotel.set(null);
        const msgDefault = 'Error al obtener la información del hotel. ';
        this.HandlerError.handleError(error, this.alertStore, msgDefault);
      },
    });
  }

  // get opiniones de un hotel segun su id
  getReviewsByHotelId() {
    this.reviewsService.getAllHotels(this.pinionId).subscribe({
      next: (reviews) => {
        this.reviews.set(reviews);
      },
      error: (error) => {
        this.reviews.set([]);
        // TODO: manejar el error
      },
    });
  }

  goRooms() {
    this.router.navigate(['hotel/rooms', this.pinionId]);
  }
}
