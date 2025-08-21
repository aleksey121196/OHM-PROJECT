import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverTimeService {

  private apiUrl = 'http://localhost:3000/api/overTime'; 

  constructor(private http: HttpClient) {}

  addOverTime(OverTimedata: any): Observable<any> {
    return this.http.post(this.apiUrl, OverTimedata);
  }

  getAllOverTime(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
