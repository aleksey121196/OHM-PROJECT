import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessMeetingsService } from '../../../services/business-meetings.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-set-busimess-meetings',
  imports: [CommonModule,FormsModule],
  templateUrl: './set-busimess-meetings.component.html',
  styleUrl: './set-busimess-meetings.component.css'
})
export class SetBusimessMeetingsComponent implements OnInit{

    ClientName: String = '';
    ManagerName: string = '';
    Date: string = '';
    MeetingTime: string = '' ;
    Topic: String = '';
    todayString = new Date().toISOString().split('T')[0];


  constructor(private businessMeetingsService: BusinessMeetingsService, private employeeService: EmployeeService){}

  ngOnInit(): void {
    
  }

  submitBusinessMeeting(): void {
    const user = this.employeeService.getUserFromToken();

    if(!user){
      alert('User not authenticated');
      return;
    }

    const BusinessMeetingData = {
      ClientName: this.ClientName,
      ManagerName: this.ManagerName,
      SecretaryName: user.FullName,
      Date: this.Date,
      MeetingTime: this.MeetingTime,
      Topic: this.Topic   
    };
  
    this.businessMeetingsService.AddNewBusinessMeeting(BusinessMeetingData).subscribe({
      next:() => {
        alert('New Business Meeting Added');
        this.clearForm();
      },
      error:() => {
        alert('Failed to submit Business Meeting');
      }
    });

  }

  clearForm(){
    this.ClientName = '';
    this.ManagerName = '';
    this.Date = '';
    this.MeetingTime = '';
    this.Topic = '';
  }
}
