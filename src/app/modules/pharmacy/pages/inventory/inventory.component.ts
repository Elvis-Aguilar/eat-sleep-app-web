// src/app/pages/inventory/inventory.component.ts
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicineService } from '../../services/medicine.service';
import { Medicine } from '../../models/inveontry';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { AlertStore } from 'app/store/alert.store';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ReactiveFormsModule],
  templateUrl: './inventory.component.html'
})
export default class InventoryComponent implements OnInit {
  @ViewChild('newMedicine') newMedicineDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;


  private readonly formBuilder = inject(FormBuilder);
  private readonly alertStore = inject(AlertStore);
  private readonly medicineService = inject(MedicineService);
  
  searchTerm: string = '';
  inventory: Medicine[] = [];
  Plus = Plus;
  quantity: number = 0;
  medicineId: number = 0;

  editMode: boolean = false;
  medicine: Medicine | null = null;
  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    unitPrice: [0, [Validators.required, Validators.min(1)]],
    unitCost: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    minStock: [0, [Validators.required, Validators.min(0)]]
  });

  constructor() { }

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.medicineService.getAll(this.searchTerm).subscribe(data => {
      this.inventory = data;
    });
  }

  get filteredInventory(): Medicine[] {
    return this.inventory.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearch(): void {
    this.loadInventory();
  }

  editMedicine(id: number) {
    this.medicineService.getById(id).subscribe((data: Medicine) => {
      this.form.patchValue(data);
      this.editMode = true;
      this.medicine = data;
      if (this.editMode) {
        this.form.get('stock')?.disable();
      }
      this.newMedicineDialog.nativeElement.showModal();
    });
  }


  createMedicine(): void {
    if (this.form.invalid) {
      this.alertStore.addAlert({
        message: `Ingresa datos validos`,
        type: 'error',
      });
      return;
    }

    const medicine: Partial<Medicine> = {
      name: this.form.value.name!,
      unitPrice: this.form.value.unitPrice!,
      unitCost: this.form.value.unitCost!,
      stock: this.form.value.stock!,
      minStock: this.form.value.minStock!,
    }


    this.medicineService.create(medicine).subscribe({
      next: value => {
        this.loadInventory();
        this.form.reset();
        this.newMedicineDialog.nativeElement.close();
        this.alertStore.addAlert({
          message: `Medicamento creado correctamente`,
          type: 'success',
        });
      },
      error: err => {
        this.form.reset();
        this.newMedicineDialog.nativeElement.close();
        this.alertStore.addAlert({
          message: `Error al crear el medicamento ${err.error.message}`,
          type: 'error',
        });
      }
    })

  }

  buyMedicine(medicineId: number): void {
    this.medicineId = Number(medicineId)
    this.modalRef.nativeElement.showModal();
  }

  startCreateMedicine(): void {
    this.form.get('stock')?.enable();
    this.editMode = false;
    this.medicine = null;
    this.form.reset();
    this.newMedicineDialog.nativeElement.showModal();
  }

  closeModal(): void {
    this.newMedicineDialog.nativeElement.close();
  }

  updateMedicine(): void {
    if (this.form.invalid) {
      this.alertStore.addAlert({
        message: `Ingresa datos validos`,
        type: 'error',
      });
      return;
    }

    const medicine: Partial<Medicine> = {
      name: this.form.value.name!,
      unitPrice: this.form.value.unitPrice!,
      unitCost: this.form.value.unitCost!,
      stock: this.form.value.stock!,
      minStock: this.form.value.minStock!,
    }

    this.medicineService.update(this.medicine!.id, medicine).subscribe(data => {
      this.loadInventory();
      this.form.reset();
      this.editMode = false;
      this.alertStore.addAlert({
        message: `Medicamento actualizado correctamente`,
        type: 'success',
      });
      this.newMedicineDialog.nativeElement.close();
    });
  }

  closeModalPurch() {
    this.medicineId = 0;
    this.modalRef.nativeElement.close();
  }

  purchache() {
    if (this.quantity <= 0 ) {
      this.alertStore.addAlert({
        message: `La cantidad debe ser mayor a cero`,
        type: 'error',
      });
      return;
    }
    this.medicineService.createPurches({quantity:this.quantity},this.medicineId).subscribe({
      next: value =>{
        this.quantity = 0
        this.medicineId = 0
        this.modalRef.nativeElement.close();
        this.loadInventory();
        this.alertStore.addAlert({
          message: `Compra de medicamento exitoso, el stock se ha actualizado`,
          type: 'success',
        });
      }, 
      error: err =>{
        this.quantity = 0
        this.medicineId = 0
        this.modalRef.nativeElement.close();
        this.alertStore.addAlert({
          message: `Error al comprar el medicamento ${err.error.message}`,
          type: 'error',
        });

      }
    });
  }

}
