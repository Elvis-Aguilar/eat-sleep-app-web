import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
})
export default class SettingsComponent {
  minStockThreshold: number = 0;

  saveSettings() {
    // Implement settings save logic here
    console.log('Settings saved:', {
      minStockThreshold: this.minStockThreshold
    });
  }
}
