import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Admission, NewAdmission } from '@patients/models/admission.model';
import { Room } from '@patients/models/room.model';
import { PatientAdmissionService } from '@patients/services/patient-admission.service';
import { RoomService } from '@patients/services/room.service';
import { Page } from '@shared/models/pageable.model';
import { AlertStore } from 'app/store/alert.store';
import { ModalStore } from 'app/store/modal.store';

@Component({
  selector: 'patient-details-edit-admission',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-admission.modal.html',
  styleUrl: './edit-admission.modal.css',
})
export class EditAdmissionModal implements OnInit, OnChanges {
  private readonly admissionsService = inject(PatientAdmissionService);
  private readonly roomService = inject(RoomService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly alertStore = inject(AlertStore);
  private readonly modalStore = inject(ModalStore);

  @Input() patientId!: number;
  @Input() admission!: Admission;
  @Input() refreshAdmissions!: () => void;

  rooms?: Page<Room>;
  editing = false;

  editForm: FormGroup = this.formBuilder.group({
    admissionDate: ['', [Validators.required]],
    dischargeDate: ['', []],
    roomId: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.ngOnChanges();
    this.editForm.get('admissionDate')?.disable();
  }

  ngOnChanges(): void {
    this.roomService.getAllAvailableRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
    this.editForm.patchValue({ ...this.admission });
  }

  editAdmission() {
    if (this.editing || this.editForm.invalid) {
      return;
    }

    this.editing = true;
    const admission: NewAdmission = this.editForm.getRawValue();

    if (admission.dischargeDate === '') {
      admission.dischargeDate = undefined;
    }
    if (admission.dischargeDate) {
      const dischargeDate = new Date(admission.dischargeDate);
      if (isNaN(+dischargeDate)) {
        admission.dischargeDate = undefined;
      } else if (
        Date.parse(admission.admissionDate) >
        Date.parse(admission.dischargeDate)
      ) {
        this.alertStore.addAlert({
          message: 'La fecha de ingreso no puede ser posterior a la de alta',
          type: 'error',
        });
        this.editing = false;
        return;
      }
    }

    this.admissionsService
      .updatePatientAdmission(this.patientId, this.admission.id, admission)
      .subscribe({
        next: () => {
          this.editing = false;
          this.refreshAdmissions();
          this.alertStore.addAlert({
            message: 'Se ha editado el paciente exitosamente',
            type: 'success',
          });
          this.modalStore.closeModal();
        },
        error: (err) => {
          this.editing = false;
          this.alertStore.addAlert({
            message: 'No se pudo editar el paciente, intente mas tarde',
            type: 'error',
          });
          console.log(err);
        },
      });
  }
}
