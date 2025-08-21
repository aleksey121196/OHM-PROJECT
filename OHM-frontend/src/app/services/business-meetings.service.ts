import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessMeetingsService {

  private authHeader() {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  private apiUrl = 'http://localhost:3000/api/businessMeetings'; 

  constructor(private http: HttpClient) { }

  AddNewBusinessMeeting(BusinessMeetingData: any): Observable<any> {
    return this.http.post(this.apiUrl, BusinessMeetingData);
  }

  getBusinesMeetingsByName(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/businessMeetings`, {
      headers: this.authHeader()
    });
  }

}
