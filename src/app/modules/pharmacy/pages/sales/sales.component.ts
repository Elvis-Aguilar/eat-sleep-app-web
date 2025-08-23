import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Medicine } from '../../models/inveontry';
import { MedicineService } from '../../services/medicine.service';
import { PatientDto } from '../../models/patient.dto';
import { CreateSaleDto, ItemSaleDto } from '../../models/sales.dto';
import { AlertStore } from 'app/store/alert.store';
import { AuthStore } from 'app/store/auth.store';

@Component({
  selector: 'app-sales',
  imports: [CommonModule, FormsModule],
  templateUrl: './sales.component.html',
})
export default class SalesComponent {

  private readonly medicineService = inject(MedicineService);
  private readonly alertStore = inject(AlertStore);
  readonly authStore = inject(AuthStore);

  patientName: string = '';
  patientType: string = 'Ambulatorio';
  patienteId: number = 0;

  products: Medicine[] = []
  patientes: PatientDto[] = []

  saleItems: { id: number, name: string, price: number, quantity: number }[] = [];

  ngOnInit(): void {
    this.loadInventory();
    this.loadPatientes();
  }

  loadInventory(): void {
    this.medicineService.getAll().subscribe(data => {
      this.products = data;
    });
  }

  loadPatientes() {
    this.medicineService.getAllPatientes().subscribe({
      next: value => {
        this.patientes = value
      }
    })
  }


  addToSale(product: Medicine) {
    const existingItem = this.saleItems.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity++;
      }
    } else {
      this.saleItems.push({
        id: product.id,
        name: product.name,
        price: product.unitPrice,
        quantity: 1
      });
    }
  }

  increaseQuantity(item: { id: number, quantity: number }) {
    const product = this.products.find(p => p.id === item.id);
    if (product && item.quantity < product.stock) {
      item.quantity++;
    }
  }

  decreaseQuantity(item: { id: number, quantity: number }) {
    item.quantity--;
    if (item.quantity === 0) {
      this.removeItem(item);
    }
  }

  removeItem(item: { id: number }) {
    this.saleItems = this.saleItems.filter(i => i.id !== item.id);
  }

  getProductStock(productId: number): number {
    const product = this.products.find(p => p.id === productId);
    return product ? product.stock : 0;
  }

  calculateTotal(): number {
    return this.saleItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  registerSale() {
    // Implement sale registration logic here

    const items: ItemSaleDto[] = []

    this.saleItems.forEach(pro => {
      items.push({
        medicineId: pro.id,
        quantity: pro.quantity
      })
    })

    //const cui:string = `${this.authStore.session().cui}`;

    const sale: CreateSaleDto = { items, patientId: Number(this.patienteId) }

    this.medicineService.createSale(sale).subscribe({
      next: value => {
        this.alertStore.addAlert({
          message: `Venta creada con exito`,
          type: 'success',
        });
        this.saleItems = [];
        this.patientName = '';
        this.patienteId = 0;
        this.loadInventory();
      },
      error: err => {
        this.alertStore.addAlert({
          message: `Error al crear la venta ${err.error.message}`,
          type: 'error',
        });
        this.saleItems = [];
        this.patientName = '';
        this.patienteId = 0;
        this.loadInventory();

      }
    })

  }
}