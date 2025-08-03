import { TestBed } from '@angular/core/testing';

import { MealOrderListService } from './meal-order-list.service';

describe('MealOrderListService', () => {
  let service: MealOrderListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealOrderListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
