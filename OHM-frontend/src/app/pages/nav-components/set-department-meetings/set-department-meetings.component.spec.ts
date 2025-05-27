import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDepartmentMeetingsComponent } from './set-department-meetings.component';

describe('SetDepartmentMeetingsComponent', () => {
  let component: SetDepartmentMeetingsComponent;
  let fixture: ComponentFixture<SetDepartmentMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetDepartmentMeetingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetDepartmentMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
