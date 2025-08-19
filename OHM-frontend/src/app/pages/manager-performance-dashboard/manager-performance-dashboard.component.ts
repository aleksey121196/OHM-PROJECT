import { Component, OnInit, AfterViewInit,OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import Highcharts from 'highcharts';
import { PerformanceService } from '../../services/performance.service';
import moment from 'moment';

interface WeeklyDepartmentPerformance{
  week: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  pendingTasks: number;
  onHoldTasks: number;
}

@Component({
  selector: 'app-manager-performance-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-performance-dashboard.component.html',
  styleUrls: ['./manager-performance-dashboard.component.css'] // ✅ fixed typo: `styleUrl` ➜ `styleUrls`
})
export class ManagerPerformanceDashboardComponent implements OnInit {

  private DepChart?: Highcharts.Chart;
  WeeklyDepartmentPerformance: WeeklyDepartmentPerformance[] = [];
  currentWeek: WeeklyDepartmentPerformance | null = null;

  constructor(private performanceService: PerformanceService) {}

  ngOnInit(): void {
      this.performanceService.getDepartmentSummary().subscribe({
          next: (data: WeeklyDepartmentPerformance[]) => {
            this.WeeklyDepartmentPerformance = data;
            if (this.WeeklyDepartmentPerformance.length === 0) {
              console.warn('No weekly performance data available.');
              return;
            }
            const thisWeek = moment().isoWeek();
            this.currentWeek =
              this.WeeklyDepartmentPerformance.find((w) => w.week === thisWeek) ||
              this.WeeklyDepartmentPerformance[0];
            this.renderChart();
          },
          error: (err) => {
            console.error('Error fetching performance:', err);
          },
        });
  }


  ngAfterViewInit(): void {
    // If data already loaded before view init
    if (this.WeeklyDepartmentPerformance.length > 0) {
      this.renderChart();
    }
  }

  private renderChart(): void {
    if (!this.WeeklyDepartmentPerformance || this.WeeklyDepartmentPerformance.length === 0) return;

    // Destroy existing chart before re-creating
    if (this.DepChart) {
      this.DepChart.destroy();
    }

    this.DepChart = Highcharts.chart('performanceChart', {
      chart: { type: 'column' },
      title: { text: 'Weekly Performance' },
      xAxis: { categories: this.WeeklyDepartmentPerformance.map((w) => `Week ${w.week}`) },
      yAxis: { title: { text: 'Tasks' } },
      series: [
        {
          type: 'column',
          name: 'Pending',
          data: this.WeeklyDepartmentPerformance.map((w) => w.pendingTasks || 0),
        },
        {
          type: 'column',
          name: 'Overdue',
          data: this.WeeklyDepartmentPerformance.map((w) => w.overdueTasks || 0),
        },
        {
          type: 'column',
          name: 'In Progress',
          data: this.WeeklyDepartmentPerformance.map((w) => w.inProgressTasks || 0),
        },
        {
          type: 'column',
          name: 'ON Hold',
          data: this.WeeklyDepartmentPerformance.map((w) => w.onHoldTasks || 0),
        },
        {
          type: 'column',
          name: 'Completed Tasks',
          data: this.WeeklyDepartmentPerformance.map((w) => w.completedTasks || 0),
        }

      ],
    });
  }

  ngOnDestroy(): void {
    if (this.DepChart) {
      this.DepChart.destroy();
    }
  }
}
