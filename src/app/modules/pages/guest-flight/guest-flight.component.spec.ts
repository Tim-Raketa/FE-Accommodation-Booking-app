import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestFlightComponent } from './guest-flight.component';

describe('GuestFlightComponent', () => {
  let component: GuestFlightComponent;
  let fixture: ComponentFixture<GuestFlightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestFlightComponent]
    });
    fixture = TestBed.createComponent(GuestFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
