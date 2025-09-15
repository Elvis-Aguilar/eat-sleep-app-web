import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports-home',
  imports: [],
  templateUrl: './reports-home.component.html',
})
export class ReportsHomeComponent {
  private readonly route = inject(Router);

  goIncome() {
    this.route.navigate([`manager/reports/income-establishment`]);
  }

  goClient() {}

  goEmployees() {}

  goEarnings() {}

  goPopularRoom() {}

  goPopularRestaurant() {}
}
