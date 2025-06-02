import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerPerformanceDashboardComponent } from './manager-performance-dashboard.component';

describe('ManagerPerformanceDashboardComponent', () => {
  let component: ManagerPerformanceDashboardComponent;
  let fixture: ComponentFixture<ManagerPerformanceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerPerformanceDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerPerformanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
