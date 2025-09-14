import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';
import { BillPdf, NewBill } from '../models/Bill.interface';
import { Order } from 'app/modules/RESTAURANT/models/order.interface';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private readonly apiConfigService = inject(ApiConfigService);
  private readonly _http = inject(HttpClient);
  private readonly API_BILL = this.apiConfigService.API_BILL;
  private readonly API_EXPORT = this.apiConfigService.API_EXPORT;

  constructor() {}

  saveBill(newBill: NewBill): Observable<void> {
    return this._http.post<void>(`${this.API_BILL}`, newBill);
  }

  exportBillReservation(billPdf: BillPdf) {
    // Realiza la petición POST enviando el objeto en el body
    this._http
      .post(`${this.API_EXPORT}/bill/reservation`, billPdf, {
        responseType: 'blob', // Importante para manejar el PDF como Blob
      })
      .subscribe({
        next: (response) => {
          // Descargar el archivo PDF
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'factura-reservacion.pdf'; // Nombre del archivo descargado
          a.click();
          window.URL.revokeObjectURL(url); // Limpia la URL temporal
        },
        error: (err) => {
          console.error('Error al descargar el PDF:', err);
        },
      });
  }

    exportBillOrder(orderPdf: Order) {
    // Realiza la petición POST enviando el objeto en el body
    this._http
      .post(`${this.API_EXPORT}/bill/order`, orderPdf, {
        responseType: 'blob', // Importante para manejar el PDF como Blob
      })
      .subscribe({
        next: (response) => {
          // Descargar el archivo PDF
          const blob = new Blob([response], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'factura-orden.pdf'; // Nombre del archivo descargado
          a.click();
          window.URL.revokeObjectURL(url); // Limpia la URL temporal
        },
        error: (err) => {
          console.error('Error al descargar el PDF:', err);
        },
      });
  }
}
