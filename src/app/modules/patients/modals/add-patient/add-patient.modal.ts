import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
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
  selector: 'patient-add-patient',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-patient.modal.html',
  styleUrl: './add-patient.modal.css',
})
export class AddPatientModal {
  private readonly patientService = inject(PatientService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly alertStore = inject(AlertStore);

  @Input() onCreated!: () => void;

  creating = false;

  addForm: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    cui: ['', [Validators.required, Validators.minLength(2)]],
    birthDate: ['', []],
    phone: ['', [Validators.minLength(2)]],
    email: ['', [Validators.minLength(2), Validators.email]],
  });

  addPatient() {
    if (this.creating || this.addForm.invalid) {
      return;
    }

    this.creating = true;
    const patient: NewPatient = this.addForm.getRawValue();
    this.patientService.createPatient(patient).subscribe({
      next: () => {
        this.creating = false;
        this.addForm.reset();
        this.alertStore.addAlert({
          message: 'Paciente creado exitosamente',
          type: 'success',
        });
        this.onCreated();
      },
      error: (err) => {
        this.creating = false;
        this.alertStore.addAlert({
          message: 'El paciente no pudo ser creado, intente mas tarde',
          type: 'error',
        });
        console.log(err);
      },
    });
  }
}
