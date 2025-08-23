import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryContractComponent } from './history-contract.component';

describe('HistoryContractComponent', () => {
  let component: HistoryContractComponent;
  let fixture: ComponentFixture<HistoryContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
