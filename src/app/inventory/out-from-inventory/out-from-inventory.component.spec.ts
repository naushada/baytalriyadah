import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutFromInventoryComponent } from './out-from-inventory.component';

describe('OutFromInventoryComponent', () => {
  let component: OutFromInventoryComponent;
  let fixture: ComponentFixture<OutFromInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutFromInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutFromInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
