import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { NavbarHotelComponent } from '../../components/navbar-hotel/navbar-hotel.component';
import { SidebarHotelComponent } from '../../components/sidebar-hotel/sidebar-hotel.component';

@Component({
  selector: 'app-layout-hotel',
  imports: [
    RouterModule,
    NavbarHotelComponent,
    SidebarHotelComponent,
    LucideAngularModule,
  ],
  templateUrl: './layout-hotel.component.html',
})
export class LayoutHotelComponent {

  readonly Hamburger = Menu;
  readonly X = X;

  sidebarCollapsed = true;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
