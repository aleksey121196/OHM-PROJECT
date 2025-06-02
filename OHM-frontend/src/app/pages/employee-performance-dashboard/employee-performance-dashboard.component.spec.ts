import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePerformanceDashboardComponent } from './employee-performance-dashboard.component';

describe('EmployeePerformanceDashboardComponent', () => {
  let component: EmployeePerformanceDashboardComponent;
  let fixture: ComponentFixture<EmployeePerformanceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePerformanceDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePerformanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
