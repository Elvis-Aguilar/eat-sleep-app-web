import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { EmployeeDto } from 'app/modules/MANAGER/models/employee.interface';
import { EmployeeService } from 'app/modules/MANAGER/service/employee.service';
import { Session } from 'app/modules/session/models/auth';
import {
  Menu,
  X,
  ChartPie,
  Library,
  BookPlus,
  FilePlus,
  ChartNoAxesCombined,
  Wallet,
  CreditCard,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-sidebar-restaurtan',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar-restaurtan.component.html',
})
export class SidebarRestaurtanComponent {
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

  goDetails() {
    this.route.navigate(['restaurant/details', this.employee()?.restaurantId]);
  }

  goDishes() {
    this.route.navigate(['restaurant/dishes', this.employee()?.restaurantId]);
  }

  goSale() {
    this.route.navigate(['restaurant/sale', this.employee()?.restaurantId]);
  }

  goReports() {
    this.route.navigate(['restaurant/orders', this.employee()?.restaurantId]);
  }
}
