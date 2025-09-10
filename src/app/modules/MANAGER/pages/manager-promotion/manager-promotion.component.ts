import { Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { PromotionService } from '../../service/Promotion.service';
import { Promotion } from '../../models/promotion.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-manager-promotion',
  imports: [NgClass],
  templateUrl: './manager-promotion.component.html',
})
export class ManagerPromotionComponent {


  //modal ref
  @ViewChild('modalNewPromotion')
  modalNewPromotion!: ElementRef<HTMLDialogElement>;

  // inject services
  private readonly promotionService = inject(PromotionService);

  promotionsRooms = signal<Promotion[]>([]);
  promotionsCustomers = signal<Promotion[]>([]);
  promotionsDishes = signal<Promotion[]>([]);

  promotions = computed(() => [
    ...this.promotionsRooms(),
    ...this.promotionsCustomers(),
    ...this.promotionsDishes(),
  ]);

  ngOnInit(): void {
    this.getAllPromotionsByRoom();
    this.getAllPromotionsByCustomer();
    this.getAllPromotionsByDishes();
  }

  getAllPromotionsByRoom() {
    this.promotionService.getAllPromotionsByRoom().subscribe({
      next: (promotions) => {
        this.promotionsRooms.set(promotions);
        // recorer el arreglo y asignarel el type = 'ROOM'
        this.promotionsRooms.update((promotions) =>
          promotions.map((promotion) => ({
            ...promotion,
            type: 'ROOM',
          }))
        );
      },
      error: (err) => {
        this.promotionsRooms.set([]);
      },
    });
  }

  getAllPromotionsByCustomer() {
    this.promotionService.getAllPromotionsByCustomer().subscribe({
      next: (promotions) => {
        this.promotionsCustomers.set(promotions);
        // recorer el arreglo y asignarel el type = 'CUSTOMER'
        this.promotionsCustomers.update((promotions) =>
          promotions.map((promotion) => ({
            ...promotion,
            type: 'CUSTOMER',
          }))
        );
      },
      error: (err) => {
        this.promotionsCustomers.set([]);
      },
    });
  }

  getAllPromotionsByDishes() {
    this.promotionService.getAllPromotionsByDishes().subscribe({
      next: (promotions) => {
        this.promotionsDishes.set(promotions);
        // recorer el arreglo y asignarel el type = 'DISHES'
        this.promotionsDishes.update((promotions) =>
          promotions.map((promotion) => ({
            ...promotion,
            type: 'DISHES',
          }))
        );
      },
      error: (err) => {
        this.promotionsDishes.set([]);
      },
    });
  }


  openModal() {
    this.modalNewPromotion.nativeElement.showModal();
  }
}
