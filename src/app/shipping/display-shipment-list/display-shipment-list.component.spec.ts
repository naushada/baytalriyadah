import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayShipmentListComponent } from './display-shipment-list.component';

describe('DisplayShipmentListComponent', () => {
  let component: DisplayShipmentListComponent;
  let fixture: ComponentFixture<DisplayShipmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayShipmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayShipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
