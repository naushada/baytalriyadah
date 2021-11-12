import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNewShipmentComponent } from './my-new-shipment.component';

describe('MyNewShipmentComponent', () => {
  let component: MyNewShipmentComponent;
  let fixture: ComponentFixture<MyNewShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyNewShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNewShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
