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
import { AdmissionEmployeesService } from '@patients/services/patient-employees.service';
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
  private readonly employeesService = inject(AdmissionEmployeesService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly alertStore = inject(AlertStore);
  private readonly modalStore = inject(ModalStore);

  readonly Trash = Trash;

  @Input() patientId!: number;
  @Input() admissionId!: number;
  @Input() refreshAdmissions!: () => void;

  appending = false;
  employees?: AssignedEmployee[];

  appendForm: FormGroup = this.formBuilder.group({
    employeeIds: this.formBuilder.array([]),
  });

  ngOnChanges(): void {
    this.employeesService
      .getAllAdmissionAssignedEmployees(this.patientId, this.admissionId)
      .subscribe((employees) => {
        this.getEmployeeIds().clear();
        employees
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
      });

    this.employeesService.getAvailableEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  getEmployeeIds() {
    return this.appendForm.get('employeeIds') as FormArray;
  }

  getEmployees() {
    const employeeIds = this.getEmployeeIds().controls.map((e) => e.value);
    return this.employees?.filter((e) => !employeeIds.includes(e.employeeId));
  }

  getEmployee(employeeId: number) {
    return this.employees?.filter((e) => e.employeeId === employeeId)[0];
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
    const employeeIds: number[] = this.appendForm.getRawValue().employeeIds;
    this.employeesService
      .assignEmployeesToAdmission(this.patientId, this.admissionId, employeeIds)
      .subscribe({
        next: () => {
          this.appending = false;
          this.refreshAdmissions();
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
