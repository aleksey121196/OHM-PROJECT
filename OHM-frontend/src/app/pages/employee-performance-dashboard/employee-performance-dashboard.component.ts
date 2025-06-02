import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceService } from '../../services/performance.service';

@Component({
  selector: 'app-employee-performance-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-performance-dashboard.component.html',
  styleUrls: ['./employee-performance-dashboard.component.css']
})
export class EmployeePerformanceDashboardComponent implements OnInit {

  performance: any = null;

  constructor(private performanceService: PerformanceService) {}

  ngOnInit(): void {
    this.performanceService.getEmployeeSummary().subscribe({
      next: (data) => this.performance = data,
      error: (err) => console.error('Error loading employee performance:', err)
    });
  }
}
