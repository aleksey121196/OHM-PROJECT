import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employee-manag',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './employee-manag.component.html',
  styleUrl: './employee-manag.component.css'
})
export class EmployeeManagComponent {
 newEmployee = {
    FullName: '',
    Email: '',
    Phone: '',
    Address: '',
    Id: '',
    JobTitle: '',
    EmploymentDate: '',
    Department: '',
    Status: '',
    UserName: '',
    Role: '',
    Password: '',
    EmployerName: ''
  };

  constructor(private http: HttpClient) {}

  addEmployee() {
    this.http.post('http://localhost:3000/api/employees/add', this.newEmployee)
      .subscribe({
        next: (response) => {
          alert('Employee added successfully');
          this.resetForm();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to add employee');
        }
      });
  }

  resetForm() {
    this.newEmployee = {
      FullName: '',
      Email: '',
      Phone: '',
      Address: '',
      Id: '',
      JobTitle: '',
      EmploymentDate: '',
      Department: '',
      Status: '',
      UserName: '',
      Role: '',
      Password: '',
      EmployerName: ''
    };
  }
  

}
