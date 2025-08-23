import { Component, ElementRef, Input, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalMsgComponent } from '@shared/components/modal-msg/modal-msg.component';
import { ContractService } from '../../services/contract.service';
import { NewContractDto } from '../../models/contract.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-new-contract',
  imports: [FormsModule, ModalMsgComponent],
  templateUrl: './form-new-contract.component.html',
  styleUrl: './form-new-contract.component.css'
})
export class FormNewContractComponent {

  @Input() idEmployee!: number;
  @Input() idContrac!: number;

  @ViewChild('modal1') modalRef2!: ElementRef<HTMLDialogElement>;

  private readonly _contractService = inject(ContractService)
  private readonly route = inject(Router)


  contract = {
    startDate: '',
    salary: 0,
    iggs: 0,
    irtra: 0,
  };

  classSucces = 'text-purple-700 text-lg'
  classError = 'text-red-700 text-lg'
  classWarning = 'text-yellow-700 text-lg'
  calssValue = ''
  titleModal = ''
  contentModal = ''

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


  // valida los datos del contrato antes de confirmar
  validDataContract(): boolean {
    this.calssValue = this.classWarning;
    this.titleModal = 'Campos inválidos';

    // Validar salario (mayor a 0)
    if (this.contract.salary <= 0) {
      this.hanglerErrorMsg('El salario debe ser mayor a 0');
      return false;
    }

    // Validar IGGS (no negativo)
    if (this.contract.iggs < 0) {
      this.hanglerErrorMsg('El IGGS no puede ser negativo');
      return false;
    }

    // Validar IRTRA (no negativo)
    if (this.contract.irtra < 0) {
      this.hanglerErrorMsg('El IRTRA no puede ser negativo');
      return false;
    }

    // Ejemplo: Validar que IGGS + IRTRA no sea mayor al 20% del salario
    const totalDeductions = this.contract.iggs + this.contract.irtra;
    if (totalDeductions > 20) {
      this.hanglerErrorMsg('Las deducciones no pueden exceder el 20% del salario');
      return false;
    }

    return true;
  }



  submit() {
    if (!this.validDataContract()) {
      return;
    }

    const newContract: NewContractDto = {
      idContract: this.idContrac,
      idEmployee: this.idEmployee,
      igssDiscount: this.contract.iggs,
      irtraDiscount: this.contract.irtra,
      salary:this.contract.salary
    }

    this._contractService.createNewContract(newContract).subscribe({
      next: value => {
        this.calssValue = this.classSucces
        this.titleModal = 'Nuevo Contrato Registrado'
        this.contentModal = 'El contrato ha sido registrado con exito, el anterior fue finalizado, puede ver el historial'
        this.modalRef2.nativeElement.showModal();
        this.modalRef2.nativeElement.addEventListener('close', () => {
          this.route.navigate(['/employee-management/employees']);
        }, { once: true });
      },
      error: err => {
        this.calssValue = this.classError
        this.titleModal = 'Error al registrar el nuevo contrato'
        this.hanglerError(err)
      }
    })
    


  }



}
