import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-check',
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-check.component.html',
})
export default class InventoryCheckComponent {
  inventory = [
    { id: 1, name: 'Paracetamol', systemStock: 100, physicalStock: 100, difference: 0, differenceValue: 0, unitPrice: 2.5 },
    { id: 2, name: 'Ibuprofeno', systemStock: 20, physicalStock: 20, difference: 0, differenceValue: 0, unitPrice: 3.0 },
    { id: 3, name: 'Amoxicilina', systemStock: 80, physicalStock: 80, difference: 0, differenceValue: 0, unitPrice: 5.0 },
  ];

  calculateDifference(item: any) {
    item.difference = item.physicalStock - item.systemStock;
    item.differenceValue = item.difference * item.unitPrice;
  }

  calculateTotalDifference(): number {
    return this.inventory.reduce((total, item) => total + item.differenceValue, 0);
  }

  performMonthlyClosure() {
    // Implement monthly closure logic here
    console.log('Monthly closure performed:', {
      inventory: this.inventory,
      totalDifference: this.calculateTotalDifference()
    });
    // Reset physical stock and differences
    this.inventory.forEach(item => {
      item.systemStock = item.physicalStock;
      item.difference = 0;
      item.differenceValue = 0;
    });
  }
}
