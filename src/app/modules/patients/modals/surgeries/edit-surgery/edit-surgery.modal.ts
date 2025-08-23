import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Surgery, UpdateSurgery } from '@patients/models/surgery.model';
import { PatientSurgeriesService } from '@patients/services/patient-surgeries.service';
import { AlertStore } from 'app/store/alert.store';

@Component({
  selector: 'patient-details-edit-surgery',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-surgery.modal.html',
  styleUrl: './edit-surgery.modal.css',
})
export class EditSurgeryModal {
  private readonly surgeriesService = inject(PatientSurgeriesService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly alertStore = inject(AlertStore);

  @Input() patientId!: number;
  @Input() surgery!: Surgery;
  @Input() refreshSurgeries!: () => void;

  updating = false;

  editForm: FormGroup = this.formBuilder.group({
    description: ['', [Validators.required, Validators.minLength(2)]],
    performedDate: ['', [Validators.required]],
  });

  ngOnChanges(): void {
    this.editForm.patchValue({ ...this.surgery });
  }

  editSurgery() {
    if (this.updating || this.editForm.invalid) {
      return;
    }

    this.updating = true;
    const surgery: UpdateSurgery = this.editForm.getRawValue();
    this.surgeriesService
      .updatePatientSurgery(this.patientId, this.surgery.id, surgery)
      .subscribe({
        next: () => {
          this.updating = false;
          this.ngOnChanges();
          this.alertStore.addAlert({
            message: 'Cirugía actualizada exitosamente',
            type: 'success',
          });
          this.refreshSurgeries();
        },
        error: (err) => {
          this.updating = false;
          this.alertStore.addAlert({
            message: 'No se pudo actualizar la cirugía, intente mas tarde',
            type: 'error',
          });
          console.log(err);
        },
      });
  }
}
