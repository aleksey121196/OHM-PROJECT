import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface WeekSeries{
  days: string[];
  thisWeek: number[];
  lastWeek: number[];
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private baseUrl = 'http://localhost:3000/api/performance'; // Adjust this to match your backend URL if deployed

  constructor(private http: HttpClient) {}

  // Get performance summary for all departments
  getDepartmentSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/departments-summary`);
  }

  // Get performance summary for the currently logged-in employee
  getEmployeeSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee-summary`);
  }

  getEmployeeWeekly(): Observable<WeekSeries> {
    return this.http.get<WeekSeries>(`${this.baseUrl}/employee-weekly`).pipe(
      map(r => ({
        days: r.days,
        thisWeek: r.thisWeek,
        lastWeek: r.lastWeek
      }))
    );
  }
}
