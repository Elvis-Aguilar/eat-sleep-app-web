import { Pipe, type PipeTransform } from '@angular/core';
import { Reservation } from 'app/modules/MANAGER/models/reservation.interface';

@Pipe({
  name: 'appReservationFilterCustomer',
})
export class ReservationFilterCustomerPipe implements PipeTransform {
  transform(value: Reservation[], filter: string): Reservation[] {
    if (!filter) return value;

    filter = filter.toLowerCase();

    return value.filter((reservation) =>
      reservation.customerId.toLowerCase().includes(filter)
    );
  }
}
