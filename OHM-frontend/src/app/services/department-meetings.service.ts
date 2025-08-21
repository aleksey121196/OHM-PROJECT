import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentMeetingsService {


  private authHeader() {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  private apiUrl = 'http://localhost:3000/api/DepartmentMeetings'; 

  constructor(private http: HttpClient) { }

  AddNewDepartmentMeeting(DepartmentMeetingData: any): Observable<any> {
    return this.http.post(this.apiUrl, DepartmentMeetingData);
  }

  getMeetingsByDepartment(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/DepartmentMeetings`, {
      headers: this.authHeader()
    });
  }

}
