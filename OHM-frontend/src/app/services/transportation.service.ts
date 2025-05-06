import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TransportationService {

  private apiUrl = 'http://localhost:3000/api/transportation';

  constructor(private http: HttpClient) { }

  addTransportation(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAllTransportations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
