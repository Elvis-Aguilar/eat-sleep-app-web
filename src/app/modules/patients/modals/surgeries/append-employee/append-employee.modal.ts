import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AssignedEmployee } from '@patients/models/employee.model';
import { SurgerySpecialistsService } from '@patients/services/surgery-specialists.service';
import { AlertStore } from 'app/store/alert.store';
import { ModalStore } from 'app/store/modal.store';
import { LucideAngularModule, Trash } from 'lucide-angular';

@Component({
  selector: 'patient-details-append-employee',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './append-employee.modal.html',
  styleUrl: './append-employee.modal.css',
})
export class AppendEmployeeModal implements OnChanges {
  private readonly specialistsService = inject(SurgerySpecialistsService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly alertStore = inject(AlertStore);
  private readonly modalStore = inject(ModalStore);

  readonly Trash = Trash;

  @Input() patientId!: number;
  @Input() surgeryId!: number;
  @Input() refreshSurgeries!: () => void;

  appending = false;
  specialists?: AssignedEmployee[];
  employees?: AssignedEmployee[];

  appendForm: FormGroup = this.formBuilder.group({
    specialistId: [0],
    employeeIds: this.formBuilder.array([]),
  });

  ngOnChanges(): void {
    this.specialistsService
      .getAllSurgerySpecialists(this.patientId, this.surgeryId)
      .subscribe((specialists) => {
        this.getEmployeeIds().clear();
        specialists
          .filter((e) => e.type !== 'SPECIALIST')
          .map((e) =>
            this.formBuilder.control(e.employeeId, [
              Validators.required,
              Validators.min(1),
            ])
          )
          .forEach((e) => {
            e.disable();
            this.getEmployeeIds().push(e);
          });

        const specialist = specialists.filter(
          (e) => e.type === 'SPECIALIST'
        )[0];

        if (specialist) {
          this.appendForm
            .get('specialistId')
            ?.patchValue(specialist.employeeId);
        }
      });

    this.specialistsService
      .getAvailableSpecialists()
      .subscribe((specialists) => {
        this.specialists = specialists;
      });

    this.specialistsService.getAvailableEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  getEmployeeIds() {
    return this.appendForm.get('employeeIds') as FormArray;
  }

  getEmployees() {
    const specialistIds = this.getEmployeeIds().controls.map((e) => e.value);
    return this.employees?.filter(
      (e) => !specialistIds.includes(e.employeeId)
    );
  }

  getEmployee(employeeId: number) {
    return this.employees?.filter((e) => e.employeeId === employeeId)[0];
  }

  getSpecialist(employeeId: number) {
    return this.specialists?.filter((e) => e.employeeId === employeeId)[0];
  }

  appendEmployeeInput() {
    const employeeIds = this.getEmployeeIds();
    employeeIds.at(-1)?.disable();
    employeeIds.push(
      this.formBuilder.control(0, [Validators.required, Validators.min(1)])
    );
  }

  removeEmployee(index: number) {
    this.getEmployeeIds().removeAt(index);
  }

  appendEmployee() {
    if (this.appending || this.appendForm.invalid) {
      return;
    }

    this.appending = true;
    const {
      specialistId,
      employeeIds,
    }: { specialistId: number; employeeIds: number[] } =
      this.appendForm.getRawValue();

    if (+specialistId) {
      employeeIds.push(specialistId);
    }

    this.specialistsService
      .assignSpecialistsToSurgery(this.patientId, this.surgeryId, employeeIds)
      .subscribe({
        next: () => {
          this.appending = false;
          this.refreshSurgeries();
          this.getEmployeeIds().clear();
          this.alertStore.addAlert({
            message: 'Se han asignado los empleados exitosamente',
            type: 'success',
          });
          this.modalStore.closeModal();
        },
        error: (err) => {
          this.appending = false;
          this.alertStore.addAlert({
            message: 'No se pudo asignar el empleado, intente mas tarde',
            type: 'error',
          });
          console.log(err);
        },
      });
  }
}
