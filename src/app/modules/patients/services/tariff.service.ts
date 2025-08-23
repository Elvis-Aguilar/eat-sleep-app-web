import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tariff } from '@patients/models/tariff.model';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TariffService {
  private readonly http = inject(HttpClient);
  private readonly apiUri = inject(ApiConfigService).API_TARIFF;

  getAllTariffs(): Observable<Tariff[]> {
    return this.http.get<Tariff[]>(`${this.apiUri}`);
  }
}
