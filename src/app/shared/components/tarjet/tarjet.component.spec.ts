import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetComponent } from './tarjet.component';

describe('TarjetComponent', () => {
  let component: TarjetComponent;
  let fixture: ComponentFixture<TarjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
