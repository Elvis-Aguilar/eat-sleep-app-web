import { Component, inject } from '@angular/core';
import { TarjetComponent } from '../../components/tarjet/tarjet.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [TarjetComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private readonly route = inject(Router)

  ngOnInit() {

  }

  goAreas(){
    this.route.navigate(['employee-management/areas'])
  }

  goRegister(){
    this.route.navigate(['employee-management/register'])
  }

  goGestion(){
    this.route.navigate(['employee-management/employees'])
  }

  goVacations(){
    this.route.navigate(['employee-management/vacations'])
  }

  goToPayment(){
    this.route.navigate(['employee-management/payment-specialist'])
  }

  goReports(){
    this.route.navigate(['employee-management/home-reports'])
  }

}
