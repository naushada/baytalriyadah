import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMultipleAwbComponent } from './display-multiple-awb.component';

describe('DisplayMultipleAwbComponent', () => {
  let component: DisplayMultipleAwbComponent;
  let fixture: ComponentFixture<DisplayMultipleAwbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMultipleAwbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMultipleAwbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
