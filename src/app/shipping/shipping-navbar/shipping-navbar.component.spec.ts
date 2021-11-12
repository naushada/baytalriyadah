import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingNavbarComponent } from './shipping-navbar.component';

describe('ShippingNavbarComponent', () => {
  let component: ShippingNavbarComponent;
  let fixture: ComponentFixture<ShippingNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
