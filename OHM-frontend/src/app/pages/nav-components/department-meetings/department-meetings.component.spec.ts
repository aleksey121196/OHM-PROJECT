import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentMeetingsComponent } from './department-meetings.component';

describe('DepartmentMeetingsComponent', () => {
  let component: DepartmentMeetingsComponent;
  let fixture: ComponentFixture<DepartmentMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentMeetingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
