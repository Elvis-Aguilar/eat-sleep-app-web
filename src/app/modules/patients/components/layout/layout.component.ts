import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '@patients/components/navbar/navbar.component';
import { SidebarComponent } from '@patients/components/sidebar/sidebar.component';
import { LucideAngularModule, Menu, X } from 'lucide-angular';

@Component({
  selector: 'patients-layout',
  imports: [
    RouterModule,
    NavbarComponent,
    SidebarComponent,
    LucideAngularModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  readonly Hamburger = Menu;
  readonly X = X;

  sidebarCollapsed = true;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
