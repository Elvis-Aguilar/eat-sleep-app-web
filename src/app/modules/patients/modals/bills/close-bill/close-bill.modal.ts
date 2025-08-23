import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Bill, UpdateBill } from '@patients/models/bill.model';
import { PatientBillsService } from '@patients/services/patient-bills.service';
import { AlertStore } from 'app/store/alert.store';
import { ModalStore } from 'app/store/modal.store';

@Component({
  selector: 'patient-details-close-bill',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './close-bill.modal.html',
  styleUrl: './close-bill.modal.css',
})
export class CloseBillModal {
  private readonly billService = inject(PatientBillsService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly alertStore = inject(AlertStore);
  private readonly modalStore = inject(ModalStore);

  @Input() patientId!: number;
  @Input() bill!: Bill;
  @Input() refreshBills!: () => void;

  closing = false;

  closeForm: FormGroup = this.formBuilder.group({});

  closeBill() {
    if (this.closing || this.closeForm.invalid) {
      return;
    }

    this.closing = true;
    const bill: UpdateBill = this.closeForm.getRawValue();

    this.billService
      .updatePatientBill(this.patientId, this.bill.id, {
        isClosed: true,
        isPaid: true,
      })
      .subscribe({
        next: () => {
          this.closing = false;
          this.refreshBills();
          this.closeForm.patchValue({});
          this.alertStore.addAlert({
            message: 'Se ha cerrado la factura exitosamente',
            type: 'success',
          });
          this.modalStore.closeModal();
        },
        error: (err) => {
          this.closing = false;
          if (err.status === 409) {
            this.alertStore.addAlert({
              message: err.error.message,
              type: 'error',
            });
          } else {
            this.alertStore.addAlert({
              message: 'No se pudo cerrar la factura, intente mas tarde',
              type: 'error',
            });
          }
          console.log(err);
        },
      });
  }
}
