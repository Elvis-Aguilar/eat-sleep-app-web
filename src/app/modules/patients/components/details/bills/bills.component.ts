import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bill } from '@patients/models/bill.model';
import { PatientBillsService } from '@patients/services/patient-bills.service';
import { Page } from '@shared/models/pageable.model';
import { ModalStore } from 'app/store/modal.store';
import { ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'patient-details-bills',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css',
})
export class BillsComponent implements OnInit {
  private readonly billsService = inject(PatientBillsService);
  private readonly modalStore = inject(ModalStore);

  readonly Previous = ChevronLeft;
  readonly Next = ChevronRight;

  bills?: Page<Bill>;
  currentBill?: Bill;
  patientId: number = inject(ActivatedRoute).snapshot.params['id'];

  ngOnInit(): void {
    this.fetchBills();
  }

  fetchBills(next: boolean = false, previous: boolean = false) {
    const page = (this.bills?.number || 0) + (+next || -previous);

    this.billsService
      .getAllPatientBills(this.patientId, { page })
      .subscribe((bills) => {
        this.bills = bills;
      });

    if (!next && !previous) {
      this.billsService
        .getPatientBillsByOpened(this.patientId)
        .subscribe((bills) => {
          this.currentBill = bills.pop();
        });
    }
  }

  createBill() {
    this.modalStore.openModal(
      () =>
        import('@patients/modals/bills/add-bill/add-bill.modal').then(
          (m) => m.AddBillModal
        ),
      {
        patientId: this.patientId,
        refreshBills: () => this.fetchBills(),
      }
    );
  }

  closeBill(bill: Bill) {
    this.modalStore.openModal(
      () =>
        import('@patients/modals/bills/close-bill/close-bill.modal').then(
          (m) => m.CloseBillModal
        ),
      {
        patientId: this.patientId,
        bill,
        refreshBills: () => this.fetchBills(),
      }
    );
  }
}
