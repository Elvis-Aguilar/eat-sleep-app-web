import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { NavbarMagerComponent } from '../../components/navbar-mager/navbar-mager.component';
import { SideBarManagerComponent } from '../../components/SideBar-manager/SideBar-manager.component';


@Component({
  selector: 'app-layout-manager',
    imports: [
    RouterModule,
    NavbarMagerComponent,
    SideBarManagerComponent,
    LucideAngularModule
  ],
  templateUrl: './layout-manager.component.html',
})
export class LayoutManagerComponent {

  readonly Hamburger = Menu;
  readonly X = X;

  sidebarCollapsed = true;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

}
