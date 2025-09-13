import { Component, inject, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { TarjetComponent } from '@shared/components/tarjet/tarjet.component';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { EmployeeDto } from 'app/modules/MANAGER/models/employee.interface';
import { Hotel } from 'app/modules/MANAGER/models/hotel.interface';
import { EmployeeService } from 'app/modules/MANAGER/service/employee.service';
import { HotelService } from 'app/modules/MANAGER/service/hotel.service';
import { Session } from 'app/modules/session/models/auth';

@Component({
  selector: 'app-dashboard-hotel',
  imports: [TarjetComponent],
  templateUrl: './dashboard-hotel.component.html',
})
export class DashboardHotelComponent {
  // injeccion de servicios
  private readonly route = inject(Router);
  private readonly employeeService = inject(EmployeeService);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly hotelService = inject(HotelService);

  session: Session = this.localStorageService.getState().session;

  employee = signal<EmployeeDto | null>(null);
  hotel = signal<Hotel | null>(null);

  ngOnInit() {
    this.getEmployeeById();
  }

  getEmployeeById() {
    this.employeeService.getEmployeeById(this.session.employeeId).subscribe({
      next: (value) => {
        this.employee.set(value);
        this.getHotelById(value.hotelId);
      },
      error: (err) => {
        this.employee.set(null);
      },
    });
  }

  // get hotel by id
  getHotelById(hotelId: string) {
    this.hotelService.getHotelById(hotelId).subscribe({
      next: (hotel) => {
        this.hotel.set(hotel);
      },
      error: (error) => {
        this.hotel.set(null);
      },
    });
  }

  goHotel() {
    this.route.navigate(['hotel/details', this.employee()?.hotelId]);
  }

  goRooms() {
    this.route.navigate(['hotel/rooms', this.employee()?.hotelId]);
  }

  goReservations() {
    this.route.navigate(['hotel/reservations', this.employee()?.hotelId]);
  }

  goReports() {
    this.route.navigate(['hotel/reports']);
  }
}
