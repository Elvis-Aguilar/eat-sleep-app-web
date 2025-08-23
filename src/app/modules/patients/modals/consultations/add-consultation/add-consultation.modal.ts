import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewBillItem } from '@patients/models/bill.model';
import { PatientBillItemsService } from '@patients/services/patient-bill-items.service';
import { AlertStore } from 'app/store/alert.store';
import { ModalStore } from 'app/store/modal.store';

@Component({
  selector: 'patient-details-add-consultation',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-consultation.modal.html',
  styleUrl: './add-consultation.modal.css',
})
export class AddConsultationModal {
  private readonly consultationsService = inject(PatientBillItemsService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly alertStore = inject(AlertStore);
  private readonly modalStore = inject(ModalStore);

  @Input() patientId!: number;
  @Input() refreshConsultations!: () => void;

  creating = false;

  addForm: FormGroup = this.formBuilder.group({
    concept: ['', [Validators.required, Validators.minLength(2)]],
  });

  addConsultation() {
    if (this.creating || this.addForm.invalid) {
      return;
    }

    this.creating = true;
    const consultation: NewBillItem = this.addForm.getRawValue();

    this.consultationsService
      .createPatientConsultation(this.patientId, consultation)
      .subscribe({
        next: () => {
          this.creating = false;
          this.refreshConsultations();
          this.addForm.patchValue({
            concept: '',
          });
          this.alertStore.addAlert({
            message: 'Se ha registrado la consulta exitosamente',
            type: 'success',
          });
          this.modalStore.closeModal();
        },
        error: (err) => {
          this.creating = false;
          this.alertStore.addAlert({
            message: 'No se pudo registrar la consulta, intente mas tarde',
            type: 'error',
          });
          console.log(err);
        },
      });
  }
}
