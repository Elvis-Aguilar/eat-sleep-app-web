import { NgClass, PercentPipe, CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'app/modules/MANAGER/models/customer.interface';
import { Reservation } from 'app/modules/MANAGER/models/reservation.interface';
import { ReservationFilterPipe } from 'app/modules/MANAGER/pipes/reservation-filter.pipe';
import { CustomersService } from 'app/modules/MANAGER/service/customers.service';
import { HotelService } from 'app/modules/MANAGER/service/hotel.service';
import { ReservationService } from 'app/modules/MANAGER/service/reservation.service';
import { ReservarionFilterRoomPipe } from '../../pipes/reservarion-filter-room.pipe';
import { ReservationFilterCustomerPipe } from '../../pipes/reservation-filter-customer.pipe';
import { BillPdf, NewBill } from '../../models/Bill.interface';
import { BillService } from '../../services/Bill.service';
import { HandlerError } from '@shared/utils/handlerError';
import { AlertStore } from 'app/store/alert.store';
import { FormsModule } from "@angular/forms";
import { Room } from 'app/modules/MANAGER/models/hotel.interface';

@Component({
  selector: 'app-reservations-page',
  imports: [
    NgClass,
    PercentPipe,
    CurrencyPipe,
    ReservationFilterPipe,
    ReservarionFilterRoomPipe,
    ReservationFilterCustomerPipe,
    FormsModule
],
  templateUrl: './reservations-page.component.html',
})
export class ReservationsPageComponent {
  private readonly reservationService = inject(ReservationService);
  private readonly route = inject(ActivatedRoute);
  private readonly hotelService = inject(HotelService);
  private readonly customerService = inject(CustomersService);
  private readonly billService = inject(BillService);
  private readonly alertStore = inject(AlertStore);

  private HandlerError = HandlerError;

  reservations = signal<Reservation[]>([]);
  roomId!: string;
  hotelId!: string;
  customers = signal<Customer[]>([]);
  rooms = signal<Room[]>([]);
  filterState = signal('reservado');
  filterCustomer = signal('');
  filterRoom = signal('');

  ngOnInit(): void {
    this.getAllCustomers();
    this.route.paramMap.subscribe((params) => {
      this.hotelId = params.get('hotelId')!;
      this.roomId = params.get('roomId') || '';
      this.filterRoom.set(this.roomId);
      this.getAllRoomsByHotelId(this.hotelId);
    });
  }

  getCustomerById(customerId: string): string {
    return (
      this.customers().find((cus) => cus.id === customerId)?.fullName ?? ''
    );
  }

  getReservationsByRoomId(roomId: string) {
    this.reservationService.getAllReservationByRoomId(roomId).subscribe({
      next: (reservations) => {
        this.reservations.update((current) => [...current, ...reservations]);
      },
      error: (error) => {
        console.error('Error fetching reservations by room ID:', error);
      },
    });
  }

  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        this.customers.set(customers);
      },
      error: (error) => {
        console.error('Error fetching reservations by room ID:', error);
        this.customers.set([]);
      },
    });
  }

  getAllRoomsByHotelId(hotelId: string) {
    this.hotelService.getAllRoomsByHotelId(hotelId).subscribe({
      next: (rooms) => {
        this.rooms.set(rooms);
        this.rooms().forEach((element) => {
          this.getReservationsByRoomId(element.id);
        });
      },
      error: (error) => {
        this.rooms.set([]);
        console.error('Error fetching rooms:', error);
      },
    });
  }

  payReservation(resrvation: Reservation) {
    const newBill: NewBill = {
      amount: resrvation.totalPrice,
      refenceId: resrvation.id,
      typeReference: 'reservation',
    };

    this.billService.saveBill(newBill).subscribe({
      next: (value) => {
        this.alertStore.addAlert({
          message: 'Pago Realizado con exito, puede generar la Factura en PDF',
          type: 'success',
        });
        resrvation.state = 'Pagado';
      },
      error: (err) => {
        const msgDefault =
          'Error al registrar la promocion. Por favor, intente nuevamente más tarde.';
        this.HandlerError.handleError(err, this.alertStore, msgDefault);
        console.log(err);
      },
    });
  }

  findRoomById(roomId: string): Room | null {
    return this.rooms().find((room) => room.id === roomId) || null;
  }

  findCustomerById(customerId: string): Customer | null {
    return this.customers().find((cust) => cust.id === customerId) || null;
  }

  // TODO: generar factura, interface que recibe segun datos
  generetedBillPDF(resrvation: Reservation) {
    const room = this.findRoomById(resrvation.roomId);
    const customer = this.findCustomerById(resrvation.customerId);
    const billPdf: BillPdf = {
      reservationId: resrvation.id,
      startDate: resrvation.startDate,
      endDate: resrvation.endDate,
      state: resrvation.state,
      pricePerDay: resrvation.pricePerDay,
      totalPrice: resrvation.totalPrice,
      discountPercentage: resrvation.discountPercentage,
      roomNumber: room?.roomNumber || '',
      hotelName: room?.hotelName || '',
      customerName: customer?.fullName || '',
      customerCui: customer?.cui || '',
    };

    this.billService.exportBillReservation(billPdf);
  }
}
