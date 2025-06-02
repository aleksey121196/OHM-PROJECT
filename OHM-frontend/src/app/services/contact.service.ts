// src/app/services/contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ContactService {
  private apiUrl = 'http://localhost:3000/api/contactUs';

  constructor(private http: HttpClient) {}


  addContactData(contactData: any): Observable<any> {
    return this.http.post(this.apiUrl, contactData);
  }

  getBusinessRequests(): Observable<any>{
        return this.http.get(this.apiUrl);
  }
}
