import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteThirdpartyShipmentComponent } from './delete-thirdparty-shipment.component';

describe('DeleteThirdpartyShipmentComponent', () => {
  let component: DeleteThirdpartyShipmentComponent;
  let fixture: ComponentFixture<DeleteThirdpartyShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteThirdpartyShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteThirdpartyShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
