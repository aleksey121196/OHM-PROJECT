import { Component,OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-data',
  imports: [CommonModule],
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.css'
})
export class PersonalDataComponent implements OnInit{

  user: any;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.user = this.employeeService.getUserFromToken();
  }
}
