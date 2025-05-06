import { TestBed } from '@angular/core/testing';

import { authGuard } from './auth.guard';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

describe('authGuard', () => {
  let guard: authGuard;
  let employeeService: jasmine.SpyObj<EmployeeService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    employeeService = jasmine.createSpyObj('EmployeeService', ['isLoggedIn','getToken','decodedToken']);
    routerMock = jasmine.createSpyObj('Router',['navigate']);

    TestBed.configureTestingModule({
      providers:[
        authGuard,
        {provide: EmployeeService, useValue: employeeService},
        {provide: Router, useValue: routerMock}
      ]
    });
    guard =TestBed.inject(authGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
