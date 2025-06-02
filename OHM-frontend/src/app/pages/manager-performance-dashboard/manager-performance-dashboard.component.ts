import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceService } from '../../services/performance.service';

@Component({
  selector: 'app-manager-performance-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-performance-dashboard.component.html',
  styleUrls: ['./manager-performance-dashboard.component.css'] // ✅ fixed typo: `styleUrl` ➜ `styleUrls`
})
export class ManagerPerformanceDashboardComponent implements OnInit {

  departments: any[] = [];

  constructor(private performanceService: PerformanceService) {}

  ngOnInit(): void {
    this.loadDepartmentSummary();
  }

  private loadDepartmentSummary(): void {
    this.performanceService.getDepartmentSummary().subscribe({
      next: (data) => this.departments = data,
      error: (error) => console.error('Failed to load department performance summary:', error)
    });
  }

}
