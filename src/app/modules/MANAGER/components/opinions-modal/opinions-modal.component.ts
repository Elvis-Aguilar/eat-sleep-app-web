import {
  Component,
  EventEmitter,
  inject,
  input,
  Output,
  signal,
} from '@angular/core';
import { Review } from '../../models/review.interface';
import { ReviewService } from '../../service/review.service';

@Component({
  selector: 'app-opinions-modal',
  imports: [],
  templateUrl: './opinions-modal.component.html',
})
export class OpinionsModalComponent {
  // output
  @Output() close = new EventEmitter<void>();

  // inputs
  titulo = input.required<string>();
  type = input.required<'room' | 'dishes' | 'hotel' | 'restaurant'>();
  refernceId = input.required<string>();

  private readonly reviewsService = inject(ReviewService);
  reviews = signal<Review[]>([]);

  ngOnInit(): void {
    this.getReviews();
  }

  ngOnChanges(): void {
    this.getReviews();
  }

  onClose() {
    this.close.emit();
  }

  getReviews() {
    this.reviews.set([])
    if (this.type() === 'dishes') {
      this.getReviewsByDishesId();
    }
    if (this.type() === 'hotel') {
      this.getReviewsByHotelId();
    }
    if (this.type() === 'restaurant') {
      this.getReviewsByRestauranId();
    }
    if (this.type() === 'room') {
      this.getReviewsByRoomId();
    }
  }

  getReviewsByHotelId() {
    this.reviewsService.getAllHotels(this.refernceId()).subscribe({
      next: (reviews) => {
        this.reviews.set(reviews);
      },
      error: (error) => {
        this.reviews.set([]);
      },
    });
  }

  getReviewsByRestauranId() {
    this.reviewsService.getAllRestaurant(this.refernceId()).subscribe({
      next: (reviews) => {
        this.reviews.set(reviews);
      },
      error: (error) => {
        this.reviews.set([]);
      },
    });
  }

  getReviewsByDishesId() {
    this.reviewsService.getAllDishes(this.refernceId()).subscribe({
      next: (reviews) => {
        this.reviews.set(reviews);
      },
      error: (error) => {
        this.reviews.set([]);
      },
    });
  }

  getReviewsByRoomId() {
    this.reviewsService.getAllRooms(this.refernceId()).subscribe({
      next: (reviews) => {
        this.reviews.set(reviews);
      },
      error: (error) => {
        this.reviews.set([]);
      },
    });
  }
}
