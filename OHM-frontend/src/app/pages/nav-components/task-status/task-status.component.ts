import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkPlanService, Task } from '../../../services/work-plan.service';

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.css'],
})
export class TaskStatusComponent implements OnInit {

  tasks: Task[] = [];
  statusOptions = ['Pending', 'In Progress', 'Completed', 'On Hold'];

  constructor(private workPlanService: WorkPlanService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.workPlanService.getMyTasks().subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: () => alert('Failed to load tasks'),
    });
  }

  // Helper method to get the selected value safely
  getSelectedValue(event: Event): string {
    const target = event.target as HTMLSelectElement | null;
    return target?.value ?? '';
  }

  onStatusChange(task: Task, newStatus: string) {
    this.workPlanService.updateTaskStatus(task._id, newStatus).subscribe({
      next: () => {
        task.Status = newStatus;
        alert('Task status updated');
      },
      error: () => alert('Failed to update task status'),
    });
  }
}
