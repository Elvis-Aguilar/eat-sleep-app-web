import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NewAdmission } from '@patients/models/admission.model';
import { Room } from '@patients/models/room.model';
import { PatientAdmissionService } from '@patients/services/patient-admission.service';
import { RoomService } from '@patients/services/room.service';
import { Page } from '@shared/models/pageable.model';
import { AlertStore } from 'app/store/alert.store';
import { ModalStore } from 'app/store/modal.store';

@Component({
  selector: 'patient-details-add-admission',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-admission.modal.html',
  styleUrl: './add-admission.modal.css',
})
export class AddAdmissionModal implements OnInit, OnChanges {
  private readonly admissionsService = inject(PatientAdmissionService);
  private readonly roomService = inject(RoomService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly alertStore = inject(AlertStore);
  private readonly modalStore = inject(ModalStore);

  @Input() patientId!: number;
  @Input() refreshAdmissions!: () => void;

  rooms?: Page<Room>;
  creating = false;

  addForm: FormGroup = this.formBuilder.group({
    admissionDate: [
      formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      [Validators.required],
    ],
    dischargeDate: ['', []],
    roomId: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.ngOnChanges();
    this.addForm.get('admissionDate')?.disable();
  }

  ngOnChanges(): void {
    this.roomService.getAllAvailableRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  addAdmission() {
    if (this.creating || this.addForm.invalid) {
      return;
    }

    this.creating = true;
    const admission: NewAdmission = this.addForm.getRawValue();

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
        this.creating = false;
        return;
      }
    }

    this.admissionsService
      .createPatientAdmission(this.patientId, admission)
      .subscribe({
        next: () => {
          this.creating = false;
          this.refreshAdmissions();
          this.addForm.patchValue({
            admissionDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
            dischargeDate: undefined,
            roomId: 0,
          });
          this.alertStore.addAlert({
            message: 'Se ha internado el paciente exitosamente',
            type: 'success',
          });
          this.modalStore.closeModal();
        },
        error: (err) => {
          this.creating = false;
          this.alertStore.addAlert({
            message: 'No se pudo internar el paciente, intente mas tarde',
            type: 'error',
          });
          console.log(err);
        },
      });
  }
}
