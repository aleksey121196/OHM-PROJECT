import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router, RouterModule } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-login',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  UserName = '';
  Password = '';
  errorMessage = '';

  constructor(private employeeService : EmployeeService, private router: Router){}

  ngOnInit():void {
    this.UserName = '';
    this.Password = '';
    this.errorMessage = '';
  }
  

  login(){
    this.employeeService.login(this.UserName, this.Password).subscribe(
      (Response: any) => {
        
        const decoded = this.employeeService.getUserFromToken();
        const role = decoded.Role;
        

        switch(role){
          case 'Employee':
            this.router.navigate(['/employee']);
            break;
          case 'Manager':
            this.router.navigate(['/manager']);
            break;
          case 'Secretary':
            this.router.navigate(['/secretary']);
            break;  
          default:
            alert('unknown role. please contact admin');
            break;
        }
      },
      error =>{
        alert('Login Faild') ;
      } 
    );
  }  

  
  Home(){
    this.router.navigate(['/']);
  }
}

