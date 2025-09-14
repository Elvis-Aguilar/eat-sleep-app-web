import { Pipe, type PipeTransform } from '@angular/core';
import { Order } from '../models/order.interface';

@Pipe({
  name: 'appCustomerFilterOrder',
})
export class CustomerFilterOrderPipe implements PipeTransform {

  transform(value: Order[], filter: string): Order[] {
    if (!filter) return value;

    filter = filter.toLowerCase();

    return value.filter((reservation) =>
      reservation.customerId.toLowerCase().includes(filter)
    );
  }

}
