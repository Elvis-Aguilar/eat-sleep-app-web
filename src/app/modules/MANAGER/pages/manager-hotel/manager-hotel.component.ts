import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';
import { Hotel } from '../../models/hotel.interface';
import { OpinionsModalComponent } from '../../components/opinions-modal/opinions-modal.component';

@Component({
  selector: 'app-manager-hotel',
  imports: [OpinionsModalComponent],
  templateUrl: './manager-hotel.component.html',
})
export class ManagerHotelComponent {
  @ViewChild('modalOpinions')
  modalOpinions!: ElementRef<HTMLDialogElement>;
  // inyectar el servicios
  private readonly hotelService = inject(HotelService);
  private readonly route = inject(Router);

  // arreglo de hoteles
  hotels = signal<Hotel[]>([]);
  titulo = signal<string>('');
  referenceId = signal<string>('');
  showModal = signal<boolean>(false);

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

  goRooms(hotelId: string) {
    this.route.navigate(['manager/hotels/room', hotelId]);
  }

  closeModalOpinions() {
    this.modalOpinions.nativeElement.close();
  }

  openModalOpinios(hotel: Hotel) {
    this.titulo.set(`Opiniones del ${hotel.name}`);
    this.referenceId.set(hotel.id);
    this.showModal.set(true);
    this.modalOpinions.nativeElement.showModal();
  }
}
