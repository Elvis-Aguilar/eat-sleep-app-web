import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { EmployeeDto } from 'app/modules/MANAGER/models/employee.interface';
import { EmployeeService } from 'app/modules/MANAGER/service/employee.service';
import { Session } from 'app/modules/session/models/auth';
import {
  BookPlus,
  ChartNoAxesCombined,
  ChartPie,
  FilePlus,
  Library,
  LucideAngularModule,
  Menu,
  Wallet,
  X,
  CreditCard,
} from 'lucide-angular';

@Component({
  selector: 'app-sidebar-hotel',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar-hotel.component.html',
})
export class SidebarHotelComponent {
  private readonly route = inject(Router);
  private readonly employeeService = inject(EmployeeService);
  private readonly localStorageService = inject(LocalStorageService);

  readonly Menu = Menu;
  readonly Close = X;
  readonly Dashboard = ChartPie;
  readonly Magazines = Library;
  readonly PublishMagazine = BookPlus;
  readonly PublishIssue = FilePlus;
  readonly Reports = ChartNoAxesCombined;
  readonly Wallet = Wallet;
  readonly Payment = CreditCard;

  isCollapsed = true;

  session: Session = this.localStorageService.getState().session;

  employee = signal<EmployeeDto | null>(null);

  ngOnInit() {
    this.getEmployeeById();
  }

  getEmployeeById() {
    this.employeeService.getEmployeeById(this.session.employeeId).subscribe({
      next: (value) => {
        this.employee.set(value);
      },
      error: (err) => {
        this.employee.set(null);
      },
    });
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  goHotel() {
    this.route.navigate(['hotel/details', this.employee()?.hotelId]);
  }

  goRooms() {
    this.route.navigate(['hotel/rooms', this.employee()?.hotelId]);
  }

  goReservations() {
    this.route.navigate(['hotel/reservations', this.employee()?.hotelId]);
  }

  goReports() {
    this.route.navigate(['hotel/reports']);
  }
}
