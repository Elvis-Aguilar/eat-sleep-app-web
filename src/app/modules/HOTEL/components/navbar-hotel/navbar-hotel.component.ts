import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from 'app/store/auth.store';

@Component({
  selector: 'app-navbar-hotel',
  imports: [],
  templateUrl: './navbar-hotel.component.html',
})
export class NavbarHotelComponent {

  private readonly router = inject(Router);
  readonly authStore = inject(AuthStore);
}
