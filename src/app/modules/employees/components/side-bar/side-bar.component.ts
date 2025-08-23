import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BookPlus,
  ChartNoAxesCombined,
  ChartPie,
  FilePlus,
  Library,
  LucideAngularModule,
  Menu,
  Wallet,
  X,
  CreditCard
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
  readonly Dashboard = ChartPie;
  readonly Magazines = Library;
  readonly PublishMagazine = BookPlus;
  readonly PublishIssue = FilePlus;
  readonly Reports = ChartNoAxesCombined;
  readonly Wallet = Wallet;
  readonly Payment = CreditCard;

  isCollapsed = true;

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

}
