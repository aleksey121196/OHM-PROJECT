import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AbsenceService } from '../../../services/absence.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-absence',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './absence.component.html',
  styleUrl: './absence.component.css'
})

export class AbsenceComponent implements OnInit{

  fromDate: String= '';
  toDate: String= '';
  absenceType: String= '';
  reason: String= '';

  constructor(private absenceService: AbsenceService, private employeeService:EmployeeService) {}

  ngOnInit():void {}

  submitAbsence(): void {

    const user = this.employeeService.getUserFromToken();

    
    if (!user) {
      alert('User not authenticated');
      return;
    }


    const absenceData = {
      UserId: user._id,
      Id: user.Id,
      FullName: user.FullName,
      Department: user.Department,
      fromDate: this.fromDate,
      toDate: this.toDate,
      absenceType: this.absenceType,
      reason: this.reason
    };

    this.absenceService.addAbsence(absenceData).subscribe({
      next:() => {
        alert('Absence request submitted successfully');
        this.clearForm();
      },
      error:() => {
        alert('Failed to submit transportation request');
      }
    });
  }
   clearForm() {
    this.fromDate = '';
    this.toDate = '';
    this.absenceType = '';
    this.reason = '';
    
  }

}
