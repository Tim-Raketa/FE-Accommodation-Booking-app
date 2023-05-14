import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRentableIntervalComponent } from './create-rentable-interval.component';

describe('CreateRentableIntervalComponent', () => {
  let component: CreateRentableIntervalComponent;
  let fixture: ComponentFixture<CreateRentableIntervalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRentableIntervalComponent]
    });
    fixture = TestBed.createComponent(CreateRentableIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
