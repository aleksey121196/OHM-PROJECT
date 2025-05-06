import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeRegisterComponent } from './overtime-register.component';

describe('OvertimeRegisterComponent', () => {
  let component: OvertimeRegisterComponent;
  let fixture: ComponentFixture<OvertimeRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OvertimeRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OvertimeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
