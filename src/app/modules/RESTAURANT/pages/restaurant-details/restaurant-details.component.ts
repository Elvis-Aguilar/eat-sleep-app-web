import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { HandlerError } from '@shared/utils/handlerError';
import { UrlsUtils } from '@shared/utils/urls';
import { Restaurant } from 'app/modules/MANAGER/models/restaurant.interface';
import { Review } from 'app/modules/MANAGER/models/review.interface';
import { TimeFormatPipePipe } from 'app/modules/MANAGER/pipes/TimeFormat.pipe';
import { RestaurantService } from 'app/modules/MANAGER/service/restaurant.service';
import { ReviewService } from 'app/modules/MANAGER/service/review.service';
import { Session } from 'app/modules/session/models/auth';
import { AlertStore } from 'app/store/alert.store';

@Component({
  selector: 'app-restaurant-details',
  imports: [CommonModule, FormsModule, TimeFormatPipePipe],
  templateUrl: './restaurant-details.component.html',
})
export class RestaurantDetailsComponent {
  // inyectar el servicios
  private readonly route = inject(ActivatedRoute);
  private readonly restaurantService = inject(RestaurantService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly alertStore = inject(AlertStore);
  private readonly reviewsService = inject(ReviewService);

  // hangleerError
  HandlerError = HandlerError;

  // utils
  urlsUtils = UrlsUtils;

  // arreglo de reviews by id del restaurant
  reviews = signal<Review[]>([]);

  // restaurant seleccionado
  restaurant = signal<Restaurant | null>(null);

  pinionId!: string;
  restaurantImageUrl: string = '';
  session: Session = this.localStorageService.getState().session;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pinionId = params.get('id')!;
      this.getRestaurantById();
      this.getReviewsByRestaurantId();
    });

    this.restaurantImageUrl = this.urlsUtils.getRandomUrlRestaurant();
  }

  getRestaurantById() {
    this.restaurantService.getRestaurantById(this.pinionId).subscribe({
      next: (restaurant) => {
        this.restaurant.set(restaurant);
      },
      error: (error) => {
        const msgDefault = 'Error al obtener el restaurante. ';
        this.HandlerError.handleError(error, this.alertStore, msgDefault);
      },
    });
  }

  getReviewsByRestaurantId() {
    this.reviewsService.getAllRestaurant(this.pinionId).subscribe({
      next: (reviews) => {
        this.reviews.set(reviews);
      },
      error: (error) => {
        this.reviews.set([]);
        // TODO: manejar el error
      },
    });
  }
}
