import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealOredrComponent } from './meal-oredr.component';

describe('MealOredrComponent', () => {
  let component: MealOredrComponent;
  let fixture: ComponentFixture<MealOredrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealOredrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealOredrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
