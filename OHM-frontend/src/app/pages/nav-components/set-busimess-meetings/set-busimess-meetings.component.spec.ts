import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetBusimessMeetingsComponent } from './set-busimess-meetings.component';

describe('SetBusimessMeetingsComponent', () => {
  let component: SetBusimessMeetingsComponent;
  let fixture: ComponentFixture<SetBusimessMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetBusimessMeetingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetBusimessMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
