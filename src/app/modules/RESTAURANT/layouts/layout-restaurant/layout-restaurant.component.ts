import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { NavbarRestaurantComponent } from '../../components/navbar-restaurant/navbar-restaurant.component';
import { SidebarRestaurtanComponent } from '../../components/sidebar-restaurtan/sidebar-restaurtan.component';

@Component({
  selector: 'app-layout-restaurant',
  imports: [
    RouterModule,
    NavbarRestaurantComponent,
    SidebarRestaurtanComponent,
    LucideAngularModule,
  ],
  templateUrl: './layout-restaurant.component.html',
})
export class LayoutRestaurantComponent {


  readonly Hamburger = Menu;
  readonly X = X;

  sidebarCollapsed = true;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

}
