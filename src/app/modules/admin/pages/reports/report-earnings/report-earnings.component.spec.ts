import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEarningsComponent } from './report-earnings.component';

describe('ReportEarningsComponent', () => {
  let component: ReportEarningsComponent;
  let fixture: ComponentFixture<ReportEarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportEarningsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
