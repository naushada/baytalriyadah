import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingMainComponent } from './reporting-main.component';

describe('ReportingMainComponent', () => {
  let component: ReportingMainComponent;
  let fixture: ComponentFixture<ReportingMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportingMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
