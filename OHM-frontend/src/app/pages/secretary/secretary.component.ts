import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router,RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-secretary',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './secretary.component.html',
  styleUrl: './secretary.component.css'
})
export class SecretaryComponent implements OnInit{
  constructor(private employeeService: EmployeeService, private router:Router, private location : Location){}


  ngOnInit(): void {
    if (!this.employeeService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
   
      window.onpopstate = () => {
        this.location.replaceState('/login');  
        window.location.reload();
      };
    }
  }

  logout(){
    this.employeeService.logout();
  }

}
