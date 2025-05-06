import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{
  constructor(private employeeService: EmployeeService, private router:Router, private location : Location){}


  ngOnInit(): void {
    if (!this.employeeService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      // Add this check to prevent navigating back to this page once logged out
      window.onpopstate = () => {
        this.location.replaceState('/login');  // Force replace URL
        window.location.reload();
      };
    }
  }

  logout(){
    this.employeeService.logout();
  }

}
