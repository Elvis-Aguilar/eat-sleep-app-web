import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewContractComponent } from './form-new-contract.component';

describe('FormNewContractComponent', () => {
  let component: FormNewContractComponent;
  let fixture: ComponentFixture<FormNewContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNewContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormNewContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
