import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewPatient } from '@patients/models/patient.model';
import { PatientService } from '@patients/services/patient.service';
import { AlertStore } from 'app/store/alert.store';

@Component({
  selector: 'patient-edit-patient',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-patient.modal.html',
  styleUrl: './edit-patient.modal.css',
})
export class EditPatientModal implements OnChanges {
  private readonly patientService = inject(PatientService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly alertStore = inject(AlertStore);

  @Input() id!: number;
  @Input() onUpdated!: () => void;

  updating = false;

  editForm: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    birthDate: ['', []],
    phone: ['', [Validators.minLength(2)]],
    email: ['', [Validators.minLength(2), Validators.email]],
  });

  ngOnChanges() {
    this.patientService.getPatientById(this.id).subscribe((patient) => {
      this.editForm.patchValue({ ...patient });
    });
  }

  editPatient() {
    if (this.updating || this.editForm.invalid) {
      return;
    }

    this.updating = true;
    const patient: NewPatient = this.editForm.getRawValue();
    this.patientService.updatePatient(this.id, patient).subscribe({
      next: () => {
        this.updating = false;
        this.ngOnChanges();
        this.alertStore.addAlert({
          message: 'Paciente actualizado exitosamente',
          type: 'success',
        });
        this.onUpdated();
      },
      error: (err) => {
        this.updating = false;
        this.alertStore.addAlert({
          message: 'El paciente no pudo ser actualizado, intente mas tarde',
          type: 'error',
        });
        console.log(err);
      },
    });
  }
}
