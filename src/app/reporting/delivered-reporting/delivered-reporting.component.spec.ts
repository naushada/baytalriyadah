import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredReportingComponent } from './delivered-reporting.component';

describe('DeliveredReportingComponent', () => {
  let component: DeliveredReportingComponent;
  let fixture: ComponentFixture<DeliveredReportingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveredReportingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveredReportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
