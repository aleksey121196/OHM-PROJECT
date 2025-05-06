import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealOrderListComponent } from './meal-order-list.component';

describe('MealOrderListComponent', () => {
  let component: MealOrderListComponent;
  let fixture: ComponentFixture<MealOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealOrderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
