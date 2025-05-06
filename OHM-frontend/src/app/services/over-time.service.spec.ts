import { TestBed } from '@angular/core/testing';

import { OverTimeService } from './over-time.service';

describe('OverTimeService', () => {
  let service: OverTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
