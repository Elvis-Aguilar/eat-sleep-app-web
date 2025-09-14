import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { PromotionService } from '../../service/Promotion.service';
import { NewPromotion, Promotion } from '../../models/promotion.interface';
import { NgClass } from '@angular/common';
import { HotelService } from '../../service/hotel.service';
import { CustomersService } from '../../service/customers.service';
import { Customer } from '../../models/customer.interface';
import { Dishes } from '../../models/restaurant.interface';
import { RestaurantService } from '../../service/restaurant.service';
import { FormsModule } from '@angular/forms';
import { AlertStore } from 'app/store/alert.store';
import { HandlerError } from '@shared/utils/handlerError';
import { Room } from '../../models/hotel.interface';

@Component({
  selector: 'app-manager-promotion',
  imports: [NgClass, FormsModule],
  templateUrl: './manager-promotion.component.html',
})
export class ManagerPromotionComponent {
  //modal ref
  @ViewChild('modalNewPromotion')
  modalNewPromotion!: ElementRef<HTMLDialogElement>;

  // inject services
  private readonly promotionService = inject(PromotionService);
  private readonly hotelService = inject(HotelService);
  private readonly customersService = inject(CustomersService);
  private readonly restaurantService = inject(RestaurantService);
  private readonly alertStore = inject(AlertStore);

  private HandlerError = HandlerError;

  // promociones
  promotionsRooms = signal<Promotion[]>([]);
  promotionsCustomers = signal<Promotion[]>([]);
  promotionsDishes = signal<Promotion[]>([]);

  // catalogos
  rooms = signal<Room[]>([]);
  customers = signal<Customer[]>([]);
  dishes = signal<Dishes[]>([]);

  // models
  refernces = signal<{ id: string; name: string }[]>([]);
  typeReference = signal<'room' | 'dishes' | 'customer'>('room');
  newPromotionModel = signal<NewPromotion>({
    refenceId: '',
    typeReference: 'room',
    name: '',
    description: '',
    discountPercentage: 0,
  });

  promotions = computed(() => [
    ...this.promotionsRooms(),
    ...this.promotionsCustomers(),
    ...this.promotionsDishes(),
  ]);

  ngOnInit(): void {
    this.getAllPromotionsByRoom();
    this.getAllPromotionsByCustomer();
    this.getAllPromotionsByDishes();
    this.getAllRooms();
    this.getAllCustomers();
    this.getAllDishes();
  }

  saveNewPromotion() {
    const newPromotion = this.newPromotionModel();
    // validar que los campos no esten vacios
    if (
      !newPromotion.name ||
      !newPromotion.description ||
      !newPromotion.refenceId ||
      !newPromotion.typeReference ||
      newPromotion.discountPercentage <= 0
    ) {
      this.alertStore.addAlert({
        message: 'Por favor, completa todos los campos',
        type: 'warning',
      });
      return;
    }

    // validaar que descripcion y name sean mayor a 6 caracteres
    if (newPromotion.description.trim().length < 6) {
      this.alertStore.addAlert({
        message: 'Descripcion debe contener mas de 6 carateres',
        type: 'warning',
      });
    }

    if (newPromotion.name.trim().length < 6) {
      this.alertStore.addAlert({
        message: 'Descripcion debe contener mas de 6 carateres',
        type: 'warning',
      });
    }

    newPromotion.typeReference = this.typeReference();

    this.promotionService.savePromotion(newPromotion).subscribe({
      next: (promotion) => {
        this.alertStore.addAlert({
          message: 'Promoción creada con éxito',
          type: 'success',
        });
        // cerrar modal
        this.modalNewPromotion.nativeElement.close();
        // reset form
        this.newPromotionModel.set({
          refenceId: '',
          typeReference: 'room',
          name: '',
          description: '',
          discountPercentage: 0,
        });
        // actualizar lista de promociones
        if (newPromotion.typeReference === 'room') {
          this.getAllPromotionsByRoom();
        } else if (newPromotion.typeReference === 'customer') {
          this.getAllPromotionsByCustomer();
        } else if (newPromotion.typeReference === 'dishes') {
          this.getAllPromotionsByDishes();
        }
      },
      error: (err) => {
        const msgDefault =
          'Error al registrar la promocion. Por favor, intente nuevamente más tarde.';
        this.HandlerError.handleError(err, this.alertStore, msgDefault);
        console.log(err);
      },
    });
  }

  getCatalogByTypeReference() {
    const type = this.typeReference();
    if (type === 'room') {
      this.refernces.set(
        this.rooms().map((room) => ({
          id: room.id,
          name: `Habitación: ${room.roomNumber} - Hotel: ${room.hotelName}`,
        }))
      );
    } else if (type === 'customer') {
      this.refernces.set(
        this.customers().map((customer) => ({
          id: customer.id,
          name: customer.fullName,
        }))
      );
    } else if (type === 'dishes') {
      this.refernces.set(
        this.dishes().map((dish) => ({
          id: dish.id,
          name: `platilo: ${dish.name} - Restaurante: ${dish.restaurantName}`,
        }))
      );
    } else {
      this.refernces.set([]);
    }
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

  // obtener habitaciones
  getAllRooms() {
    this.hotelService.getAllRooms().subscribe({
      next: (rooms) => {
        this.rooms.set(rooms);
        this.refernces.set(
          this.rooms().map((room) => ({
            id: room.id,
            name: `Habitación: ${room.roomNumber} - Hotel: ${room.hotelName}`,
          }))
        );
      },
      error: (err) => {
        this.rooms.set([]);
      },
    });
  }

  // obtener los clientes
  getAllCustomers() {
    this.customersService.getAllCustomers().subscribe({
      next: (customers) => {
        this.customers.set(customers);
      },
      error: (err) => {
        this.customers.set([]);
      },
    });
  }

  // obtener los platillos
  getAllDishes() {
    this.restaurantService.getAllDishes().subscribe({
      next: (dishes) => {
        this.dishes.set(dishes);
      },
      error: (err) => {
        this.dishes.set([]);
      },
    });
  }

  getTypeTraduc(type: 'ROOM' | 'CUSTOMER' | 'DISHES'): string {
    if (type === 'ROOM') {
      return 'Habitacion';
    }
    if (type === 'CUSTOMER') {
      return 'Cliente';
    }
    if (type === 'DISHES') {
      return 'Platillo';
    }
    return 'Otro';
  }
}
