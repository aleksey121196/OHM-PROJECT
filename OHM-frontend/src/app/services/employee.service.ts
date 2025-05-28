import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient,private router:Router) {}

  // הפונקציה מחזירה את פרטי המשתמש מה-token
  // פענוח תקני של ה-token
  getUserFromToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        return jwt_decode(token); // שימוש ב-jwt-decode
      } catch (e) {
        console.error('Failed to decode JWT:', e);
      }
    }
    return null;
  }


  login(UserName: string, Password: string): Observable<any> {
    console.log("Trying login with:", UserName, Password);
    return this.http.post<{token: string}>('http://localhost:3000/api/employees/login', {
      UserName,
      Password
    }).pipe(
      tap(response =>{
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout(): void{
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean{
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  

  protectedRoute(): Observable<any> {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get('http://localhost:3000/api/employees/protected', {headers});
  }

  addEmployee(employee: any): Observable<any> {
  const token = this.getToken();
  let headers = new HttpHeaders();

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return this.http.post('http://localhost:3000/api/employees/add', employee, { headers });
}
  
}
