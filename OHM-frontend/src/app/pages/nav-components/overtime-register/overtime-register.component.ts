import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverTimeService } from '../../../services/over-time.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-overtime-register',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './overtime-register.component.html',
  styleUrl: './overtime-register.component.css'
})
export class OvertimeRegisterComponent implements OnInit{
  
   
    Date: String= '';
    ExitTime: String= '';
    todayString = new Date().toISOString().split('T')[0];
  
    constructor(private overTimeService: OverTimeService, private employeeService:EmployeeService) {}
  
    ngOnInit():void {}
  
    submitOverTime(): void {
  
      const user = this.employeeService.getUserFromToken();
  
      
      if (!user) {
        alert('User not authenticated');
        return;
      }
  
  
      const OverTimeData = {
        UserId: user._id,
        Id: user.Id,
        FullName: user.FullName,
        Department: user.Department,
        Date: this.Date,
        ExitTime: this.ExitTime
      };
  
      this.overTimeService.addOverTime(OverTimeData).subscribe({
        next:() => {
          alert('OverTime request submitted successfully');
          this.clearForm();
        },
        error:() => {
          alert('Failed to submit OverTime request');
        }
      });
    }
     clearForm() {
      this.ExitTime = '';
      this.Date = '';
      
    }
  
}
