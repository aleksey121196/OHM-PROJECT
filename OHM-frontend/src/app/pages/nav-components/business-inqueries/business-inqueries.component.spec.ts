import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessInqueriesComponent } from './business-inqueries.component';

describe('BusinessInqueriesComponent', () => {
  let component: BusinessInqueriesComponent;
  let fixture: ComponentFixture<BusinessInqueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessInqueriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessInqueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
