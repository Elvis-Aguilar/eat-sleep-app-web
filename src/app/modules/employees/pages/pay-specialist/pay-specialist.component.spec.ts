import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaySpecialistComponent } from './pay-specialist.component';

describe('PaySpecialistComponent', () => {
  let component: PaySpecialistComponent;
  let fixture: ComponentFixture<PaySpecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaySpecialistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaySpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
