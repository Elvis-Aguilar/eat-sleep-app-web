import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AreaResponseDto } from '../../models/area.dto';
import { EmployeeDto } from '../../models/employee.dto';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { AreaService } from '../../services/area.service';
import { ContractService } from '../../services/contract.service';
import { ContractDto, FinishContractDto, UpdateEmployeeDto, UpdateSalaryDto } from '../../models/contract.dto';
import { FormNewContractComponent } from '../../components/form-new-contract/form-new-contract.component';
import { ModalMsgComponent } from '@shared/components/modal-msg/modal-msg.component';

@Component({
  selector: 'app-view-employee',
  imports: [FormsModule, FormNewContractComponent, ModalMsgComponent],
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent {

  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal1') modalFinnishRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal2') modalRef2!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal3') modalUpdateSalaryRef!: ElementRef<HTMLDialogElement>;



  private readonly _employeeService = inject(EmployeeService)
  private readonly _areaService = inject(AreaService)
  private readonly route = inject(Router)
  private readonly _contractService = inject(ContractService)

  areas: AreaResponseDto[] = []
  employee!: EmployeeDto;
  contract!: ContractDto;

  description: string = '';
  newSalary: number = 0;
  isIncremente: boolean = true;
  isDimissal: boolean = false;

  classSucces = 'text-purple-700 text-lg'
  classError = 'text-red-700 text-lg'
  classWarning = 'text-yellow-700 text-lg'
  calssValue = ''
  titleModal = ''
  contentModal = ''


  ngOnInit() {
    this.employee = this._employeeService.employee
    if (!this.employee) {
      this.route.navigate(['employee-management/employees'])
    }
    this.getAllAreas()
    this.getFirstContractByEmployeeId(this.employee.id)
  }


  getAllAreas() {
    this._areaService.getAllAreas().subscribe({
      next: value => {
        this.areas = value
      }
    })
  }

  getFirstContractByEmployeeId(idEmployee: number) {
    this._contractService.getFirstContractByEmployeeId(idEmployee).subscribe({
      next: value => {
        this.contract = value
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

  finish(finish: FinishContractDto) {

    this._contractService.finishContract(this.contract.id, finish).subscribe({
      next: value => {
        this.calssValue = this.classSucces
        this.titleModal = 'Contrato terminado'
        this.contentModal = 'El contrato ha sido finalizado con exito, puede ver el historial'
        this.modalRef2.nativeElement.showModal();
        this.modalRef2.nativeElement.addEventListener('close', () => {
          this.route.navigate(['/employee-management/employees']);
        }, { once: true });
      },
      error: err => {
        this.calssValue = this.classError
        this.titleModal = 'Error al finalizar el contrato'
        this.hanglerError(err)
      }
    })
  }

  dimisi(finish: FinishContractDto) {
    this._contractService.dismissalWork(this.contract.id, finish).subscribe({
      next: value => {
        this.calssValue = this.classSucces
        this.titleModal = 'Despido finalizado'
        this.contentModal = 'El despido del empleado se ha registrado exitosamente'
        this.modalRef2.nativeElement.showModal();
        this.modalRef2.nativeElement.addEventListener('close', () => {
          this.route.navigate(['/employee-management/employees']);
        }, { once: true });
      },
      error: err => {
        this.calssValue = this.classError
        this.titleModal = 'Error al finalizar el contrato'
        this.hanglerError(err)
      }
    })
  }

  finishContract() {

    if (this.description === '') {
      this.calssValue = this.classWarning;
      this.titleModal = 'Campos inválidos';
      this.hanglerErrorMsg('la descripcion no puede estar vacia');
      return
    }

    const finish: FinishContractDto = {
      description: this.description,
      cui:this.employee.cui
    }

    if (this.isDimissal) {
      this.dimisi(finish)
      return
    }
    this.finish(finish)

  }




  updateSalary() {
    if (this.newSalary <= 0) {
      this.calssValue = this.classWarning;
      this.titleModal = 'Campos inválidos';
      this.hanglerErrorMsg('El salario debe ser mayor a cero');
      return
    }

    const updateSal: UpdateSalaryDto = {
      isIncrement: this.isIncremente,
      salary: this.newSalary
    }

    this._contractService.updateSalary(this.contract.id, updateSal).subscribe({
      next: value => {
        this.calssValue = this.classSucces
        this.titleModal = 'El salario ha sido actualizado'
        this.contentModal = 'El salario ha sido actulizado, entra en vigencia desde el dia de hoy'
        this.modalRef2.nativeElement.showModal();
        this.modalRef2.nativeElement.addEventListener('close', () => {
          this.route.navigate(['/employee-management/employees']);
        }, { once: true });
      },
      error: err => {
        this.calssValue = this.classError
        this.titleModal = 'Error al actualizar el salario'
        this.hanglerError(err)
      }
    })
  }

  closeModal() {
    this.modalRef.nativeElement.close()
  }

  closeModalFinish() {
    this.modalFinnishRef.nativeElement.close()
  }

  openModalFisnish(isDimissal: boolean) {
    this.isDimissal = isDimissal;
    this.modalFinnishRef.nativeElement.showModal()
  }

  openNewContract() {
    this.modalRef.nativeElement.showModal()
  }

  openModalUpdateSalary(isIncrement: boolean) {
    this.isIncremente = isIncrement;
    this.modalUpdateSalaryRef.nativeElement.showModal();
  }

  closeModalUpadteSalary() {
    this.modalUpdateSalaryRef.nativeElement.close();
  }

  formatDateTime(date: any): string {
    if (!date) {
      return date
    }
    const dateString = `${date}`
    const [datePart, timePart] = dateString.split('T');
    const time = timePart.slice(0, 5);

    return `${datePart} ${time} hrs`;
  }


  updateEmployeeArea(){

    if (this.employee.email === '' || this.employee.phone === '') {
      this.calssValue = this.classWarning;
      this.titleModal = 'Campos inválidos';
      this.hanglerErrorMsg('Email y telefono no puden estar vacios');
      return
    }

    const areaId: number = this.areas.find(ar => ar.name === this.employee.areaName)?.id || 0;

    const employeeUpdate:UpdateEmployeeDto = {
      areId:Number(areaId),
      email:this.employee.email,
      phone:this.employee.phone
    }

    this._employeeService.updateAreaEmployee(this.employee.id, employeeUpdate).subscribe({
      next: value =>{
        this.calssValue = this.classSucces
        this.titleModal = 'Datos Actualizados'
        this.contentModal = 'Los Datos el empleado se han actualizado con exito'
        this.modalRef2.nativeElement.showModal();
      },
      error: err =>{
        this.calssValue = this.classError
        this.titleModal = 'Error al actualizar '
        this.hanglerError(err)
      }
    })
    
  }
}
