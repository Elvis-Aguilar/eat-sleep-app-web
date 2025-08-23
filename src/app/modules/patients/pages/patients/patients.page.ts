import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Patient } from '@patients/models/patient.model';
import { PatientService } from '@patients/services/patient.service';
import { Page } from '@shared/models/pageable.model';
import { ModalStore } from 'app/store/modal.store';
import { LucideAngularModule, Pencil, Plus, ReceiptText } from 'lucide-angular';

@Component({
  selector: 'patient-patients',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './patients.page.html',
  styleUrl: './patients.page.css',
})
export class PatientsPage implements OnInit {
  private readonly patientService = inject(PatientService);
  private readonly modalStore = inject(ModalStore);

  readonly Details = ReceiptText;
  readonly Edit = Pencil;
  readonly Add = Plus;

  loading = false;

  patients: Page<Patient> = {
    content: [],
  };

  ngOnInit() {
    this.loading = true;
    this.patientService
      .getAllPatients({ sort: ['id'] })
      .subscribe((patients) => {
        this.patients = patients;
        this.loading = false;
      });
  }

  editPatient(id: number) {
    this.modalStore.openModal(
      () =>
        import('@patients/modals/edit-patient/edit-patient.modal').then(
          (m) => m.EditPatientModal
        ),
      { id, onUpdated: () => this.ngOnInit() }
    );
  }

  addPatient() {
    this.modalStore.openModal(
      () =>
        import('@patients/modals/add-patient/add-patient.modal').then(
          (m) => m.AddPatientModal
        ),
      { onCreated: () => this.ngOnInit() }
    );
  }

  search(event: Event) {
    this.loading = true;
    const target = event.target as HTMLInputElement;
    this.patientService
      .getAllPatients({ sort: ['id'], search: target.value })
      .subscribe((patients) => {
        this.patients = patients;
        this.loading = false;
      });
  }
}
