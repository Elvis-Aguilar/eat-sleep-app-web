import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillItem, BillItemType } from '@patients/models/bill.model';
import { PatientBillItemsService } from '@patients/services/patient-bill-items.service';
import { Page } from '@shared/models/pageable.model';
import { ModalStore } from 'app/store/modal.store';
import { ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'patient-details-consultations',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.css',
})
export class ConsultationsComponent implements OnInit {
  private readonly consultationsService = inject(PatientBillItemsService);
  private readonly modalStore = inject(ModalStore);

  readonly Previous = ChevronLeft;
  readonly Next = ChevronRight;

  consultations?: Page<BillItem>;
  patientId: number = inject(ActivatedRoute).snapshot.params['id'];

  ngOnInit(): void {
    this.fetchConsultations();
  }

  fetchConsultations(next: boolean = false, previous: boolean = false) {
    const page = (this.consultations?.number || 0) + (+next || -previous);

    this.consultationsService
      .getAllPatientBillItems(this.patientId, {
        type: BillItemType.CONSULTATION,
        page,
      })
      .subscribe((consultations) => {
        this.consultations = consultations;
      });
  }

  createConsultation() {
    this.modalStore.openModal(
      () =>
        import(
          '@patients/modals/consultations/add-consultation/add-consultation.modal'
        ).then((m) => m.AddConsultationModal),
      {
        patientId: this.patientId,
        refreshConsultations: () => this.fetchConsultations(),
      }
    );
  }
}
