import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentMeetingsService {

   private apiUrl = 'http://localhost:3000/api/DepartmentMeetings'; // Adjust as needed

  constructor(private http: HttpClient) {}

  AddNewDepartmentMeeting(DepartmentMeetingData: any): Observable<any> {
    return this.http.post(this.apiUrl,DepartmentMeetingData );
  }
}
