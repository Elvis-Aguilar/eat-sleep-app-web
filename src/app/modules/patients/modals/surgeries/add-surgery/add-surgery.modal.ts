import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewSurgery } from '@patients/models/surgery.model';
import { Tariff } from '@patients/models/tariff.model';
import { PatientSurgeriesService } from '@patients/services/patient-surgeries.service';
import { TariffService } from '@patients/services/tariff.service';
import { AlertStore } from 'app/store/alert.store';
import { ModalStore } from 'app/store/modal.store';

@Component({
  selector: 'patient-details-add-surgery',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-surgery.modal.html',
  styleUrl: './add-surgery.modal.css',
})
export class AddSurgeryModal implements OnChanges {
  private readonly surgeriesService = inject(PatientSurgeriesService);
  private readonly tariffService = inject(TariffService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly alertStore = inject(AlertStore);
  private readonly modalStore = inject(ModalStore);

  @Input() patientId!: number;
  @Input() refreshSurgeries!: () => void;

  tariffs?: Tariff[];
  creating = false;

  addForm: FormGroup = this.formBuilder.group({
    description: ['', [Validators.required, Validators.minLength(2)]],
    performedDate: ['', [Validators.required]],
    tariffId: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnChanges(): void {
    this.tariffService.getAllTariffs().subscribe((tariffs) => {
      this.tariffs = tariffs;
    });
  }

  addSurgery() {
    if (this.creating || this.addForm.invalid) {
      return;
    }

    this.creating = true;
    const surgery: NewSurgery = this.addForm.getRawValue();

    this.surgeriesService
      .createPatientSurgery(this.patientId, surgery)
      .subscribe({
        next: () => {
          this.creating = false;
          this.refreshSurgeries();
          this.addForm.patchValue({
            description: '',
            performedDate: '',
            tariffId: 0,
          });
          this.alertStore.addAlert({
            message: 'Se agendó la cirugía exitosamente',
            type: 'success',
          });
          this.modalStore.closeModal();
        },
        error: (err) => {
          this.creating = false;
          this.alertStore.addAlert({
            message: 'No se pudo agendar la cirugía, intente mas tarde',
            type: 'error',
          });
          console.log(err);
        },
      });
  }
}
