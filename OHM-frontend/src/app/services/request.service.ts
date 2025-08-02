import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private authHeader() {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  private apiUrl = 'http://localhost:3000/api/request';

  constructor(private http: HttpClient) { }

  addRequest(requestData: any): Observable<any> {
    return this.http.post(this.apiUrl, requestData);
  }

  getRequestsByDepartment(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/department`, {
      headers: this.authHeader()
    });
  }

  respondToRequest(requestId: string, text: string): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/respond/${requestId}`,
      { text },
      { headers: this.authHeader() }
    );
  }

  getRequestsByUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/myrequests`, {
      headers: this.authHeader()
    });
  }
}
