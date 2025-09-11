import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../service/restaurant.service';
import { Dishes } from '../../models/restaurant.interface';
import { OpinionsModalComponent } from '../../components/opinions-modal/opinions-modal.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-manager-dishes',
  imports: [CurrencyPipe, OpinionsModalComponent],
  templateUrl: './manager-dishes.component.html',
})
export class ManagerDishesComponent {
  @ViewChild('modalOpinions')
  modalOpinions!: ElementRef<HTMLDialogElement>;

  // inyectar el servicios
  private readonly route = inject(ActivatedRoute);
  private readonly restaurantService = inject(RestaurantService);
  private readonly router = inject(Router);

  pinionId!: string;
  dishes = signal<Dishes[]>([]);
  showModal = signal<boolean>(false);
  titulo = signal<string>('');
  referenceId = signal<string>('');

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pinionId = params.get('id')!;
      this.getAllDisehsByRestaurantId(this.pinionId);
    });
  }

  getAllDisehsByRestaurantId(restaurantId: string) {
    this.restaurantService.getAllDishesByRestaurantId(restaurantId).subscribe({
      next: (dishes) => {
        this.dishes.set(dishes);
      },
      error: (error) => {
        this.dishes.set([]);
        console.error('Error fetching rooms:', error);
      },
    });
  }


  closeModalOpinions() {
    this.modalOpinions.nativeElement.close();
  }

  openModalOpinios(dishe: Dishes) {
    this.titulo.set(`Opiniones del Platillo ${dishe.name}`);
    this.referenceId.set(dishe.id);
    this.showModal.set(true);
    this.modalOpinions.nativeElement.showModal();
  }
}
