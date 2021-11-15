import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShipmentComponent } from './delete-shipment.component';

describe('DeleteShipmentComponent', () => {
  let component: DeleteShipmentComponent;
  let fixture: ComponentFixture<DeleteShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
