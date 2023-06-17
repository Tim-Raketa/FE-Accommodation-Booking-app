import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostGradesComponent } from './host-grades.component';

describe('HostGradesComponent', () => {
  let component: HostGradesComponent;
  let fixture: ComponentFixture<HostGradesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostGradesComponent]
    });
    fixture = TestBed.createComponent(HostGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
