import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestVisitedAccommodationsComponent } from './guest-visited-accommodations.component';

describe('GuestVisitedAccommodationsComponent', () => {
  let component: GuestVisitedAccommodationsComponent;
  let fixture: ComponentFixture<GuestVisitedAccommodationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestVisitedAccommodationsComponent]
    });
    fixture = TestBed.createComponent(GuestVisitedAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
