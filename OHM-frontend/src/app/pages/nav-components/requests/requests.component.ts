import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RequestService } from '../../../services/request.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  Date: string = '';
  RequestType: string = '';
  RequestDescription: string = '';

  reqdata: any[] = []; 

  todayString = new Date().toISOString().split('T')[0];

  constructor(private requestService: RequestService, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.requestService.getRequestsByUser().subscribe({
      next: (data) => {
        this.reqdata = data;
      },
      error: () => {
        alert('Failed to load requests');
      }
    });
  }

  submitRequest(): void {
    const user = this.employeeService.getUserFromToken();

    if (!user) {
      alert('User not authenticated');
      return;
    }

    const requestData = {
      UserId: user._id,
      Id: user.Id,
      FullName: user.FullName,
      Department: user.Department,
      Date: new Date(),  
      RequestType: this.RequestType,
      RequestDescription: this.RequestDescription
    };

    this.requestService.addRequest(requestData).subscribe({
      next: () => {
        alert('Request submitted successfully');
        this.clearForm();
        this.loadRequests(); 
      },
      error: () => {
        alert('Failed to submit request');
      }
    });
  }

  clearForm() {
    this.RequestType = '';
    this.RequestDescription = '';
  }
}
