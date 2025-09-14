import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

/*export interface WeekSeries{
  days: string[];
  thisWeek: number[];
  lastWeek: number[];
}
  */

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private baseUrl = 'http://localhost:3000/api/performance'; 

  constructor(private http: HttpClient) {}

  getDepartmentSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/departments-summary`);
  }

  getEmployeeSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employee-summary`);
  }

  /*getEmployeeWeekly(): Observable<WeekSeries> {
    return this.http.get<WeekSeries>(`${this.baseUrl}/employee-weekly`).pipe(
      map(r => ({
        days: r.days,
        thisWeek: r.thisWeek,
        lastWeek: r.lastWeek
      }))
    );
  }
  */
}

