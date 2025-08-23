import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NewBill } from '@patients/models/bill.model';
import { PatientBillsService } from '@patients/services/patient-bills.service';
import { AlertStore } from 'app/store/alert.store';
import { ModalStore } from 'app/store/modal.store';

@Component({
  selector: 'patient-details-add-bill',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-bill.modal.html',
  styleUrl: './add-bill.modal.css',
})
export class AddBillModal {
  private readonly billsService = inject(PatientBillsService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly alertStore = inject(AlertStore);
  private readonly modalStore = inject(ModalStore);

  @Input() patientId!: number;
  @Input() refreshBills!: () => void;

  creating = false;

  addForm: FormGroup = this.formBuilder.group({});

  addBill() {
    if (this.creating || this.addForm.invalid) {
      return;
    }

    this.creating = true;
    const bill: NewBill = this.addForm.getRawValue();

    this.billsService.createPatientBill(this.patientId).subscribe({
      next: () => {
        this.creating = false;
        this.refreshBills();
        this.addForm.patchValue({});
        this.alertStore.addAlert({
          message: 'Se ha registrado la factura exitosamente',
          type: 'success',
        });
        this.modalStore.closeModal();
      },
      error: (err) => {
        this.creating = false;
        this.alertStore.addAlert({
          message: 'No se pudo registrar la factura, intente mas tarde',
          type: 'error',
        });
        console.log(err);
      },
    });
  }
}
