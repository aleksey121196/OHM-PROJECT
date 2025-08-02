import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealOrderListService {

  private authHeader() {
    const token = localStorage.getItem('token');
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  private apiUrl = 'http://localhost:300/api/foodOrders';

  constructor(private http: HttpClient) { }

  getMealOrder(date: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/meal-orders?date=${date}`, {
      headers: this.authHeader()
    });
  }
}
