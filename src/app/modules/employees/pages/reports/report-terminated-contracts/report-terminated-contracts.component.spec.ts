import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTerminatedContractsComponent } from './report-terminated-contracts.component';

describe('ReportTerminatedContractsComponent', () => {
  let component: ReportTerminatedContractsComponent;
  let fixture: ComponentFixture<ReportTerminatedContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportTerminatedContractsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportTerminatedContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
