import { Pipe, type PipeTransform } from '@angular/core';
import { Reservation } from '../models/reservation.interface';

@Pipe({
  name: 'appReservationFilter',
})
export class ReservationFilterPipe implements PipeTransform {
  transform(value: Reservation[], filter: string): Reservation[] {    
    if (!filter) return value;

    filter = filter.toLowerCase();

    return value.filter((reservation) =>
      reservation.state.toLowerCase().includes(filter)
    );
  }
}
