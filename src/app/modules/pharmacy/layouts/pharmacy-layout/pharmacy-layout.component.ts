import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';

@Component({
  selector: 'app-pharmacy-layout',
  imports: [RouterOutlet, SidenavComponent],
  templateUrl: './pharmacy-layout.component.html'
})
export class PharmacyLayoutComponent {

}
