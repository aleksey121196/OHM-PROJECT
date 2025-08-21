import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:3000/api/employees';

  constructor(private http: HttpClient, private router: Router) { }

  getUserFromToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        return jwt_decode(token);
      } catch (e) {
        console.error('Failed to decode JWT:', e);
      }
    }
    return null;
  }

  login(UserName: string, Password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { UserName, Password })
      .pipe(
        tap(response => localStorage.setItem('token', response.token))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
   getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }

  protectedRoute(): Observable<any> {
    return this.http.get(`${this.apiUrl}/protected`, { headers: this.getHeaders() });
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, employee, { headers: this.getHeaders() });
  }

  getMyProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/MyData`, { headers: this.getHeaders() });
  }

  updateMyProfile(payload: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update`, payload, { headers: this.getHeaders() });
  }
}
