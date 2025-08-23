import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Medicine } from '../../models/medicine.model';

@Component({
  selector: 'app-medicine-form',
  templateUrl: './medicine-form.component.html',
  styleUrls: ['./medicine-form.component.scss']
})
export class MedicineFormComponent implements OnInit {
  medicineForm: FormGroup;
  categories = [
    'Antibiotics',
    'Analgesics',
    'Antipyretics',
    'Antihistamines',
    'Antacids',
    'Other'
  ];

  constructor(private formBuilder: FormBuilder) {
    this.medicineForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      genericName: ['', [Validators.required, Validators.minLength(3)]],
      manufacturer: ['', Validators.required],
      category: ['', Validators.required],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      cost: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      minStock: [0, [Validators.required, Validators.min(0)]],
      expiryDate: ['', Validators.required],
      description: [''],
      dosage: ['', Validators.required],
      sideEffects: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.medicineForm.valid) {
      const medicine: Medicine = {
        ...this.medicineForm.value,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      // TODO: Implement service call to save medicine
      console.log('Medicine to be saved:', medicine);
    }
  }
} 