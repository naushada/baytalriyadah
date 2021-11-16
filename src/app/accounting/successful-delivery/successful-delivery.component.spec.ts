import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulDeliveryComponent } from './successful-delivery.component';

describe('SuccessfulDeliveryComponent', () => {
  let component: SuccessfulDeliveryComponent;
  let fixture: ComponentFixture<SuccessfulDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfulDeliveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
