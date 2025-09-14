import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from 'app/store/auth.store';

@Component({
  selector: 'app-navbar-restaurant',
  imports: [],
  templateUrl: './navbar-restaurant.component.html',
})
export class NavbarRestaurantComponent {
  private readonly router = inject(Router);
  readonly authStore = inject(AuthStore);
}
