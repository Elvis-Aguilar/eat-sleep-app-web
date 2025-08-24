import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TarjetComponent } from 'app/modules/employees/components/tarjet/tarjet.component';

@Component({
  selector: 'app-dashboard-manager',
  imports: [TarjetComponent],
  templateUrl: './dashboard-manager.component.html',
})
export class DashboardManagerComponent {

  private readonly route = inject(Router)

  ngOnInit() {

  }

  goEmployees() {
    this.route.navigate(['manager/employees'])
  }

  goHotels() {
    this.route.navigate(['manager/hotels'])
  }

  goRestaurants() {
    this.route.navigate(['manager/restaurants'])
  }

  goPromotions() {
    this.route.navigate(['manager/promotions'])
  }

  goReports() {
    this.route.navigate(['manager/reports'])
  }
}
