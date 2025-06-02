import { TestBed } from '@angular/core/testing';

import { DepartmentMeetingsService } from './department-meetings.service';

describe('DepartmentMeetingsService', () => {
  let service: DepartmentMeetingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentMeetingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
