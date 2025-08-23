import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalMsgComponent } from '@shared/components/modal-msg/modal-msg.component';
import { AreaResponseDto } from '../../models/area.dto';
import { AreaService } from '../../services/area.service';
import { CreateAreaDto, UpdateAreaDto } from '../../models/create-area.dto';

@Component({
  selector: 'app-areas',
  imports: [RouterModule, FormsModule, ModalMsgComponent],
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.css'
})
export class AreasComponent {

  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal1') modalRef2!: ElementRef<HTMLDialogElement>;

  private readonly _areaService = inject(AreaService)

  classSucces = 'text-purple-700 text-lg'
  classError = 'text-red-700 text-lg'
  classWarning = 'text-yellow-700 text-lg'
  calssValue = ''
  titleModal = ''
  contentModal = ''

  isEditModalOpen = false;
  isRegisterOpen = false;
  selectedArea: AreaResponseDto | undefined;
  nameArea = '';

  areas: AreaResponseDto[] = []

  ngOnInit() {
    this.getAllAreas()
  }

  getAllAreas() {
    this._areaService.getAllAreas().subscribe({
      next: value => {
        this.areas = value
      }
    })
  }

  createArea() {
    if (this.nameArea === '') {
      this.calssValue = this.classWarning
      this.titleModal = 'Nombre invalido'
      this.contentModal = 'El nombre del area no puede estar vacio'
      this.modalRef2.nativeElement.showModal();
      this.closeModal()
      return
    }

    const area: CreateAreaDto = { name: this.nameArea }

    this._areaService.createArea(area).subscribe({
      next: value => {
        this.isRegisterOpen = false;
        this.calssValue = this.classSucces
        this.titleModal = 'Area Registrada'
        this.contentModal = 'El area ha sido registrada exitosamente'
        this.closeModal()
        this.getAllAreas()
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
    this.nameArea = ''
    this.isRegisterOpen = true;
    this.isEditModalOpen = false;
    this.selectedArea = undefined;
    this.modalRef.nativeElement.showModal();

  }

  openEditModal(area: AreaResponseDto) {
    this.selectedArea = area
    this.nameArea = area.name
    this.isEditModalOpen = true;
    this.isRegisterOpen = false;
    this.modalRef.nativeElement.showModal();
  }

  updateArea() {
    if (this.nameArea === '' || !this.selectedArea) {
      this.calssValue = this.classWarning
      this.titleModal = 'Nombre invalido'
      this.contentModal = 'El nombre del area no puede estar vacio'
      this.modalRef2.nativeElement.showModal();
      this.closeModal()
      return
    }

    const area: UpdateAreaDto = { newName: this.nameArea }

    this._areaService.updateNameArea(area, this.selectedArea.id).subscribe({
      next: value => {
        this.isRegisterOpen = false;
        this.calssValue = this.classSucces
        this.titleModal = 'Area Actualizada'
        this.contentModal = 'El area ha sido Actuilizada exitosamente'
        this.closeModal()
        this.getAllAreas();
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

  closeModal() {
    this.modalRef.nativeElement.close();
  }

}
