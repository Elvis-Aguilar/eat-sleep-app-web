import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalMsgComponent } from '@shared/components/modal-msg/modal-msg.component';
import { CreateRoom, RoomResponseDto } from '../../models/rooms.dto';
import { RoomService } from '../../services/room.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rooms-managment',
  imports: [RouterModule, FormsModule, ModalMsgComponent, CommonModule],
  templateUrl: './rooms-managment.component.html',
  styleUrl: './rooms-managment.component.css'
})
export class RoomsManagmentComponent {

  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal1') modalRef2!: ElementRef<HTMLDialogElement>;

  private readonly _roomService = inject(RoomService)


  classSucces = 'text-purple-700 text-lg'
  classError = 'text-red-700 text-lg'
  classWarning = 'text-yellow-700 text-lg'
  calssValue = ''
  titleModal = ''
  contentModal = ''

  isEditModalOpen = false;
  isRegisterOpen = false;
  selectRoom: RoomResponseDto | undefined;
  numberRoom = '';
  costPerDay: number = 0;

  rooms: RoomResponseDto[] = []

  ngOnInit() {
    this.getAllRooms()
  }

  getAllRooms() {
    this._roomService.getAllRooms().subscribe({
      next: value => {
        this.rooms = value
      }
    })
  }

  closeModal() {
    this.modalRef.nativeElement.close();
  }


  createArea() {
    if (this.numberRoom === '') {
      this.calssValue = this.classWarning
      this.titleModal = 'Nombre invalido'
      this.contentModal = 'El nombre del area no puede estar vacio'
      this.modalRef2.nativeElement.showModal();
      this.closeModal()
      return
    }

    if (this.costPerDay <= 0) {
      this.calssValue = this.classWarning
      this.titleModal = 'Costo invalido'
      this.contentModal = 'El Costo por debe ser mayor a cero'
      this.modalRef2.nativeElement.showModal();
      this.closeModal()
      return
    }

    const room: CreateRoom = { number: this.numberRoom, costPerDay: Number(this.costPerDay) }

    this._roomService.createRoom(room).subscribe({
      next: value => {
        this.isRegisterOpen = false;
        this.calssValue = this.classSucces
        this.titleModal = 'Area Registrada'
        this.contentModal = 'El area ha sido registrada exitosamente'
        this.closeModal()
        this.getAllRooms()
        this.modalRef2.nativeElement.showModal();

      },
      error: err => {
        this.isRegisterOpen = false;
        this.calssValue = this.classError
        this.titleModal = 'Area no Registrada'
        this.contentModal = err.error.message
        this.modalRef2.nativeElement.showModal();
      }
    })
  }

  openCreateArea() {
    this.numberRoom = ''
    this.costPerDay = 0
    this.isRegisterOpen = true;
    this.isEditModalOpen = false;
    this.selectRoom = undefined;
    this.modalRef.nativeElement.showModal();

  }

  openEditModal(roomEdit: RoomResponseDto) {
    this.selectRoom = roomEdit
    this.numberRoom = roomEdit.number
    this.costPerDay = Number(roomEdit.costPerDay)
    this.isEditModalOpen = true;
    this.isRegisterOpen = false;
    this.modalRef.nativeElement.showModal();
  }

  updateArea() {
    if (this.numberRoom === '' || !this.selectRoom) {
      this.calssValue = this.classWarning
      this.titleModal = 'Numero invalido'
      this.contentModal = 'El numero del habitacion no puede estar vacio'
      this.modalRef2.nativeElement.showModal();
      this.closeModal()
      return
    }

    const area: CreateRoom = { number: this.numberRoom, costPerDay: Number(this.costPerDay) }

    this._roomService.updateRoom(area, this.selectRoom.id).subscribe({
      next: value => {
        this.isRegisterOpen = false;
        this.calssValue = this.classSucces
        this.titleModal = 'Habitacion Actualizada'
        this.contentModal = 'La habitacion ha sido Actuilizada exitosamente'
        this.closeModal()
        this.getAllRooms();
        this.modalRef2.nativeElement.showModal();

      },
      error: err => {
        this.isRegisterOpen = false;
        this.calssValue = this.classError
        this.titleModal = 'Area no Actualizo'
        this.contentModal = err.error.message
        this.modalRef2.nativeElement.showModal();
      }
    })
  }

  formatDateTime(date: any): string {
    const dateString = `${date}`
    const [datePart, timePart] = dateString.split('T');
    const time = timePart.slice(0, 5);

    return `${datePart} ${time} hrs`;
  }



}
