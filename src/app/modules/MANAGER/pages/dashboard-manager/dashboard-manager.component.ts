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

  goUsers() {
    this.route.navigate(['admin/management-users'])
  }

  goRooms() {
    this.route.navigate(['admin/rooms'])
  }


  goReports() {
    this.route.navigate(['admin/reports'])
  }
}
