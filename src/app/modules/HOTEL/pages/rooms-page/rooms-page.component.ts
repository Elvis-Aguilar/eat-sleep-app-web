import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '@patients/models/room.model';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { EmployeeDto } from 'app/modules/MANAGER/models/employee.interface';
import { EmployeeService } from 'app/modules/MANAGER/service/employee.service';
import { HotelService } from 'app/modules/MANAGER/service/hotel.service';
import { Session } from 'app/modules/session/models/auth';

@Component({
  selector: 'app-rooms-page',
  imports: [CurrencyPipe],
  templateUrl: './rooms-page.component.html',
})
export class RoomsPageComponent {
  // inyectar el servicios
  private readonly route = inject(ActivatedRoute);
  private readonly hotelService = inject(HotelService);
  private readonly router = inject(Router);
  private readonly employeeService = inject(EmployeeService);
  private readonly localStorageService = inject(LocalStorageService);

  session: Session = this.localStorageService.getState().session;

  pinionId!: string;
  rooms = signal<Room[]>([]);
  showModal = signal<boolean>(false);
  titulo = signal<string>('');
  referenceId = signal<string>('');
  employee = signal<EmployeeDto | null>(null);

  ngOnInit(): void {
    this.getEmployeeById();
    this.route.paramMap.subscribe((params) => {
      this.pinionId = params.get('id')!;
      this.getAllRoomsByHotelId(this.pinionId);
    });
  }

  getEmployeeById() {
    this.employeeService.getEmployeeById(this.session.employeeId).subscribe({
      next: (value) => {
        this.employee.set(value);
      },
      error: (err) => {
        this.employee.set(null);
      },
    });
  }

  getAllRoomsByHotelId(hotelId: string) {
    this.hotelService.getAllRoomsByHotelId(hotelId).subscribe({
      next: (rooms) => {
        this.rooms.set(rooms);
      },
      error: (error) => {
        this.rooms.set([]);
        console.error('Error fetching rooms:', error);
      },
    });
  }

  goReservations(roomId: string) {
    this.router.navigate([
      'hotel/reservations',
      this.employee()?.hotelId,
      'room',
      roomId,
    ]);
  }
}
