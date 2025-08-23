import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDoctorsComponent } from './report-doctors.component';

describe('ReportDoctorsComponent', () => {
  let component: ReportDoctorsComponent;
  let fixture: ComponentFixture<ReportDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportDoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
