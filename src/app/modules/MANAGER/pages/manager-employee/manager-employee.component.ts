import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { EmployeeDto } from '../../models/employee.interface';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertStore } from 'app/store/alert.store';
import { HandlerError } from '@shared/utils/handlerError';

@Component({
  selector: 'app-manager-employee',
  imports: [CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './manager-employee.component.html',
})
export class ManagerEmployeeComponent {
  // reference modals
  @ViewChild('modalPayEmployees')
  modalPayEmployees!: ElementRef<HTMLDialogElement>;

  // inject services
  private readonly _employeeService = inject(EmployeeService);
  private readonly alertStore = inject(AlertStore);

  private HandlerError = HandlerError;

  // variables signals
  employees = signal<EmployeeDto[]>([]);
  startDate: string = '';
  endDate: string = '';

  ngOnInit() {
    this.getAllEmployeesNoManager();
  }

  getAllEmployeesNoManager() {
    this._employeeService.getAllEmployeesNoManager().subscribe({
      next: (value) => {
        this.employees.set(value);
      },
    });
  }

  openModal() {
    this.modalPayEmployees.nativeElement.showModal();
  }

  savePayroll() {
    // validar fechas
    if (!this.startDate || !this.endDate) {
      this.alertStore.addAlert({
        message: 'Por favor, ingrese ambas fechas.',
        type: 'warning',
      });
      return;
    }

    // validar que la fecha de inicio sea menor a la fecha de fin
    if (this.startDate > this.endDate) {
      this.alertStore.addAlert({
        message: 'La fecha de inicio debe ser menor a la fecha de fin.',
        type: 'warning',
      });
      return;
    }

    //validar que entre las fechas hayan 7 dias exactos (una semana)
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // sumar 1 para incluir ambos días
    if (diffDays !== 7) {
      this.alertStore.addAlert({
        message: 'El rango de fechas debe ser de 7 días (una semana).',
        type: 'warning',
      });
      return;
    }

    // llamar al servicio para guardar el pago de planilla
    this._employeeService
      .payAllEmployees(this.startDate, this.endDate)
      .subscribe({
        next: () => {
          this.alertStore.addAlert({
            message: 'Pago de planilla registrado exitosamente.',
            type: 'success',
          });
          this.modalPayEmployees.nativeElement.close();
        },
        error: (err) => {
          const msgDefault =
            'Error al registrar el pago de planilla. Por favor, intente nuevamente más tarde.';
          this.HandlerError.handleError(err, this.alertStore, msgDefault);
        },
      });
  }
}
