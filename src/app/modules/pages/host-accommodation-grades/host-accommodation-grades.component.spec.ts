import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostAccommodationGradesComponent } from './host-accommodation-grades.component';

describe('HostAccommodationGradesComponent', () => {
  let component: HostAccommodationGradesComponent;
  let fixture: ComponentFixture<HostAccommodationGradesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostAccommodationGradesComponent]
    });
    fixture = TestBed.createComponent(HostAccommodationGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
