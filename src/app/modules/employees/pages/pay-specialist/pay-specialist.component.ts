import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { PaymentPerSurgeryDto } from '../../models/payment.dto';
import { ModalMsgComponent } from '@shared/components/modal-msg/modal-msg.component';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-pay-specialist',
  imports: [ModalMsgComponent],
  templateUrl: './pay-specialist.component.html',
  styleUrl: './pay-specialist.component.css'
})
export class PaySpecialistComponent {

  @ViewChild('modal1') modalRef2!: ElementRef<HTMLDialogElement>;


  private readonly _payService = inject(PaymentService)

  classSucces = 'text-purple-700 text-lg'
  classError = 'text-red-700 text-lg'
  classWarning = 'text-yellow-700 text-lg'
  calssValue = ''
  titleModal = ''
  contentModal = ''

  paymentPerSpecialists: PaymentPerSurgeryDto[] = []

  ngOnInit() {
    this.getAllPayments()
  }

  getAllPayments(){
    this._payService.getAllPayments().subscribe({
      next: value =>{
        this.paymentPerSpecialists = value
      }
    })
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
  }

  createPayment(pay: PaymentPerSurgeryDto) {
    this._payService.createPayment(pay).subscribe({
      next: value => {
        this.calssValue = this.classSucces
        this.titleModal = 'Pago Realizado con exito'
        this.contentModal = 'El pago al medico Especialista se ha realizado con exito'
        this.modalRef2.nativeElement.showModal();
        this.getAllPayments()
        this.modalRef2.nativeElement.addEventListener('close', () => {
        }, { once: true });
      },
      error: err => {
        this.calssValue = this.classError
        this.titleModal = 'Error al Realizar el pago'
        this.hanglerError(err)
      }
    })
  }

}
