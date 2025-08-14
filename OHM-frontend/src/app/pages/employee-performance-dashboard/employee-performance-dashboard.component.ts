import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import Highcharts from 'highcharts';
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
  styleUrls: ['./employee-performance-dashboard.component.css'],
})
export class EmployeePerformanceDashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  private chart?: Highcharts.Chart;
  weeklyPerformance: WeeklyPerformance[] = [];
  currentWeek: WeeklyPerformance | null = null;

  constructor(private performanceService: PerformanceService) { }

  ngOnInit(): void {
    this.performanceService.getEmployeeSummary().subscribe({
      next: (data: WeeklyPerformance[]) => {
        this.weeklyPerformance = data;
        if (this.weeklyPerformance.length === 0) {
          console.warn('No weekly performance data available.');
          return;
        }
        const thisWeek = moment().isoWeek();
        this.currentWeek =
          this.weeklyPerformance.find((w) => w.week === thisWeek) ||
          this.weeklyPerformance[0];
        this.renderChart();
      },
      error: (err) => {
        console.error('Error fetching performance:', err);
      },
    });
  }

  ngAfterViewInit(): void {
    // If data already loaded before view init
    if (this.weeklyPerformance.length > 0) {
      this.renderChart();
    }
  }

  private renderChart(): void {
    if (!this.weeklyPerformance || this.weeklyPerformance.length === 0) return;

    // Destroy existing chart before re-creating
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = Highcharts.chart('performanceChart', {
      chart: { type: 'column' },
      title: { text: 'Weekly Performance' },
      xAxis: { categories: this.weeklyPerformance.map((w) => `Week ${w.week}`) },
      yAxis: { title: { text: 'Tasks' } },
      series: [
        {
          type: 'column',
          name: 'Pending',
          data: this.weeklyPerformance.map((w) => w.pendingTasks || 0),
        },
        {
          type: 'column',
          name: 'Overdue',
          data: this.weeklyPerformance.map((w) => w.overdueTasks || 0),
        },
        {
          type: 'column',
          name: 'In Progress',
          data: this.weeklyPerformance.map((w) => w.inProgressTasks || 0),
        },
        {
          type: 'column',
          name: 'ON Hold',
          data: this.weeklyPerformance.map((w) => w.onHoldTasks || 0),
        },
        {
          type: 'column',
          name: 'Completed Tasks',
          data: this.weeklyPerformance.map((w) => w.completedTasks || 0),
        }




      ],
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
