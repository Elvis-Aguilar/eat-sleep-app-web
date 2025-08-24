import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TarjetComponent } from 'app/modules/employees/components/tarjet/tarjet.component';

@Component({
  selector: 'app-dashboard-hotel',
  imports: [TarjetComponent],
  templateUrl: './dashboard-hotel.component.html',
})
export class DashboardHotelComponent {
  private readonly route = inject(Router)

  ngOnInit() {

  }

  goAreas() {
    this.route.navigate(['employee-management/areas'])
  }

  goRegister() {
    this.route.navigate(['employee-management/register'])
  }

  goGestion() {
    this.route.navigate(['employee-management/employees'])
  }

  goVacations() {
    this.route.navigate(['employee-management/vacations'])
  }

  goToPayment() {
    this.route.navigate(['employee-management/payment-specialist'])
  }

  goReports() {
    this.route.navigate(['employee-management/home-reports'])
  }
}
