import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Surgery } from '@patients/models/surgery.model';
import { PatientSurgeriesService } from '@patients/services/patient-surgeries.service';
import { SurgerySpecialistsService } from '@patients/services/surgery-specialists.service';
import { Page } from '@shared/models/pageable.model';
import { ModalStore } from 'app/store/modal.store';
import {
  ChevronLeft,
  ChevronRight,
  LucideAngularModule,
  Pencil,
  UserRoundPlus,
} from 'lucide-angular';

@Component({
  selector: 'patient-details-surgeries',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './surgeries.component.html',
  styleUrl: './surgeries.component.css',
})
export class SurgeriesComponent implements OnInit {
  private readonly surgeriesService = inject(PatientSurgeriesService);
  private readonly specialistsService = inject(SurgerySpecialistsService);
  private readonly modalStore = inject(ModalStore);

  readonly Previous = ChevronLeft;
  readonly Next = ChevronRight;
  readonly Edit = Pencil;
  readonly Add = UserRoundPlus;

  surgeries?: Page<Surgery>;
  patientId: number = inject(ActivatedRoute).snapshot.params['id'];

  ngOnInit(): void {
    this.fetchSurgeries();
  }

  typeToString(type: string): string {
    switch (type) {
      case 'DOCTOR':
        return 'Doctor';
      case 'SPECIALIST':
        return 'Especialista';
      case 'NURSE':
        return 'Enfermera';
      default:
        return 'Desconocido';
    }
  }

  isCompleted(surgery: Surgery) {
    return new Date(surgery.performedDate) < new Date();
  }

  fetchSurgeries(next: boolean = false, previous: boolean = false) {
    const page = (this.surgeries?.number || 0) + (+next || -previous);

    this.surgeriesService
      .getAllPatientSurgeries(this.patientId, { page })
      .subscribe((surgeries) => {
        this.surgeries = surgeries;
        this.surgeries?.content.forEach((s) => {
          this.specialistsService
            .getAllSurgerySpecialists(this.patientId, s.id)
            .subscribe((employees) => {
              s.specialists = employees;
            });
        });
      });
  }

  createSurgery() {
    this.modalStore.openModal(
      () =>
        import('@patients/modals/surgeries/add-surgery/add-surgery.modal').then(
          (m) => m.AddSurgeryModal
        ),
      {
        patientId: this.patientId,
        refreshSurgeries: () => this.fetchSurgeries(),
      }
    );
  }

  appendEmployee(surgery: Surgery) {
    this.modalStore.openModal(
      () =>
        import(
          '@patients/modals/surgeries/append-employee/append-employee.modal'
        ).then((m) => m.AppendEmployeeModal),
      {
        patientId: this.patientId,
        surgeryId: surgery.id,
        refreshSurgeries: () => this.fetchSurgeries(),
      }
    );
  }

  editSurgery(surgery: Surgery) {
    this.modalStore.openModal(
      () =>
        import(
          '@patients/modals/surgeries/edit-surgery/edit-surgery.modal'
        ).then((m) => m.EditSurgeryModal),
      {
        patientId: this.patientId,
        surgery,
        refreshSurgeries: () => this.fetchSurgeries(),
      }
    );
  }
}
