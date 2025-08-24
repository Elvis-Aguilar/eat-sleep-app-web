import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from 'app/store/auth.store';

@Component({
  selector: 'app-navbar-mager',
  imports: [],
  templateUrl: './navbar-mager.component.html',
})
export class NavbarMagerComponent {

  private readonly router = inject(Router);
  readonly authStore = inject(AuthStore);

}


