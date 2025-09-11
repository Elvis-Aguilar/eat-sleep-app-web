import { Component, inject, signal } from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';
import { Hotel } from '../../models/hotel.interface';

@Component({
  selector: 'app-manager-hotel',
  imports: [],
  templateUrl: './manager-hotel.component.html',
})
export class ManagerHotelComponent {
  // inyectar el servicios
  private readonly hotelService = inject(HotelService);
  private readonly route = inject(Router);

  // arreglo de hoteles
  hotels = signal<Hotel[]>([]);

  ngOnInit(): void {
    this.getAllHotels();
  }

  getAllHotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (hotels) => {
        this.hotels.set(hotels);
      },
      error: (error) => {
        console.error('Error fetching hotels:', error);
      },
    });
  }

  goRooms(hotelId: string){
    this.route.navigate(['manager/hotels/room', hotelId])
  }
}
