import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentBatchUploadComponent } from './shipment-batch-upload.component';

describe('ShipmentBatchUploadComponent', () => {
  let component: ShipmentBatchUploadComponent;
  let fixture: ComponentFixture<ShipmentBatchUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentBatchUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentBatchUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
