import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tarjet',
  imports: [],
  templateUrl: './tarjet.component.html',
  styleUrl: './tarjet.component.css'
})
export class TarjetComponent {

  @Input() type!: string;

  @Input() title = ''
  @Input() value = '--'
  @Input() label = ''

  


}
