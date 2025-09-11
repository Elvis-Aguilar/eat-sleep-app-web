import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '@patients/models/room.model';
import { CurrencyPipe } from '@angular/common';
import { OpinionsModalComponent } from '../../components/opinions-modal/opinions-modal.component';

@Component({
  selector: 'app-manager-rooms',
  imports: [CurrencyPipe, OpinionsModalComponent],
  templateUrl: './manager-rooms.component.html',
})
export class ManagerRoomsComponent {
  @ViewChild('modalOpinions')
  modalOpinions!: ElementRef<HTMLDialogElement>;

  // inyectar el servicios
  private readonly route = inject(ActivatedRoute);
  private readonly hotelService = inject(HotelService);
  private readonly router = inject(Router);

  pinionId!: string;
  rooms = signal<Room[]>([]);
  showModal = signal<boolean>(false);
  titulo = signal<string>('');
  referenceId = signal<string>('');

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

  closeModalOpinions() {
    this.modalOpinions.nativeElement.close();
  }

  openModalOpinios(room: Room) {
    this.titulo.set(`Opiniones de la Habicion ${room.roomNumber}`);
    this.referenceId.set(room.id);
    this.showModal.set(true);
    this.modalOpinions.nativeElement.showModal();
  }
}
