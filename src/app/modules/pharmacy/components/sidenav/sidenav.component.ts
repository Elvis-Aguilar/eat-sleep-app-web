import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from 'app/store/auth.store';
import {
  Home,
  Package,
  ShoppingCart,
  CheckSquare,
  Settings,
  LogOut,
  ChartPie,
  PillBottle,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  readonly authStore = inject(AuthStore);
  readonly LogOut = LogOut;
  readonly PillBottle = PillBottle;

  menuItems: { label: string; icon: any; link: string }[] = [
    { label: 'Dashboard', icon: Home, link: '/pharmacy/dashboard' },
    { label: 'Inventario', icon: Package, link: '/pharmacy/inventory' },
    { label: 'Ventas', icon: ShoppingCart, link: '/pharmacy/sales' },
    { label: 'Reportes', icon: ChartPie, link: '/pharmacy/reports' },
    { label: 'Configuraciones', icon: Settings, link: '/pharmacy/settings' },
  ];
}
