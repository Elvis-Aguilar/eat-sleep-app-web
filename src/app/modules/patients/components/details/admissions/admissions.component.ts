import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Admission } from '@patients/models/admission.model';
import { PatientAdmissionService } from '@patients/services/patient-admission.service';
import { AdmissionEmployeesService } from '@patients/services/patient-employees.service';
import { Page } from '@shared/models/pageable.model';
import { ModalStore } from 'app/store/modal.store';
import { ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'patient-details-admissions',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './admissions.component.html',
  styleUrl: './admissions.component.css',
})
export class AdmissionsComponent implements OnInit {
  private readonly admissionsService = inject(PatientAdmissionService);
  private readonly employeesService = inject(AdmissionEmployeesService);
  private readonly modalStore = inject(ModalStore);

  readonly Previous = ChevronLeft;
  readonly Next = ChevronRight;

  admissions?: Page<Admission>;

  patientId: number = inject(ActivatedRoute).snapshot.params['id'];
  currentAdmission?: Admission;

  ngOnInit(): void {
    this.fetchAdmissions();
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

  isAdmitted(admission: Admission) {
    return (
      !admission.dischargeDate || new Date(admission.dischargeDate) > new Date()
    );
  }

  fetchAdmissions(next: boolean = false, previous: boolean = false) {
    const page = (this.admissions?.number || 0) + (+next || -previous);

    this.admissionsService
      .getAllPatientAdmissions(this.patientId, { page })
      .subscribe((admissions) => {
        this.admissions = admissions;
      });

    if (!next && !previous) {
      this.admissionsService
        .getPatientAdmissionByAdmitted(this.patientId)
        .subscribe((admission) => {
          this.currentAdmission = admission.pop();
          if (this.currentAdmission) {
            this.employeesService
              .getAllAdmissionAssignedEmployees(
                this.patientId,
                this.currentAdmission.id
              )
              .subscribe((employees) => {
                this.currentAdmission!.assignedEmployees = employees;
              });
          }
        });
    }
  }

  createAdmission() {
    this.modalStore.openModal(
      () =>
        import(
          '@patients/modals/admissions/add-admission/add-admission.modal'
        ).then((m) => m.AddAdmissionModal),
      {
        patientId: this.patientId,
        refreshAdmissions: () => this.fetchAdmissions(),
      }
    );
  }

  appendEmployee() {
    this.modalStore.openModal(
      () =>
        import(
          '@patients/modals/admissions/append-employee/append-employee.modal'
        ).then((m) => m.AppendEmployeeModal),
      {
        patientId: this.patientId,
        admissionId: this.currentAdmission?.id,
        refreshAdmissions: () => this.fetchAdmissions(),
      }
    );
  }

  editCurrentAdmission() {
    this.modalStore.openModal(
      () =>
        import(
          '@patients/modals/admissions/edit-admission/edit-admission.modal'
        ).then((m) => m.EditAdmissionModal),
      {
        patientId: this.patientId,
        admission: this.currentAdmission,
        refreshAdmissions: () => this.fetchAdmissions(),
      }
    );
  }
}
