import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkPlanService } from '../../../services/work-plan.service';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-work-plan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './work-plan.component.html',
  styleUrls: ['./work-plan.component.css']
})
export class WorkPlanComponent implements OnInit {
  PlanTitle = '';
  WeekStartDate = '';
  Notes = '';
  Department = '';  
  Tasks: any[] = [];
  todayString = new Date().toISOString().split('T')[0];

  constructor(private workPlanService: WorkPlanService, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.Department = this.employeeService.getUserFromToken()?.Department || '';
    this.addTask();
  }

  addTask() {
    this.Tasks.push({
      TaskName: '',
      TaskDescription: '',
      DueDate: '',
      AssignmentType: 'individual',
      AssignedTo: '',
      GroupLeader: '',
      Status: 'Pending',
    });
  }

  removeTask(index: number) {
    this.Tasks.splice(index, 1);
  }

  submitWorkPlan(): void {
    if (!this.PlanTitle || !this.WeekStartDate || !this.Department) {
      alert('Please fill all required fields');
      return;
    }

    const workPlanData = {
      PlanTitle: this.PlanTitle,
      WeekStartDate: this.WeekStartDate,
      Notes: this.Notes,
      Department: this.Department,
      Tasks: this.Tasks,
    };

    this.workPlanService.addWorkPlan(workPlanData).subscribe({
      next: () => {
        alert('Work Plan Submitted');
        this.clearForm();
      },
      error: () => alert('Submission Failed'),
    });
  }

  clearForm() {
    this.PlanTitle = '';
    this.WeekStartDate = '';
    this.Notes = '';
    this.Tasks = [];
    this.addTask();
  }
}
