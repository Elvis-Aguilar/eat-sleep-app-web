import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Customer } from '../models/customer.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private readonly apiConfigService = inject(ApiConfigService);
  private readonly _http = inject(HttpClient);
  private readonly API_CUSTOMERS = this.apiConfigService.API_CUSTOMERS;

  constructor() {}

  getAllCustomers(): Observable<Customer[]> {
    return this._http.get<Customer[]>(`${this.API_CUSTOMERS}`);
  }

}
