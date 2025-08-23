import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'patients-home',
  imports: [CommonModule],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {
  stat?: any;
  schedule?: any[] = [
    {
      time: '10:00',
      patient: 'Carlos',
      type: 'Consulta',
      description: 'Consulta de Urgencias',
    },
    {
      time: '10:30',
      patient: 'Carlos',
      type: 'Consulta',
      description: 'Consulta de Urgencias',
    },
    {
      time: '11:00',
      patient: 'Carlos',
      type: 'Consulta',
      description: 'Consulta de Urgencias',
    },
  ];
}
