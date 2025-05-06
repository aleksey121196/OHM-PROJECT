import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManagComponent } from './employee-manag.component';

describe('EmployeeManagComponent', () => {
  let component: EmployeeManagComponent;
  let fixture: ComponentFixture<EmployeeManagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeManagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeManagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
