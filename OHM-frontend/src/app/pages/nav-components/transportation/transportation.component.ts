import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransportationService } from '../../../services/transportation.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  standalone: true,
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.css'],
  imports: [CommonModule, FormsModule]
})
export class TransportationComponent implements OnInit {

  transportationType: string = '';
  destination: string = '';
  Date: String = '';
  Time: String = ''

  constructor(
    private transportationService: TransportationService,
    private employeeService: EmployeeService
  ) { }

  transportation: any[] = [];

  ngOnInit(): void {
    this.loadUserTransportation();
  }



  loadUserTransportation(): void {
    this.transportationService.getTodayTransportations().subscribe({
      next: (data) => {
        this.transportation = data;
      },
      error: (err) => {
        console.error('Failed to load transportations:', err);
      }
    });
  }

  submitTransportation(): void {

    const user = this.employeeService.getUserFromToken();

    if (!user) {
      alert('User not authenticated');
      return;
    }

    const data = {
      userId: user._id,
      Id: user.Id,
      FullName: user.FullName,
      Phone: user.Phone,
      date: this.Date,
      Time: this.Time,
      transportationType: this.transportationType,
      destination: this.destination
    };

    this.transportationService.addTransportation(data).subscribe({
      next: () => {
        alert('Transportation request submitted successfully');
        this.clearForm();
      },
      error: () => {
        alert('Failed to submit transportation request');
      }
    });
  }
  clearForm() {
    this.destination = '';
    this.Date = '';
    this.Time = ''
  }

}
