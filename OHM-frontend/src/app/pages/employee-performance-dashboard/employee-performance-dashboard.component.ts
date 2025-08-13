import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceService } from '../../services/performance.service';
import moment from 'moment';

interface WeeklyPerformance {
  week: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  pendingTasks: number;
  onHoldTasks: number;
}

@Component({
  selector: 'app-employee-performance-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-performance-dashboard.component.html',
  styleUrls: ['./employee-performance-dashboard.component.css']
})
export class EmployeePerformanceDashboardComponent implements OnInit {
  weeklyPerformance: WeeklyPerformance[] = [];
  currentWeek: WeeklyPerformance | null = null;

  constructor(private performanceService: PerformanceService) {}

  ngOnInit(): void {
    this.performanceService.getEmployeeSummary().subscribe({
      next: (data: WeeklyPerformance[]) => {
        this.weeklyPerformance = data;
        const thisWeek = moment().isoWeek();
        this.currentWeek = this.weeklyPerformance.find(w => w.week === thisWeek) || null;
      },
      error: (err) => console.error('Error loading employee performance:', err)
    });
  }
}
