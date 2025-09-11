import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { RestaurantService } from '../../service/restaurant.service';
import { Router } from '@angular/router';
import { Restaurant } from '../../models/restaurant.interface';
import { OpinionsModalComponent } from '../../components/opinions-modal/opinions-modal.component';
import { TimeFormatPipePipe } from '../../pipes/TimeFormat.pipe';

@Component({
  selector: 'app-manager-restaurant',
  imports: [OpinionsModalComponent, TimeFormatPipePipe],
  templateUrl: './manager-restaurant.component.html',
})
export class ManagerRestaurantComponent {
  @ViewChild('modalOpinions')
  modalOpinions!: ElementRef<HTMLDialogElement>;

  // injeccion dependencias
  private readonly restaurantSerivce = inject(RestaurantService);
  private readonly route = inject(Router);

  // variables
  restaurants = signal<Restaurant[]>([]);
  titulo = signal<string>('');
  referenceId = signal<string>('');
  showModal = signal<boolean>(false);

  ngOnInit(): void {
    this.getAllRestaurans();
  }

  getAllRestaurans() {
    this.restaurantSerivce.getAllRestaurants().subscribe({
      next: (restaurants) => {
        this.restaurants.set(restaurants);
      },
      error: (error) => {
        this.restaurants.set([]);
        console.error('Error fetching hotels:', error);
      },
    });
  }

  goDishes(dishesId: string) {
    this.route.navigate(['manager/restaurants/dishes', dishesId]);
  }

  closeModalOpinions() {
    this.modalOpinions.nativeElement.close();
  }

  openModalOpinios(restaurant: Restaurant) {
    this.titulo.set(`Opiniones del restaurante ${restaurant.name}`);
    this.referenceId.set(restaurant.id);
    this.showModal.set(true);
    this.modalOpinions.nativeElement.showModal();
  }
}
