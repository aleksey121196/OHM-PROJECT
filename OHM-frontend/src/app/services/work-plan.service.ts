import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  _id: string;
  TaskName: string;
  TaskDescription: string;
  DueDate: string;
  AssignmentType: string;
  AssignedTo: string;
  GroupLeader: string;
  Status: string;
  PlanId: string;
  PlanTitle: string;
  WeekStartDate: string;
  Department: string;
}

@Injectable({
  providedIn: 'root',
})
export class WorkPlanService {
  private apiUrl = 'http://localhost:3000/api/WorkPlan';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  addWorkPlan(workPlanData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, workPlanData, {
      headers: this.getAuthHeaders(),
    });
  }

  getMyTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/mytasks`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateTaskStatus(taskId: string, newStatus: string): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/tasks/${taskId}/status`,
      { taskId, newStatus },
      { headers: this.getAuthHeaders() }
    );
  }
}
