import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { DepartmentMeetingsService } from '../../../services/department-meetings.service';

@Component({
  selector: 'app-set-department-meetings',
  imports: [CommonModule,FormsModule],
  templateUrl: './set-department-meetings.component.html',
  styleUrl: './set-department-meetings.component.css'
})
export class SetDepartmentMeetingsComponent implements OnInit{

    Date: string = '';
    MeetingTime: string = '';
    Topic: string = '';
    todayString = new Date().toISOString().split('T')[0];

  constructor(private departmentMeetingsService: DepartmentMeetingsService, private employeeService: EmployeeService){}

  ngOnInit(): void {
    
  }

  submitDepartmentMeeting(): void {
    const user = this.employeeService.getUserFromToken();

    if(!user){
      alert('User not authenticated');
      return;
    }

    const DepartmentMeetingData = {
      Date: this.Date,
      MeetingTime: this.MeetingTime,
      Department: user.Department,
      ManagerName: user.FullName,
      Topic: this.Topic   
    };
  
    this.departmentMeetingsService.AddNewDepartmentMeeting(DepartmentMeetingData).subscribe({
      next:() => {
        alert('New Department Meeting Added');
        this.clearForm();
      },
      error:() => {
        alert('Failed to submit Department Meeting');
      }
    });

  }

  clearForm(){
    this.Date = '';
    this.MeetingTime = '';
    this.Topic = '';
  }

}
