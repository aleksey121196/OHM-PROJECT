import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentMeetingsService } from '../../../services/department-meetings.service';

@Component({
  selector: 'app-department-meetings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department-meetings.component.html',
  styleUrl: './department-meetings.component.css'
})
export class DepartmentMeetingsComponent implements OnInit {

  departmentMeetings: any[] = [];

  constructor(private departmentMeetingsService: DepartmentMeetingsService) { }

  ngOnInit(): void {
    this.fetchDepartmentMeetings();
  }

  fetchDepartmentMeetings(): void {
      this.departmentMeetingsService.getMeetingsByDepartment().subscribe({
        next: (data) => {
          this.departmentMeetings = data;
        },
        error: () => {
        alert('Failed to load Departments Meetings');
      }
      });
    }
  }
