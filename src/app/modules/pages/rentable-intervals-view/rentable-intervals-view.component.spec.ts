import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentableIntervalsViewComponent } from './rentable-intervals-view.component';

describe('RentableIntervalsViewComponent', () => {
  let component: RentableIntervalsViewComponent;
  let fixture: ComponentFixture<RentableIntervalsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentableIntervalsViewComponent]
    });
    fixture = TestBed.createComponent(RentableIntervalsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
