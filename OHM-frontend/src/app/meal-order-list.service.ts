import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodOrder } from './models/food-order.model';

@Injectable({
  providedIn: 'root'
})
export class MealOrderListService {
  private apiUrl = 'http://localhost:300/api/getMealOrders';

  constructor(private http: HttpClient) { }

  getMealOrder(date: string): Observable<FoodOrder[]> {
    return this.http.get<FoodOrder[]>(`${this.apiUrl}/meal-orders?date=${date}`);
  }
}
