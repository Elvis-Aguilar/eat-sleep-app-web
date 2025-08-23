import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  Users,
  DoorOpen,
  FileText,
  Settings,
  LucideAngularModule,
  Menu,
  X,
  Shield,
  ChartPie,
} from 'lucide-angular';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  readonly Menu = Menu;
  readonly Close = X;
  readonly Users = Users;
  readonly Rooms = DoorOpen;
  readonly Reports =   ChartPie;
  readonly Settings = Settings;
  readonly AdminShield = Shield;

  isCollapsed = true;

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}
