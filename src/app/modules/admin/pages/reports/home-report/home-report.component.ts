import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-report',
  imports: [],
  templateUrl: './home-report.component.html',
  styleUrl: './home-report.component.css'
})
export class HomeReportComponent {

  private readonly route = inject(Router)


  goIncome(){
    this.route.navigate([`admin/reports/income`]);
  }

  goExpose(){
    this.route.navigate([`admin/reports/expose`]);
  }

  goEarnings(){
    this.route.navigate([`admin/reports/earnigs`]);
  }

  

}
