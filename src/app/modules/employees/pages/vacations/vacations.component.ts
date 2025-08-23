import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { VacationService } from '../../services/vacation.service';
import { Router } from '@angular/router';
import { CreateRequestVacationDto, UpdateRequestVacationDto, VacationPendingDto } from '../../models/vacation.dto';
import { CommonModule } from '@angular/common';
import { ModalMsgComponent } from '@shared/components/modal-msg/modal-msg.component';
import { FormsModule } from '@angular/forms';
import { EmployeeDto } from '../../models/employee.dto';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-vacations',
  imports: [CommonModule, FormsModule, ModalMsgComponent],
  templateUrl: './vacations.component.html',
  styleUrl: './vacations.component.css'
})
export class VacationsComponent {

  @ViewChild('modal1') modalRef2!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;



  private readonly _vacationService = inject(VacationService)
  private readonly _employeeService = inject(EmployeeService)
  private readonly route = inject(Router)


  vacations: VacationPendingDto[] = []
  employees: EmployeeDto[] = []

  isPending: boolean = true;

  classSucces = 'text-purple-700 text-lg'
  classError = 'text-red-700 text-lg'
  classWarning = 'text-yellow-700 text-lg'
  calssValue = ''
  titleModal = ''
  contentModal = ''

  startDate: string = ''
  days: number = 0;
  employeeId: number = 0;


  ngOnInit() {
    this.getAllVacationPending();
    this.getAllEmployees()
  }

  getAllEmployees() {
    this._employeeService.getAllEmployees().subscribe({
      next: value => {
        this.employees = value
      }
    })
  }

  getAllVacationPending() {
    this._vacationService.getAllVacationPending().subscribe({
      next: value => {
        this.vacations = value
      }
    })
  }

  getAllVacationApproved() {
    this._vacationService.getAllVacationApproved().subscribe({
      next: value => {
        this.vacations = value
      }
    })
  }

  hanglerErrorMsg(err: string) {
    this.contentModal = err
    this.modalRef2.nativeElement.showModal();
  }

  hanglerError(err: any) {
    const erroCode: number = err.error.status
    switch (erroCode) {
      case 500:
        this.contentModal = 'Ah ocurrido un error inesperado, intente mas tarde, perdone las molestias'
        break
      default:
        this.contentModal = err.error.message
        break
    }

    this.modalRef2.nativeElement.showModal();
  }

  openVacationForm() {
    this.modalRef.nativeElement.showModal()
  }

  closeModalNew() {
    this.modalRef.nativeElement.close()

  }

  viewAllVacations() {
    this.isPending = false
    this.getAllVacationApproved()
  }

  viewRequestVacations(){
    this.isPending = true
    this.getAllVacationPending();
  }

  validFormRequest(): boolean {
    this.calssValue = this.classWarning;
    this.titleModal = 'Campos inválidos';

    // Validar days (mayor a 0)
    if (this.days <= 0) {
      this.hanglerErrorMsg('El salario debe ser mayor a 0');
      return false;
    }

    // Validar fecha de inciio no vacia
    if (this.startDate === '') {
      this.hanglerErrorMsg('Debe de elegir la fecha de inicio');
      return false;
    }

    // Validar employee id > 0
    if (this.employeeId <= 0) {
      this.hanglerErrorMsg('Debe de elegir la fecha de inicio');
      return false;
    }

    return true
  }

  submit() {
    if (!this.validFormRequest()) {
      return
    }
    const newReques: CreateRequestVacationDto = {
      days:this.days,
      employeeId: this.employeeId,
      startDate:this.startDate
    }

    this._vacationService.createVacationRequest(newReques).subscribe({
      next: value => {
        this.calssValue = this.classSucces
        this.titleModal = 'Solicitud Registrada'
        this.contentModal = 'La solicitud de vacaciones del empleado ha sido registrado, el encargado de su area lo revisara'
        this.modalRef2.nativeElement.showModal();
        this.modalRef2.nativeElement.addEventListener('close', () => {
          this.vacations.push(value)
          this.modalRef.nativeElement.close()
        }, { once: true });
      },
      error: err => {
        this.calssValue = this.classError
        this.titleModal = 'Error al acapetar la solicitd'
        this.hanglerError(err)
      }
    })
  }

  approveRequest(request: VacationPendingDto) {
    const update: UpdateRequestVacationDto = { approved: true }
    this._vacationService.updatePendingVacations(request.id, update).subscribe({
      next: value => {
        this.calssValue = this.classSucces
        this.titleModal = 'Solicitud aceptada'
        this.contentModal = 'La solicitud de vacaciones del empleado ha sido aceptada con exito'
        this.modalRef2.nativeElement.showModal();
        this.modalRef2.nativeElement.addEventListener('close', () => {
          this.vacations = value
        }, { once: true });
      },
      error: err => {
        this.calssValue = this.classError
        this.titleModal = 'Error al acapetar la solicitd'
        this.hanglerError(err)
      }
    })
  }

  rejectRequest(request: VacationPendingDto) {
    const update: UpdateRequestVacationDto = { approved: false }
    this._vacationService.updatePendingVacations(request.id, update).subscribe({
      next: value => {
        this.calssValue = this.classSucces
        this.titleModal = 'Solicitud rechazada'
        this.contentModal = 'La solicitud del empleado para sus vacaciones ha sido rechazado'
        this.modalRef2.nativeElement.showModal();
        this.modalRef2.nativeElement.addEventListener('close', () => {
          this.vacations = value
        }, { once: true });
      },
      error: err => {
        this.calssValue = this.classError
        this.titleModal = 'Error al rechazar la solicitd'
        this.hanglerError(err)
      }
    })

  }

}
