import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailedReportComponent } from './show-detailed-report.component';

describe('ShowDetailedReportComponent', () => {
  let component: ShowDetailedReportComponent;
  let fixture: ComponentFixture<ShowDetailedReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDetailedReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
