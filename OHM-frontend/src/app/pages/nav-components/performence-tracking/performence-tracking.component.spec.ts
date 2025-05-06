import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformenceTrackingComponent } from './performence-tracking.component';

describe('PerformenceTrackingComponent', () => {
  let component: PerformenceTrackingComponent;
  let fixture: ComponentFixture<PerformenceTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformenceTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformenceTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
