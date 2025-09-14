import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TarjetComponent } from '@shared/components/tarjet/tarjet.component';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { EmployeeDto } from 'app/modules/MANAGER/models/employee.interface';
import { Restaurant } from 'app/modules/MANAGER/models/restaurant.interface';
import { EmployeeService } from 'app/modules/MANAGER/service/employee.service';
import { RestaurantService } from 'app/modules/MANAGER/service/restaurant.service';
import { Session } from 'app/modules/session/models/auth';

@Component({
  selector: 'app-dashboard-restaurant',
  imports: [TarjetComponent],
  templateUrl: './dashboard-restaurant.component.html',
})
export class DashboardRestaurantComponent {
  private readonly route = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly employeeService = inject(EmployeeService);
  private readonly restaurantService = inject(RestaurantService);

  session: Session = this.localStorageService.getState().session;

  employee = signal<EmployeeDto | null>(null);
  restaurant = signal<Restaurant | null>(null);

  ngOnInit() {
    this.getEmployeeById();
  }

  getEmployeeById() {
    this.employeeService.getEmployeeById(this.session.employeeId).subscribe({
      next: (value) => {
        this.employee.set(value);
        this.getRestauranById(value.restaurantId);
      },
      error: (err) => {
        this.employee.set(null);
      },
    });
  }

  getRestauranById(restaurantId: string) {
    this.restaurantService.getRestaurantById(restaurantId).subscribe({
      next: (value) => {
        this.restaurant.set(value);
      },
      error: (err) => {
        this.restaurant.set(null);
      },
    });
  }

  goDetails() {
    this.route.navigate(['restaurant/details', this.restaurant()?.id]);
  }

  goDishes() {
    this.route.navigate(['restaurant/dishes', this.restaurant()?.id]);
  }

  goSale() {
    this.route.navigate(['restaurant/sale', this.restaurant()?.id]);
  }

  goReports() {
    this.route.navigate(['restaurant/orders', this.restaurant()?.id]);
  }
}
