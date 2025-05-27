import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsInqueriesComponent } from './Meetings-inqueries.component';

describe('MeetingsInqueriesComponent', () => {
  let component: MeetingsInqueriesComponent;
  let fixture: ComponentFixture<MeetingsInqueriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingsInqueriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingsInqueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
