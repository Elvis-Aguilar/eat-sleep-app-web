import { Component, inject, input, signal } from '@angular/core';
import { ReservationService } from '../../service/reservation.service';
import { Reservation } from '../../models/reservation.interface';
import { Room } from '@patients/models/room.model';
import { CurrencyPipe, NgClass, PercentPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../service/hotel.service';
import { Customer } from '../../models/customer.interface';
import { CustomersService } from '../../service/customers.service';
import { ReservationFilterPipe } from '../../pipes/reservation-filter.pipe';

@Component({
  selector: 'app-manager-reservations',
  imports: [NgClass, PercentPipe, CurrencyPipe, ReservationFilterPipe],
  templateUrl: './manager-reservations.component.html',
})
export class ManagerReservationsComponent {
  private readonly reservationService = inject(ReservationService);
  private readonly route = inject(ActivatedRoute);
  private readonly hotelService = inject(HotelService);
  private readonly customerService = inject(CustomersService);

  reservations = signal<Reservation[]>([]);
  room = signal<Room | null>(null);
  roomId!: string;
  customers = signal<Customer[]>([]);
  filter = signal('');

  ngOnInit(): void {
    this.getAllCustomers();
    this.route.paramMap.subscribe((params) => {
      this.roomId = params.get('id')!;
      this.getReservationsByRoomId();
      this.getRoomById();
    });
  }

  getCustomerById(customerId: string): string {
    return (
      this.customers().find((cus) => cus.id === customerId)?.fullName ?? ''
    );
  }

  getReservationsByRoomId() {
    this.reservationService.getAllReservationByRoomId(this.roomId).subscribe({
      next: (reservations) => {
        this.reservations.set(reservations);
      },
      error: (error) => {
        console.error('Error fetching reservations by room ID:', error);
        this.reservations.set([]);
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

  getRoomById() {
    this.hotelService.getRoomById(this.roomId).subscribe({
      next: (room) => {
        this.room.set(room);
      },
      error: (error) => {
        console.error('Error fetching reservations by room ID:', error);
        this.room.set(null);
      },
    });
  }
}
