import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HandlerError } from '@shared/utils/handlerError';
import { Customer } from 'app/modules/MANAGER/models/customer.interface';
import { Hotel, Room } from 'app/modules/MANAGER/models/hotel.interface';
import { Reservation } from 'app/modules/MANAGER/models/reservation.interface';
import { Restaurant } from 'app/modules/MANAGER/models/restaurant.interface';
import { CustomersService } from 'app/modules/MANAGER/service/customers.service';
import { HotelService } from 'app/modules/MANAGER/service/hotel.service';
import { ReservationService } from 'app/modules/MANAGER/service/reservation.service';
import { RestaurantService } from 'app/modules/MANAGER/service/restaurant.service';
import { Order } from 'app/modules/RESTAURANT/models/order.interface';
import { AlertStore } from 'app/store/alert.store';

@Component({
  selector: 'app-income-establishment',
  imports: [FormsModule, PercentPipe, CurrencyPipe, DatePipe],
  templateUrl: './income-establishment.component.html',
})
export class IncomeEstablishmentComponent {
  // injeccion dependencias
  private readonly hotelService = inject(HotelService);
  private readonly restaurantSerivce = inject(RestaurantService);
  private readonly alertStore = inject(AlertStore);
  private readonly reservationService = inject(ReservationService);
  private readonly customerService = inject(CustomersService);

  private HandlerError = HandlerError;

  // variables
  reservations = signal<Reservation[]>([]);
  restaurants = signal<Restaurant[]>([]);
  hotels = signal<Hotel[]>([]);
  rooms = signal<Room[]>([]);
  customers = signal<Customer[]>([]);
  orders = signal<Order[]>([]);
  startDate = signal('');
  endDate = signal('');
  typeEstablishi = signal('hotel');
  hotelId = signal('');
  restaurantId = signal('');
  totalItems = signal(0);
  total = signal(0);

  ngOnInit(): void {
    this.getAllCustomers();
    this.getAllRooms();
    this.getAllHotels();
    this.getAllRestaurans();
  }

  getAllHotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (hotels) => {
        this.hotels.set(hotels);
      },
      error: (error) => {
        console.error('Error fetching hotels:', error);
      },
    });
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

  generetedReport() {
    if (this.startDate() === '' || this.endDate() === '') {
      this.alertStore.addAlert({
        message: 'Las fechas son requeridas',
        type: 'info',
      });
      return;
    }
    if (this.typeEstablishi() === 'hotel' && this.hotelId() === '') {
      this.alertStore.addAlert({
        message: 'Seleccione el hotel para generar su reporte',
        type: 'warning',
      });
      return;
    }
    if (this.typeEstablishi() === 'rest' && this.restaurantId() === '') {
      this.alertStore.addAlert({
        message: 'Seleccione el restaurante para generar su reporte',
        type: 'warning',
      });
      return;
    }

    if (this.typeEstablishi() === 'hotel') {
      this.getReportReservationRangeDate();
    }

    if (this.typeEstablishi() === 'rest') {
      this.getAllOrdersByRestaurantId(this.restaurantId());
    }
  }

  getReportReservationRangeDate() {
    const range = { startDate: this.startDate(), endDate: this.endDate() };
    this.reservationService.getReportRangeDate(range).subscribe({
      next: (value) => {
        this.generetedReportReservations(value);
      },
      error: (err) => {},
    });
  }

  generetedReportReservations(reservations: Reservation[]) {
    // Reiniciamos las reservas
    this.reservations.set([]);
    this.totalItems.set(0);
    this.total.set(0);

    if (reservations.length <= 0) {
      this.alertStore.addAlert({
        message: 'No hay Registros',
        type: 'success',
      });
      return;
    }

    const hotelName =
      this.hotels().find((hot) => hot.id === this.hotelId())?.name || '';
    const rooms = this.rooms().filter((room) => room.hotelName === hotelName);

    rooms.forEach((room) => {
      const reserv = reservations.filter((res) => room.id === res.roomId);

      if (reserv.length > 0) {
        this.reservations.update((current) => [
          ...current,
          ...reserv.map((r) => ({
            ...r,
            roomName: room.roomNumber,
            hotelName: hotelName,
          })),
        ]);
      }
    });

    this.reservations().forEach((res) => {
      this.total.update((current) => current + res.totalPrice);
    });
    this.totalItems.set(this.reservations().length);
  }

  getAllOrdersByRestaurantId(id: string) {
    this.totalItems.set(0);
    this.total.set(0);
    this.orders.set([]);
    
    const range = { startDate: this.startDate(), endDate: this.endDate() };
    this.restaurantSerivce.reportOrderByRestaurantId(id, range).subscribe({
      next: (orders) => {
        console.log(orders);
        if (orders.length <= 0) {
          this.alertStore.addAlert({
            message: 'No hay Registros',
            type: 'success',
          });
          return;
        }
        const customers = this.customers();
        const enrichedOrders = this.enrichOrdersWithCustomer(orders, customers);
        this.orders.set(enrichedOrders);
        this.orders().forEach((res) => {
          this.total.update((current) => current + res.totalPrice);
        });
        this.totalItems.set(this.orders().length);
      },
      error: (error) => {
        this.orders.set([]);
        console.error('Error fetching orders:', error);
      },
    });
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

  getAllRooms() {
    this.hotelService.getAllRooms().subscribe({
      next: (value) => {
        this.rooms.set(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (value) => {
        this.customers.set(value);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
