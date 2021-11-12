import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingMainComponent } from './shipping-main.component';

describe('ShippingMainComponent', () => {
  let component: ShippingMainComponent;
  let fixture: ComponentFixture<ShippingMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
