import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateThirdrdpartyShipmentComponent } from './create-thirdrdparty-shipment.component';

describe('CreateThirdrdpartyShipmentComponent', () => {
  let component: CreateThirdrdpartyShipmentComponent;
  let fixture: ComponentFixture<CreateThirdrdpartyShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateThirdrdpartyShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateThirdrdpartyShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
