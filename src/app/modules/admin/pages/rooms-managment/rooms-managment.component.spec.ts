import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsManagmentComponent } from './rooms-managment.component';

describe('RoomsManagmentComponent', () => {
  let component: RoomsManagmentComponent;
  let fixture: ComponentFixture<RoomsManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
