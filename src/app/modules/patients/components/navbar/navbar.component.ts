import { Component, inject } from '@angular/core';
import { AuthStore } from 'app/store/auth.store';

@Component({
  selector: 'patients-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  readonly authStore = inject(AuthStore);

}
