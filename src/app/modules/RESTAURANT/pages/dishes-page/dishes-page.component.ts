import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpinionsModalComponent } from 'app/modules/MANAGER/components/opinions-modal/opinions-modal.component';
import { Dishes } from 'app/modules/MANAGER/models/restaurant.interface';
import { RestaurantService } from 'app/modules/MANAGER/service/restaurant.service';

@Component({
  selector: 'app-dishes-page',
  imports: [CurrencyPipe, OpinionsModalComponent],
  templateUrl: './dishes-page.component.html',
})
export class DishesPageComponent {
  @ViewChild('modalOpinions')
  modalOpinions!: ElementRef<HTMLDialogElement>;

  // inyectar el servicios
  private readonly route = inject(ActivatedRoute);
  private readonly restaurantService = inject(RestaurantService);

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
