import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
})
export default class DashboardComponent {
  searchTerm: string = '';
  
  inventory = [
    { id: 1, name: 'Paracetamol', unitPrice: 2.5, quantity: 100, minStock: 50 },
    { id: 2, name: 'Ibuprofeno', unitPrice: 3.0, quantity: 20, minStock: 30 },
    { id: 3, name: 'Amoxicilina', unitPrice: 5.0, quantity: 80, minStock: 40 },
  ];

  get filteredInventory() {
    return this.inventory.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
