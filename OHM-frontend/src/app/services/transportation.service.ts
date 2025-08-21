import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeService } from './employee.service';


@Injectable({
  providedIn: 'root'
})

export class TransportationService {

  private apiUrl = 'http://localhost:3000/api/transportation';

  constructor(private http: HttpClient, private employeeService:EmployeeService) { }

  addTransportation(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  getAllTransportations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getTodayTransportations(): Observable<any[]> {
  const headers = this.employeeService.getHeaders(); 
  return this.http.get<any[]>(`${this.apiUrl}/My`, { headers });
}
}
