import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'app/modules/MANAGER/models/customer.interface';
import { Promotion } from 'app/modules/MANAGER/models/promotion.interface';
import { Dishes } from 'app/modules/MANAGER/models/restaurant.interface';
import { CustomersService } from 'app/modules/MANAGER/service/customers.service';
import { PromotionService } from 'app/modules/MANAGER/service/Promotion.service';
import { RestaurantService } from 'app/modules/MANAGER/service/restaurant.service';
import { newItemOrder, newOrder } from '../../models/order.interface';
import { AlertStore } from 'app/store/alert.store';
import { HandlerError } from '@shared/utils/handlerError';

@Component({
  selector: 'app-sale-page',
  imports: [CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './sale-page.component.html',
})
export class SalePageComponent {
  private readonly restaurantService = inject(RestaurantService);
  private readonly route = inject(ActivatedRoute);
  private readonly customerSevice = inject(CustomersService);
  private readonly promotionService = inject(PromotionService);
  private readonly alertStore = inject(AlertStore);

  private HandlerError = HandlerError;

  pinionId!: string;
  dishes = signal<Dishes[]>([]);
  customerId: string = '';
  customers: Customer[] = [];
  promotionDish = signal<Promotion[]>([]);
  promotionCustomer = signal<Promotion[]>([]);

  saleItems: {
    dishId: string;
    name: string;
    price: number;
    quantity: number;
    discountPercentage: number;
  }[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pinionId = params.get('id')!;
      this.getAllDisehsByRestaurantId(this.pinionId);
    });
    this.loadCustomers();
    this.getPromotionByCustomer();
    this.getAllPromotionsByDishes();
  }

  loadCustomers() {
    this.customerSevice.getAllCustomers().subscribe({
      next: (customer) => {
        this.customers = customer;
      },
      error: (err) => {
        console.log(err);
      },
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

  increaseQuantity(item: { dishId: string; quantity: number }) {
    item.quantity++;
  }

  decreaseQuantity(item: { dishId: string; quantity: number }) {
    item.quantity--;
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }

  removeItem(item: { dishId: string }) {
    this.saleItems = this.saleItems.filter((i) => i.dishId !== item.dishId);
  }

  addToOrder(dish: Dishes) {
    
    const existingItem = this.saleItems.find((item) => item.dishId === dish.id);
    if (existingItem) return;    
    const discount = this.getDiscountDishId(dish.id);

    this.saleItems.push({
      discountPercentage: discount,
      dishId: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: 1,
    });
  }

  getDiscountDishId(dishId: string): number {
    return (
      this.promotionDish().find((prom) => prom.id === dishId)
        ?.discountPercentage || 0
    );
  }

  getDiscountCustomerId(): number {
    if (this.customerId === '') {
      return 0;
    }

    return (
      this.promotionCustomer().find((prom) => prom.id === this.customerId)
        ?.discountPercentage || 0
    );
  }

  getPromotionByCustomer() {
    this.promotionService.getAllPromotionsByCustomer().subscribe({
      next: (promotions) => {
        if (promotions.length > 0) {
          this.promotionCustomer.set(promotions);
        } else {
          this.promotionCustomer.set([]);
        }
      },
      error: (error) => {
        console.error('Error fetching promotions by customer ID:', error);
        this.promotionCustomer.set([]);
      },
    });
  }

  getAllPromotionsByDishes() {
    this.promotionService.getAllPromotionsByDishes().subscribe({
      next: (promotions) => {
        if (promotions.length > 0) {
          this.promotionDish.set(promotions);
        } else {
          this.promotionCustomer.set([]);
        }
      },
      error: (error) => {
        console.error('Error fetching promotions by customer ID:', error);
        this.promotionCustomer.set([]);
      },
    });
  }

  getSubTotal(item: {
    price: number;
    quantity: number;
    discountPercentage: number;
  }): number {
    const total = item.price * item.quantity;

    if (item.discountPercentage <= 0) {
      return total;
    }

    const discount = (total * item.discountPercentage) / 100;
    const subtotal = total - discount;

    return Number(subtotal.toFixed(2));
  }

  getSubtotales(): number {
    if (this.saleItems.length === 0 || this.customerId === '') return 0;

    let subtotales = 0;
    this.saleItems.forEach((sle) => {
      subtotales += this.getSubTotal(sle);
    });
    return Number(subtotales.toFixed(2));
  }

  calculateTotal(): number {
    if (this.saleItems.length === 0 || this.customerId === '') return 0;

    const discoutCustomer = this.getDiscountCustomerId();
    const subtotales = this.getSubtotales();

    const discount = (subtotales * discoutCustomer) / 100;
    const total = subtotales - discount;

    return Number(total.toFixed(2));
  }

  registerSale() {
    if (this.saleItems.length === 0 || this.customerId === '') {
      this.alertStore.addAlert({
        message: 'Por favor, los datos necesatios.',
        type: 'info',
      });
      return;
    }

    const detailRequestDtoList: newItemOrder[] = [];

    this.saleItems.forEach((sle) => {
      detailRequestDtoList.push({
        discountPercentage: sle.discountPercentage,
        dishId: sle.dishId,
        quantity: sle.quantity,
      });
    });

    const discoutCustomer = this.getDiscountCustomerId();
    const order: newOrder = {
      customerId: this.customerId,
      detailRequestDtoList: detailRequestDtoList,
      discountPercentage: discoutCustomer,
      restaurantId: this.pinionId,
    };

    this.restaurantService.createOrder(order).subscribe({
      next: (value) => {
        this.customerId = '';
        this.saleItems = [];
        this.alertStore.addAlert({
          message: 'Registro de orden exitoso, puede generar la factura en pdf',
          type: 'success',
        });
      },
      error: (err) => {
        const msgDefault =
          'Error al crear la reserva. Por favor, intente de nuevo.';
        this.HandlerError.handleError(err, this.alertStore, msgDefault);
      },
    });
  }
}
