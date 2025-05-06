import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent implements OnInit{

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
