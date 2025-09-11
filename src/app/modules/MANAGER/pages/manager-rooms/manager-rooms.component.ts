import { Component, inject, signal } from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '@patients/models/room.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-manager-rooms',
  imports: [CurrencyPipe],
  templateUrl: './manager-rooms.component.html',
})
export class ManagerRoomsComponent {
  // inyectar el servicios
  private readonly route = inject(ActivatedRoute);
  private readonly hotelService = inject(HotelService);
  private readonly router = inject(Router);

  pinionId!: string;
  rooms = signal<Room[]>([]);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pinionId = params.get('id')!;
      this.getAllRoomsByHotelId(this.pinionId);
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
    this.router.navigate(['manager/hotels/room/reservation', roomId]);
  }
}
