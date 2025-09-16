import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomersService } from 'app/modules/MANAGER/service/customers.service';
import { RestaurantService } from 'app/modules/MANAGER/service/restaurant.service';
import { Order } from '../../models/order.interface';
import { Customer } from 'app/modules/MANAGER/models/customer.interface';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { CustomerFilterOrderPipe } from '../../pipes/customer-filter-order.pipe';
import { BillService } from 'app/modules/HOTEL/services/Bill.service';

@Component({
  selector: 'app-orders-page',
  imports: [
    FormsModule,
    CurrencyPipe,
    DatePipe,
    CustomerFilterOrderPipe,
  ],
  templateUrl: './orders-page.component.html',
})
export class OrdersPageComponent {
  //modal ref
  @ViewChild('modalOrderDetail')
  modalOrderDetail!: ElementRef<HTMLDialogElement>;

  //injeccion de dependencias.
  private readonly restaurantService = inject(RestaurantService);
  private readonly route = inject(ActivatedRoute);
  private readonly customerSevice = inject(CustomersService);
  private readonly billService = inject(BillService);

  pinionId!: string;
  orders = signal<Order[]>([]);
  customers = signal<Customer[]>([]);

  filterCustomer = signal('');
  selectedOrder = signal<Order | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pinionId = params.get('id')!;
      this.getAllOrdersByRestaurantId(this.pinionId);
    });
    this.loadCustomers();
  }

  private enrichOrdersWithCustomer(
    orders: Order[],
    customers: Customer[]
  ): Order[] {
    return orders.map((order) => {
      const customer = customers.find((c) => c.id === order.customerId);
      return {
        ...order,
        customerName: customer?.fullName ?? 'Desconocido',
        customerCui: customer?.cui ?? '',
      };
    });
  }

  getAllOrdersByRestaurantId(id: string) {
    this.restaurantService.getAllOrderByRestaurantId(id).subscribe({
      next: (orders) => {
        const customers = this.customers(); // obtenemos signal actual
        const enrichedOrders = this.enrichOrdersWithCustomer(orders, customers);
        this.orders.set(enrichedOrders);
      },
      error: (error) => {
        this.orders.set([]);
        console.error('Error fetching orders:', error);
      },
    });
  }

  loadCustomers() {
    this.customerSevice.getAllCustomers().subscribe({
      next: (customers) => {
        this.customers.set(customers);

        // si ya tenías órdenes cargadas, las enriqueces ahora
        const orders = this.orders();
        if (orders.length > 0) {
          const enrichedOrders = this.enrichOrdersWithCustomer(
            orders,
            customers
          );
          this.orders.set(enrichedOrders);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  viewDetails(order: Order) {
    this.selectedOrder.set(order);
    this.modalOrderDetail.nativeElement.show();
  }

  dowloandPDf(order: Order) {
    this.billService.exportBillOrder(order);
  }
}
