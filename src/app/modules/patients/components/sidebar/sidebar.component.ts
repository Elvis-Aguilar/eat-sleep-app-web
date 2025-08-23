import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Clipboard, House, LucideAngularModule, Menu, X } from 'lucide-angular';

interface Item {
  name: string;
  icon: typeof X;
  path: string;
}

@Component({
  selector: 'patients-sidebar',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  readonly Close = X;
  readonly Menu = Menu;

  isCollapsed = true;

  items: Item[] = [
    {
      name: 'Pagina de inicio',
      icon: House,
      path: 'home',
    },
    {
      name: 'Lista de pacientes',
      icon: Clipboard,
      path: 'patients',
    },
  ];

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}
