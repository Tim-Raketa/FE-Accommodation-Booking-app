import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRentableIntervalComponent } from './update-rentable-interval.component';

describe('UpdateRentableIntervalComponent', () => {
  let component: UpdateRentableIntervalComponent;
  let fixture: ComponentFixture<UpdateRentableIntervalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRentableIntervalComponent]
    });
    fixture = TestBed.createComponent(UpdateRentableIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
