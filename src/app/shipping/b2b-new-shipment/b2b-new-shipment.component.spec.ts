import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bNewShipmentComponent } from './b2b-new-shipment.component';

describe('B2bNewShipmentComponent', () => {
  let component: B2bNewShipmentComponent;
  let fixture: ComponentFixture<B2bNewShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ B2bNewShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bNewShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
