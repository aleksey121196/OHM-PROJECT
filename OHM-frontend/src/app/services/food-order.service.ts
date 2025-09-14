import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoodOrderService {

  private apiUrl = 'http://localhost:3000/api/foodOrders';

  constructor(private http: HttpClient) {}

  AddNewFoodOrder(FoodOrderData: any): Observable<any> {
    return this.http.post(this.apiUrl,FoodOrderData );
  }

  getUserOrderHistory(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/history/${userId}`);
  }
  
  getUserTodayOrder(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/today/${userId}`);
  }

}
