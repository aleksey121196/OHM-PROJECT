import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { EmployeeService } from '../services/employee.service';


@Injectable({
  providedIn: 'root',
})

export class authGuard implements CanActivate{

  constructor(private employeeService: EmployeeService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{

 if(this.employeeService.isLoggedIn()){
  const user = this.employeeService.getUserFromToken();
  const role = user?.Role;
  const allowedRoles = route.data['roles'] as string[] | undefined;

  if (!allowedRoles || allowedRoles.includes(role)) {
    return true;
  }else{
    this.router.navigate(['login']);
    return false;
  }
 }else{
  this.router.navigate(['login']);
    return false;
 }
}
}
