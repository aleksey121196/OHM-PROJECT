import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private apiUrl = 'http://localhost:3000/api/absence'; 

  constructor(private http: HttpClient) {}

  addAbsence(absenceData: any): Observable<any> {
    return this.http.post(this.apiUrl, absenceData);
  }

  getAllAbsences(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
