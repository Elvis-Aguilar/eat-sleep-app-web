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



  goHistoryContract(){
    this.route.navigate([`employee-management/report/history-contract`]);
  }

  goReportsRetiredemployees(){
    this.route.navigate([`employee-management/report/terminated-contract`]);

  }

  goRepostDoctors(){
    this.route.navigate([`employee-management/report/doctors`]);
  }

}
