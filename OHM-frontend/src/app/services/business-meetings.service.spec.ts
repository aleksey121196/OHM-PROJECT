import { TestBed } from '@angular/core/testing';

import { BusinessMeetingsService } from './business-meetings.service';

describe('BusinessMeetingsService', () => {
  let service: BusinessMeetingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessMeetingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
