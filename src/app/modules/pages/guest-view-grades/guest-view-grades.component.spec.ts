import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestViewGradesComponent } from './guest-view-grades.component';

describe('GuestViewGradesComponent', () => {
  let component: GuestViewGradesComponent;
  let fixture: ComponentFixture<GuestViewGradesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestViewGradesComponent]
    });
    fixture = TestBed.createComponent(GuestViewGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
